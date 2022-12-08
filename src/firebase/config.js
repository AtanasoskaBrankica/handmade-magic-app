import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyByJgyi6XAkpfmME4Ccx6PbwJ9lZWzbdFg',
  authDomain: 'handmade-magic-app.firebaseapp.com',
  projectId: 'handmade-magic-app',
  storageBucket: 'handmade-magic-app.appspot.com',
  messagingSenderId: '874649349966',
  appId: '1:874649349966:web:1a3a9e434e55088533781f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
