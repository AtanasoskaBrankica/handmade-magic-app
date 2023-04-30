import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

export const firebaseConfig = {
  apiKey: 'AIzaSyDIHLQhJ98aFY3Yo9OPfLOTohkL5ajvOQ0',
  authDomain: 'handmade-magic-eshop.firebaseapp.com',
  projectId: 'handmade-magic-eshop',
  storageBucket: 'handmade-magic-eshop.appspot.com',
  messagingSenderId: '399421781467',
  appId: '1:399421781467:web:2e24d68e7fe835b89863fe',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
