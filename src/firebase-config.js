import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD8ScqDiYlQonnBxsvWcSUwaL3psU8MruI',
  authDomain: 'safehygiene4u-4f485.firebaseapp.com',
  projectId: 'safehygiene4u-4f485',
  storageBucket: 'safehygiene4u-4f485.appspot.com',
  messagingSenderId: '324045373059',
  appId: '1:324045373059:web:25e1eb3c24f9eb7cb2a5b6',
  measurementId: 'G-6YC29DS74T',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };
