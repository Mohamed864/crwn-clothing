// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNtGurV6U1EHU2iA1uSGkOwf4dVr3E_08",
  authDomain: "crwn-clothing-9a951.firebaseapp.com",
  projectId: "crwn-clothing-9a951",
  storageBucket: "crwn-clothing-9a951.appspot.com",
  messagingSenderId: "522116796554",
  appId: "1:522116796554:web:d2989edcce54c575591d73",
  measurementId: "G-192DH9R6Y3"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

// Google Auth Provider
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

// Sign-in function
const signInWithGoogle = () => signInWithPopup(auth, provider);

export { firebaseApp, auth, firestore, signInWithGoogle };
