
# Project Plan: Smart Farm Sharing Platform MVP

## 1. Project Architecture & Firebase Setup

This project will be a serverless application using React for the frontend and Firebase for the backend.

*   **Frontend**: React (Next.js)
*   **Deployment**: Firebase Hosting
*   **Database**: Cloud Firestore
*   **Backend Logic**: Cloud Functions for Firebase
*   **User Management**: Firebase Authentication
*   **File Storage**: Cloud Storage for Firebase
*   **Real-time Notifications**: Firebase Cloud Messaging (FCM)
*   **AI Integration**: Google AI via Genkit

### Firebase Project Setup Checklist:

1.  **Create Firebase Project**: In the Firebase Console, create a new project.
2.  **Enable Services**:
    *   **Authentication**: Enable Email/Password and Google sign-in providers.
    *   **Firestore**: Create a Firestore database.
    *   **Storage**: Create a Cloud Storage bucket.
    *   **Functions**: Set up Cloud Functions.
    *   **Hosting**: Set up Firebase Hosting.
    *   **Cloud Messaging (FCM)**: Enable FCM.
3.  **API Keys & Configuration**:
    *   Obtain the Firebase configuration object for your web app and store it in a `.env.local` file.
    *   Set up the Genkit environment with the necessary Google AI API keys.

## 2. Firestore Database Schema

### `users` collection
*   **Document ID**: `uid` (from Firebase Auth)
*   **Fields**:
    *   `email`: (string)
    *   `displayName`: (string)
    *   `role`: (string, 'customer' or 'farmOwner')
    *   `createdAt`: (timestamp)
    *   `fcmToken`: (string, optional)

### `farms` collection
*   **Document ID**: auto-generated
*   **Fields**:
    *   `ownerId`: (string, reference to `users.uid`)
    *   `farmName`: (string)
    *   `location`: (string)
    *   `address`: (string)
    *   `isSmartFarm`: (boolean)
    *   `description`: (string)
    *   `availableArea`: (number)
    *   `farmImages`: (array of strings, URLs from Cloud Storage)
    *   `availableCrops`: (array of strings)
    *   `liveStreamUrl`: (string, optional)

### `userCrops` collection
*   **Document ID**: auto-generated
*   **Fields**:
    *   `userId`: (string, reference to `users.uid`)
    *   `farmId`: (string, reference to `farms` document ID)
    *   `cropName`: (string)
    *   `startDate`: (timestamp)
    *   `estimatedHarvestDate`: (timestamp)
    *   `status`: (string, e.g., 'planting', 'growing', 'ready_for_harvest', 'harvested')
    *   `growthLog`: (array of maps, `[{ timestamp: ..., event: '...' }]`)
    *   `tagId`: (string)

## 3. Core Feature Implementation Plan

### A. User & Farm Management

**1. User Authentication (React)**

*   Use `firebase/auth` to implement `createUserWithEmailAndPassword`, `signInWithEmailAndPassword`, and `signInWithPopup` (for Google).
*   After a successful sign-up, create a new document in the `users` collection with the user's `uid`, `email`, `displayName`, and selected `role`.

```javascript
// src/lib/firebase/auth.js
import { auth, db } from './config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const signUp = async (email, password, displayName, role) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    displayName: displayName,
    role: role,
    createdAt: new Date(),
  });
  return user;
};

export const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  // You might want to check if the user already exists in Firestore
  // before creating a new document.
  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    displayName: user.displayName,
    role: 'customer', // Default role for Google Sign-In
    createdAt: new Date(),
  }, { merge: true }); // Use merge to avoid overwriting existing data
  return user;
};
```

**2. Farm Onboarding (React)**

*   Create a form in the `/farms/register` page.
*   On form submission:
    1.  Upload images to Cloud Storage using `firebase/storage`.
    2.  Get the download URLs for the uploaded images.
    3.  Create a new document in the `farms` collection with the form data and image URLs.

**3. Firestore Security Rules**

*   Implement rules to only allow `farmOwner` to create/edit their own farms.

```
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    match /farms/{farmId} {
      allow read;
      allow create: if request.auth.uid != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'farmOwner';
      allow update, delete: if request.auth.uid == resource.data.ownerId;
    }
    match /userCrops/{cropId} {
      allow read, write: if request.auth.uid == resource.data.userId;
      // Farm owners can update the growthLog
      allow update: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'farmOwner'
                    && get(/databases/$(database)/documents/farms/$(resource.data.farmId)).data.ownerId == request.auth.uid;
    }
  }
}
```

### B. Crop Selection & Farm Recommendation

**1. Farm Recommendation (Cloud Function)**

*   Create an HTTP-triggered Cloud Function `recommendFarms`.
*   The function will receive `cropName` and optionally `location` as query parameters.
*   It will query the `farms` collection and return a list of matching farms.

```javascript
// functions/src/index.js
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.recommendFarms = functions.https.onCall(async (data, context) => {
  const { cropName, location } = data;

  let query = admin.firestore().collection('farms');

  if (cropName) {
    query = query.where('availableCrops', 'array-contains', cropName);
  }

  // Location filtering can be more complex with geopoints,
  // but for a simple string match:
  if (location) {
    query = query.where('location', '==', location);
  }

  const snapshot = await query.get();
  const farms = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return farms;
});
```

### C. Smart Farm Monitoring & Growth Log

**1. Real-time Growth Log (React)**

*   Use Firestore's `onSnapshot` listener to get real-time updates for a `userCrops` document.
*   When the `growthLog` array is updated by the farm owner, the UI will automatically re-render.

```javascript
// src/app/dashboard/components/growth-log.tsx
import { db } from '@/lib/firebase/config';
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from 'react';

// ...

const [currentLog, setCurrentLog] = useState(log);

useEffect(() => {
  const unsub = onSnapshot(doc(db, "userCrops", crop.id), (doc) => {
    const data = doc.data();
    if (data) {
      setCurrentLog(data.growthLog);
    }
  });

  return () => unsub();
}, [crop.id]);
```

### D. Automated Notifications

**1. Scheduled Reminders (Cloud Function)**

*   Create a Pub/Sub-triggered Cloud Function that runs on a schedule (e.g., daily).
*   The function will scan the `userCrops` collection.
*   If a crop is ready for harvest or needs attention, it will send an FCM notification.

```javascript
// functions/src/index.js
// ...
const messaging = admin.messaging();

exports.scheduledNotifications = functions.pubsub.schedule('every 24 hours').onRun(async (context) => {
  const now = new Date();
  const twoDaysFromNow = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);

  const snapshot = await admin.firestore().collection('userCrops')
    .where('status', '==', 'growing')
    .where('estimatedHarvestDate', '<=', twoDaysFromNow)
    .get();

  const promises = snapshot.docs.map(async (doc) => {
    const crop = doc.data();
    const userDoc = await admin.firestore().collection('users').doc(crop.userId).get();
    const user = userDoc.data();

    if (user && user.fcmToken) {
      const message = {
        notification: {
          title: 'Harvest Reminder!',
          body: `Your ${crop.cropName} at ${crop.farmName} is almost ready for harvest!`,
        },
        token: user.fcmToken,
      };
      return messaging.send(message);
    }
  });

  return Promise.all(promises);
});
```

### E. AI-Powered Growing Tips

*   The existing Genkit flow `getAiGrowingTips` is already set up. The frontend component `AiTipsGenerator` calls this flow. The API key is securely managed by Genkit and not exposed to the client.
