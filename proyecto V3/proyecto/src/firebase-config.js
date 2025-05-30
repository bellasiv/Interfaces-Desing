import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDNwBvnatL4exhA9D3QrR5CBUXwGe8as0U",
  authDomain: "pawpals-4f8d9.firebaseapp.com",
  projectId: "pawpals-4f8d9",
  storageBucket: "pawpals-4f8d9.firebasestorage.app",
  messagingSenderId: "976688850915",
  appId: "1:976688850915:web:bfee01e29c5b09356ba2d6",
  measurementId: "G-YVJWE0S674"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db };
