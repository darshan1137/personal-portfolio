import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD8x1h4qODrqc6j2mB0PPaBUROtGpA-1F0",
  authDomain: "darshan-khapekar.firebaseapp.com",
  projectId: "darshan-khapekar",
  storageBucket: "darshan-khapekar.appspot.com",
  messagingSenderId: "229765825904",
  appId: "1:229765825904:web:581211cdc2381cb92abbb5",
  measurementId: "G-TXPN1X14D2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db };
