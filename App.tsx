import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import MemoCreateScreen from './src/screens/MemoCreateScreen';
import MemoDetailScreen from './src/screens/MemoDetailScreen';
import MemoEditScreen from './src/screens/MemoEditScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp, getApps } from "firebase/app";
import { initializeAuth } from "firebase/auth"
import { getReactNativePersistence } from 'firebase/auth/react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// ナビゲーションの実装
import MemoListScreen from './src/screens/MemoListScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import { firebaseConfig } from './env';

const Stack = createNativeStackNavigator();

// 初期化されているかの判定
if (getApps().length === 0) {
  const app = initializeApp(firebaseConfig);
//   initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage)
// })
}





export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator
       initialRouteName='LogIn'
       screenOptions={{ // ヘッダーのスタイル
        headerStyle: { backgroundColor: "#467FD3" },
        headerTitleStyle: { color: "#FFF"},
        headerTintColor: "#FFF",
        headerBackTitleVisible: false,
        headerTitle: "Test App",
        animation: "slide_from_right",
        gestureEnabled: true,
        gestureDirection: "horizontal",
       }}>
        <Stack.Screen
          name="LogIn"
          component={LoginScreen}
          options={{
            animation: "fade_from_bottom"
          }} />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            animation: "fade_from_bottom"
          }} />
        <Stack.Screen name="MemoList"   component={MemoListScreen} />
        <Stack.Screen name="MemoCreate" component={MemoCreateScreen} />
        <Stack.Screen name="MemoDetail" component={MemoDetailScreen} />
        <Stack.Screen name="MemoEdit"   component={MemoEditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
