// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXnFLdtZT_Z0gjtLbqvsVpZVlQAFJTVSs",
  authDomain: "my-dating-apps1.firebaseapp.com",
  projectId: "my-dating-apps1",
  storageBucket: "my-dating-apps1.firebasestorage.app",
  messagingSenderId: "731462395494",
  appId: "1:731462395494:web:9dc435280e9a25929cafa7",
  measurementId: "G-GPQNF7MZHF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);