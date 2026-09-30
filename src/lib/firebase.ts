import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyClRr-tnqFuMGi7qzDOkxQ7wiedcEsnGUo",
  authDomain: "thinkbot-61daa.firebaseapp.com",
  projectId: "thinkbot-61daa",
  storageBucket: "thinkbot-61daa.firebasestorage.app",
  messagingSenderId: "461737721093",
  appId: "1:461737721093:web:9edb7cf288c885f9bccb6c",
  measurementId: "G-847JBXXTVB"
};

// Initialize Firebase app
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore targeting default database (documents stored in 'blackburger' collection)
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export default app;
