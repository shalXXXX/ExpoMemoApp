import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MemoCreateScreen from './src/screens/MemoCreateScreen';
import MemoDetailScreen from './src/screens/MemoDetailScreen';
import MemoEditScreen from './src/screens/MemoEditScreen';


import MemoListScreen from './src/screens/MemoListScreen';

export default function App() {
  return (
    // <MemoListScreen />
    // <MemoDetailScreen />
    <MemoEditScreen />
    // <MemoCreateScreen />
  )
}
