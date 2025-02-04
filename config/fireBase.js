// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpgCh05xKZrvGR50u5eJUOqrmpe079oCk",
  authDomain: "settleup-c6a24.firebaseapp.com",
  projectId: "settleup-c6a24",
  storageBucket: "settleup-c6a24.firebasestorage.app",
  messagingSenderId: "400653501654",
  appId: "1:400653501654:web:99894836e7147adbcf3577",
  measurementId: "G-LHQVS1P1SC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(app);
export const db = getFirestore(app);


