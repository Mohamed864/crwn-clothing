// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, getFirestore, writeBatch } from "firebase/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";

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

/* storing data of auth in database */
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(firestore, `users/${userAuth.uid}`);
  const snapShot = await getDoc(userRef);

  if (!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user document:", error);
    }
  }

  return userRef;
};

//for collections
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(firestore, collectionKey); // Reference to the collection
  console.log(collectionRef);

  const batch = writeBatch(firestore);

  objectsToAdd.forEach((obj) => {
    const newDocRef = doc(collectionRef); // Generate a new document reference
    console.log(newDocRef);

    batch.set(newDocRef, obj); // Add the object to the batch
  });

  try {
    await batch.commit(); // Commit the batch operation
    console.log("Batch write completed successfully.");
  } catch (error) {
    console.error("Error adding documents in batch:", error);
  }
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
    console.log("Signed in user:", result.user);
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
