// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc,getDoc,setDoc, onSnapshot } from 'firebase/firestore';

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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userDocRef = doc(firestore, `users/${userAuth.uid}`);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.error('Error creating user document', error);
    }
  }

  return userDocRef;
}

export { firebaseApp, auth, firestore, signInWithGoogle };
