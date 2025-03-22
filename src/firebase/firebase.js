import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDqWZnCe1vBoR2__QcPV2QADGb5oL1LAYk",
    authDomain: "joyrideins-6cf82.firebaseapp.com",
    projectId: "joyrideins-6cf82",
    storageBucket: "joyrideins-6cf82.firebasestorage.app",
    messagingSenderId: "73103926174",
    appId: "1:73103926174:web:8301080fea2d5eb168ec8f",
    measurementId: "G-8SBH44R940"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier, signInWithPhoneNumber };