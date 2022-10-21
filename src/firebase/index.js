import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCkYxrFMgrByiEEywLQss8onKsfR-OLNpA",
  authDomain: "wedding-invites-5f1fe.firebaseapp.com",
  projectId: "wedding-invites-5f1fe",
  storageBucket: "wedding-invites-5f1fe.appspot.com",
  messagingSenderId: "681510411650",
  appId: "1:681510411650:web:3353726b50d0d4b420c39b"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export { db };
