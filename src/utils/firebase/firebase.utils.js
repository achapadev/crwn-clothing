import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
// getDoc and setDoc represent getting the document data and setting the document data
// doc is what you need to get a document instance
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // don't need a provider from createUserWithEmailAndPassword because its a native provider
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCAFOWL_o13Q9H4_4sS-JQVyL17pYky2iA',

  authDomain: 'crwn-clothing-db-678ff.firebaseapp.com',

  projectId: 'crwn-clothing-db-678ff',

  storageBucket: 'crwn-clothing-db-678ff.appspot.com',

  messagingSenderId: '321352866886',

  appId: '1:321352866886:web:c7c7af63cec14171127e47',
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

// needed to use google authentication
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// create and connect to our database in console
export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation
) => {
  if (!userAuth) return;
  // takes 3 arguments: a database, collection, identifier
  // we have user doc reference and from it we got a snapshot which allows
  //   us to check whether or not there is an instance of it that exists and access the data
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  //   on the object returned from getDoc there is a method called exists
  //   tells us if the reference and data related to that reference exists
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  //if user data does not exist
  //create / set the document with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  // if user data exists
  return userDocRef;
  // return userDocRef
};

// we are making an authenticated user inside of our firebase authentication tab
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};
