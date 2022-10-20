// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDk5PtntJZCdTTtByCZZwmhwbs5Fhqj4Po",
  authDomain: "actividad20-c88bd.firebaseapp.com",
  projectId: "actividad20-c88bd",
  storageBucket: "actividad20-c88bd.appspot.com",
  messagingSenderId: "197219187260",
  appId: "1:197219187260:web:8c427efdbb315e1249e139"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore (app)
export {db}