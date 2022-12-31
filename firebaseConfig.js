import { initializeApp } from "firebase/app";

import {
  initializeAuth,
  getReactNativePersistence,
  signInWithEmailAndPassword,
} from "firebase/auth/react-native";

import { getFirestore } from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAzf0SxIqnQa2LMftBM5aRfReMA8fbHfls",
  authDomain: "farrell-fitness-rn-app.firebaseapp.com",
  projectId: "farrell-fitness-rn-app",
  storageBucket: "farrell-fitness-rn-app.appspot.com",
  messagingSenderId: "568037006855",
  appId: "1:568037006855:web:1cb504c790952d5de154a2",
  measurementId: "G-3SZ2WJ8X4E",
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);

export const signIn = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = await res.user;
    return user;
  } catch (error) {
    console.error(error);
  }
};
