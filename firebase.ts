// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDHajtQYegZNvp0MlTB9iYs7iHHcgHOJsU",
  authDomain: "test-b7ad7.firebaseapp.com",
  projectId: "test-b7ad7",
  storageBucket: "test-b7ad7.appspot.com",
  messagingSenderId: "745332489256",
  appId: "1:745332489256:web:266424fe70c23cb6c4c91d",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
auth.useDeviceLanguage();

export { auth };
