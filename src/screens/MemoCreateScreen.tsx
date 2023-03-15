import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { View, StyleSheet, TextInput, KeyboardAvoidingView, Keyboard} from "react-native"
import CircleButton from '../components/CircleButton'
import { MainStackParamList } from '../navigationType'
import { getFirestore, collection, addDoc } from "firebase/firestore"
import { getAuth } from 'firebase/auth'
import { getApp, getApps } from 'firebase/app'
type Props = {
  navigation: NativeStackNavigationProp<MainStackParamList, "MemoList">
}

function MemoCreateScreen({ navigation }: Props) {
  const [memo, setMemo] = useState<string>("")
  // const {app, auth} = firebaseInit()
  const app = getApp()
  const auth = getAuth()
  const user = auth.currentUser;

  const handlePress = async () => {
    const db = getFirestore(app)
    console.log("User: ",user?.uid)
    try {
      const docRef = await addDoc(collection(db, `users/${user?.uid}/memos`), {
        bodyText: memo,
        updatedAt: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
      navigation.goBack();
    } catch(e) {
      console.log(e);
    }
  }
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          value={memo}
          multiline style={styles.input}
          onSubmitEditing={Keyboard.dismiss}
          placeholder="メモを入力"
          autoFocus
          onChangeText={(t) => {setMemo(t);}} />
      </View>

      <CircleButton
        name='check'
        onPress={() => { handlePress();}}/>
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

export default MemoCreateScreen