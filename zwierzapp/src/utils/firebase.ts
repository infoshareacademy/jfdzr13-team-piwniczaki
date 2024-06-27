import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYpG7b-q_OuqOK7bqeZoGUtcGa87_cJlI",
  authDomain: "zwierzapp-2abcf.firebaseapp.com",
  projectId: "zwierzapp-2abcf",
  storageBucket: "zwierzapp-2abcf.appspot.com",
  messagingSenderId: "666893889016",
  appId: "1:666893889016:web:645a220d7d3b9f0387fa0d",
};

export const app = initializeApp(firebaseConfig);
export const db: Firestore = getFirestore(app);
export const auth = getAuth(app);
