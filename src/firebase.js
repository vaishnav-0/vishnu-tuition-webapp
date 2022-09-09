// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAJTsN58o8bGCGumH1KWSApMrUW8vXK-dQ",
  authDomain: "tuition-82216.firebaseapp.com",
  projectId: "tuition-82216",
  storageBucket: "tuition-82216.appspot.com",
  messagingSenderId: "972689873491",
  appId: "1:972689873491:web:73dc621e46f686352ac4a6"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app); 
const auth = getAuth(app);

export {firestore, storage, auth}