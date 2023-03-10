import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Alert } from "react-native"
import AppBar from '../components/AppBar'
import CircleButton from '../components/CircleButton'
import { MainStackParamList } from '../navigationType'

export type Props = {
  navigation: NativeStackNavigationProp<MainStackParamList, "MemoDetail">;
}


function MemoEditScreen({ navigation }: Props) {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      {/* <AppBar /> */}
      <View style={styles.inputContainer}>
        <TextInput value="買い物リスト" multiline style={styles.input} />
      </View>

      <CircleButton
        name='check'
        onPress={() => {
          navigation.goBack();
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