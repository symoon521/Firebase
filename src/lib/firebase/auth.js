
/*
import { auth, db } from './config';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as firebaseSignOut 
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

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

export const signIn = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  
  const userDocRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(userDocRef);

  if (!userDoc.exists()) {
    await setDoc(userDocRef, {
      email: user.email,
      displayName: user.displayName,
      role: 'customer', // Default role for Google Sign-In
      createdAt: new Date(),
    });
  }
  
  return result;
};

export const signOut = async () => {
  return await firebaseSignOut(auth);
};
*/

// Mock authentication functions
export const signUp = async (email, password, displayName, role) => {
  console.log("Mock signUp called:", { email, displayName, role });
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (email === "test@example.com") {
    throw new Error("이미 존재하는 이메일입니다.");
  }
  return { uid: "mock-user-" + Date.now(), email, displayName };
};

export const signIn = async (email, password) => {
  console.log("Mock signIn called:", { email, password });
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (email === "test@test.com" && password === "password") {
    return { user: { uid: "mock-user-test", email: "test@test.com", displayName: "테스트 사용자" } };
  } else if (email === "farm@test.com" && password === "password") {
    return { user: { uid: "mock-farm-owner", email: "farm@test.com", displayName: "농장주" } };
  } else {
    throw new Error("이메일 또는 비밀번호가 잘못되었습니다.");
  }
};

export const googleSignIn = async () => {
  console.log("Mock googleSignIn called");
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { user: { uid: "mock-google-user", email: "google@test.com", displayName: "구글 사용자" } };
};

export const signOut = async () => {
  console.log("Mock signOut called");
  await new Promise(resolve => setTimeout(resolve, 500));
  return true;
};
