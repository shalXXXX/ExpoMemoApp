import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApps, initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth/react-native";
import { firebaseConfig } from "./env";


export function firebaseInit() {
  if (getApps().length === 0) {
      const app = initializeApp(firebaseConfig);
      initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    })
  }
  const auth = getAuth()

  return auth
}