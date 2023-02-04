import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
// Your web app's Firebase configuration
// export const firebaseConfig = {
//   apiKey: 'AIzaSyByJgyi6XAkpfmME4Ccx6PbwJ9lZWzbdFg',
//   authDomain: 'handmade-magic-app.firebaseapp.com',
//   projectId: 'handmade-magic-app',
//   storageBucket: 'handmade-magic-app.appspot.com',
//   messagingSenderId: '874649349966',
//   appId: '1:874649349966:web:1a3a9e434e55088533781f',
// };

export const firebaseConfig = {
  apiKey: 'AIzaSyDIHLQhJ98aFY3Yo9OPfLOTohkL5ajvOQ0',
  authDomain: 'handmade-magic-eshop.firebaseapp.com',
  projectId: 'handmade-magic-eshop',
  storageBucket: 'handmade-magic-eshop.appspot.com',
  messagingSenderId: '399421781467',
  appId: '1:399421781467:web:2e24d68e7fe835b89863fe',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
