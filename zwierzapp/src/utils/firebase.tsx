// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYpG7b-q_OuqOK7bqeZoGUtcGa87_cJlI",
  authDomain: "zwierzapp-2abcf.firebaseapp.com",
  projectId: "zwierzapp-2abcf",
  storageBucket: "zwierzapp-2abcf.appspot.com",
  messagingSenderId: "666893889016",
  appId: "1:666893889016:web:645a220d7d3b9f0387fa0d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app) 
export const auth = getAuth(app);