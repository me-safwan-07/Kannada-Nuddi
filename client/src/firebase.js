
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import process from 'process';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VITE_APP_APIKEY,
  authDomain: process.env.VITE_app_AUTH_DOMAIN,
  projectId: process.env.VITE_APP_PROJECTID,
  storageBucket: process.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VITE_APP_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);