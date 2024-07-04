// Import Firebase functions from npm packages
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCT2xu39-AfZKv1KDI3isG5xDZkm9kZoPw",
  authDomain: "projectdp3ak.firebaseapp.com",
  projectId: "projectdp3ak",
  storageBucket: "projectdp3ak.appspot.com",
  messagingSenderId: "602000338998",
  appId: "1:602000338998:web:f33f8953b3690c67efa897"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
