import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth/react-native'
import { collection, doc, getFirestore, setDoc, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Alert } from "react-native"
import AppBar from '../components/AppBar'
import CircleButton from '../components/CircleButton'
import { MainStackParamList } from '../navigationType'

export type Props = {
  navigation: NativeStackNavigationProp<MainStackParamList, "MemoDetail">;
  route: RouteProp<MainStackParamList, "MemoEdit">
}



function MemoEditScreen({ navigation, route }: Props) {
  const { id, bodyText } = route.params; // 前の画面から値を持ってくる
  const [body, setBody] = useState<string>(bodyText)
  const auth = getAuth();
  const app = getApp();
  const user = auth.currentUser;
  const db = getFirestore(app);
  const ref = doc(collection(db, `users/${user?.uid}/memos`), id);
  const handlePress = async () => {
    try {
      await updateDoc(ref, {
        bodyText: body,
        updatedAt: new Date()
      });
      navigation.goBack();
    } catch (err: any) {
      Alert.alert(err.code)
    }
  }
  return (
    <KeyboardAvoidingView style={styles.container}>
      {/* <AppBar /> */}
      <View style={styles.inputContainer}>
        <TextInput
          value={body}
          multiline style={styles.input}
          onChangeText={(text) => setBody(text)} />
      </View>

      <CircleButton
        name='check'
        onPress={() => {
          handlePress();
        }}/>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    paddingVertical: 32,
    paddingHorizontal: 27,
    flex: 1,
  },
  input: {
    flex: 1,
    textAlignVertical: "top",
    fontSize: 16,
    lineHeight: 24,
  },
})

export default MemoEditScreen