import admin from 'firebase-admin';
import serviceAccount from '../baingan-79603-firebase-adminsdk-91hpd-c23fb5e65c.json' assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://baingan-79603.firebaseio.com'
});

const db = admin.firestore();
const auth = admin.auth();

export {admin, db, auth};

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyB0aK5RNhBkBqBtTkT3XY0TbAUW3RASrFk",
//   authDomain: "baingan-79603.firebaseapp.com",
//   projectId: "baingan-79603",
//   storageBucket: "baingan-79603.appspot.com",
//   messagingSenderId: "958113275231",
//   appId: "1:958113275231:web:af6291868c8699a2ba2aea"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);
// const db = getFirestore(app);

// export { auth, db };
