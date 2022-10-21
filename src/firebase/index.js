import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: "mike-en-allie-invites.firebaseapp.com",
  projectId: "mike-en-allie-invites",
  storageBucket: "mike-en-allie-invites.appspot.com",
  messagingSenderId: "1052926152786",
  appId: "1:1052926152786:web:fb611ace36f72a05908f8b"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export { db };
