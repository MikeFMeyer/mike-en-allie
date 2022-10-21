import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider }from "firebase/app-check";
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

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LfUAp0iAAAAAGax-qffMCve-jXk64_4EgjwmzpB'),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true
});

export { db };
