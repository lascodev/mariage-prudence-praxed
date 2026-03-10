import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOELR_NDu1IzOPOV2ZoZukkqMx7SSBvRI",
  authDomain: "mariage-prudence-praxed.firebaseapp.com",
  projectId: "mariage-prudence-praxed",
  storageBucket: "mariage-prudence-praxed.firebasestorage.app",
  messagingSenderId: "779509934067",
  appId: "1:779509934067:web:67d921781f4b72daab9486",
  measurementId: "G-37E4C8011W"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
