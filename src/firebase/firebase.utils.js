import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyBbdiQS9FS0zDun1HeaU32oMQFBTIeVaqM',
  authDomain: 'crown-clothing-app-db.firebaseapp.com',
  databaseURL: 'https://crown-clothing-app-db.firebaseio.com',
  projectId: 'crown-clothing-app-db',
  storageBucket: '',
  messagingSenderId: '236118453245',
  appId: '1:236118453245:web:a65d55d131f443ae'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return; // do nothing on sign out

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    // create user
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (err) {
      console.log('error creating user', err.message);
    }
  }
  return userRef;
};

firebase.initializeApp(FIREBASE_CONFIG);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
