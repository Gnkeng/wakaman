// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_1By9xEy8LK1kpsdIetKG8M2ekw28Cqw",
  authDomain: "wakaman-500fp.firebaseapp.com",
  projectId: "wakaman-500fp",
  storageBucket: "wakaman-500fp.appspot.com",
  messagingSenderId: "94279897170",
  appId: "1:94279897170:web:f9bffbb0796c6cec498f8b",
  measurementId: "G-8YCN9EER6D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

