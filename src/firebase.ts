import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_DOMAIN,
  dataBaseURL: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_DATABASE_ID,
  projectId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_PROJYECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_APP_ID,
};

console.log(firebaseConfig);

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();
export const storage = firebase.storage();
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
