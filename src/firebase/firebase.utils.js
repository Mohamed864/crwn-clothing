// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIPFTpF4woQ_sVeAVunFkcTiqAfBxQVao",
  authDomain: "crwn-db-eea32.firebaseapp.com",
  projectId: "crwn-db-eea32",
  storageBucket: "crwn-db-eea32.appspot.com",
  messagingSenderId: "69185625563",
  appId: "1:69185625563:web:2c6b0bd74548b145c09bfe",
  measurementId: "G-X0ZGQLHM1K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

if (process.env.NODE_ENV === "production") {
  const analytics = getAnalytics(app);
}
// Initialize Firebase services
export const auth = getAuth(app);
export const firestore = getFirestore(app);

// Set up Google authentication
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

export default app;

/*
Modular SDK:

Replaced the use of firebase.auth() and firebase.firestore() with getAuth and getFirestore from the modular Firebase SDK.
Updated the Google Auth setup to use GoogleAuthProvider and signInWithPopup from the new SDK.
Error Handling:

Added a try-catch block for the signInWithGoogle function to handle errors gracefully.
Firestore Import:

Changed firebase.firestore() to getFirestore to align with the modular SDK approach.


*/
