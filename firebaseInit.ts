import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth/react-native";
import { firebaseConfig } from "./env";

require("firebase/firestore");


export function firebaseInit() {
  let app
  if (getApps().length === 0) {
      app = initializeApp(firebaseConfig);
      initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    })
  } else {
    app = getApps()[0]
  }
  // const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]

  const auth = getAuth()
  return app
}