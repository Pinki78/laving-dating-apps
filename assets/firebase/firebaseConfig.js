import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBXnFLdtZT_Z0gjtLbqvsVpZVlQAFJTVSs",
  authDomain: "my-dating-apps1.firebaseapp.com",
  projectId: "my-dating-apps1",
  storageBucket: "my-dating-apps1.firebasestorage.app",
  messagingSenderId: "731462395494",
  appId: "1:731462395494:web:9dc435280e9a25929cafa7"
};

/* Initialize Firebase only once */
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

/* Auth with AsyncStorage persistence */
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

/* Firestore database */
export const db = getFirestore(app);