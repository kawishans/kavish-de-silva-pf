import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Firebase client configuration keys
const firebaseConfig = {
  apiKey: 'AIzaSyD2j4NFs1crzCiJPj8mmAJH4ICoc3B3Bes',
  authDomain: 'kavish-pf-auth.firebaseapp.com',
  projectId: 'kavish-pf-auth',
  storageBucket: 'kavish-pf-auth.firebasestorage.app',
  messagingSenderId: '415930908906',
  appId: '1:415930908906:web:51c971d38486b70d821793',
  databaseURL: 'https://kavish-pf-auth-default-rtdb.firebaseio.com',
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const rtdb = getDatabase(app);
export default app;
