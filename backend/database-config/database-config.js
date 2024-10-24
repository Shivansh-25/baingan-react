import admin from 'firebase-admin';
import serviceAccount from '../baingan-79603-firebase-adminsdk-91hpd-c23fb5e65c.json' with { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = admin.firestore();
const auth = admin.auth();

export {admin, db, auth};
