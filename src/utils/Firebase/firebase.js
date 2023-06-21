import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCp4-tX7NOnzNMa2I0ROq61tYcCUKH9GUs",
  authDomain: "drags-1d298.firebaseapp.com",
  projectId: "drags-1d298",
  storageBucket: "drags-1d298.appspot.com",
  messagingSenderId: "519013187721",
  appId: "1:519013187721:web:9209977e18db6c76150658",
};

// Initialize Firebase
// eslint-disable-next-line no-unused-vars
const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const db = getFirestore();

//to create a user profile document in firestore
export const createUserProfileDocumentFromAuth = async (
  userAuth,
  additionalInfo = {}
) => {
  if (!userAuth) return;
  //to check if the user is signed in
  const userDocRef = doc(db, "users", userAuth.uid);
  const userDocSnap = await getDoc(userDocRef);
  console.log(userDocSnap.exists());
  // if the user is not signed in then create a user profile document in firestore
  if (!userDocSnap.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
      alert("Account created successfully");
    } catch (error) {
      console.log(error);
    }
  } else {
    alert("user already exists");
  }
};
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
