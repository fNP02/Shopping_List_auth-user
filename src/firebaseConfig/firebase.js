// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import{getFirestore} from '@firebase/firestore'

import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4kDE2YTQZnJarFMMZ_ytXSEckmklgTdw",
  authDomain: "shopping-list-user.firebaseapp.com",
  projectId: "shopping-list-user",
  storageBucket: "shopping-list-user.appspot.com",
  messagingSenderId: "854280157892",
  appId: "1:854280157892:web:1108483de94c53bface791",
  measurementId: "G-8R7D763TJC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app)

export const auth = getAuth()
