
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();
const messaging = admin.messaging();

exports.scheduledNotifications = functions.pubsub.schedule('every 24 hours').onRun(async (context) => {
  const now = new Date();
  const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

  const snapshot = await db.collection('userCrops')
    .where('status', '==', 'growing')
    .where('estimatedHarvestDate', '<=', threeDaysFromNow)
    .get();

  if (snapshot.empty) {
    console.log('No upcoming harvests to notify.');
    return null;
  }

  const promises = [];
  snapshot.forEach(doc => {
    const crop = doc.data();
    const promise = db.collection('users').doc(crop.userId).get().then(userDoc => {
      const user = userDoc.data();
      if (user && user.fcmToken) {
        const message = {
          notification: {
            title: '🌱 수확 알림',
            body: `${user.displayName}님, ${crop.farmName}의 ${crop.cropName} 수확이 3일 남았습니다!`,
          },
          token: user.fcmToken,
        };
        return messaging.send(message);
      }
      return null;
    });
    promises.push(promise);
  });

  return Promise.all(promises);
});
