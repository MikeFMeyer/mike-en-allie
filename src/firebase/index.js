import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: "wedding-invites-5f1fe.firebaseapp.com",
  projectId: "wedding-invites-5f1fe",
  storageBucket: "wedding-invites-5f1fe.appspot.com",
  messagingSenderId: "681510411650",
  appId: "1:681510411650:web:8f56daa1dfce6d2f20c39b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export { db };
