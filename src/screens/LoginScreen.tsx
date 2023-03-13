import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native"
import AppBar from '../components/AppBar'
import Button from '../components/Button'
import { MainStackParamList } from '../navigationType'

type Props = {
  navigation : NativeStackNavigationProp<MainStackParamList, "SignUp" | "MemoList">
}

function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const auth = getAuth()

  const handleSubmit = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      navigation.reset({
        index: 0,
        routes: [{ name: "MemoList" }],
      })
    })
    .catch((err) => {
      Alert.alert(err.message)
    })

  }

  return (
    <View style={styles.container}>
      {/* <AppBar /> */}
      <View style={styles.inner}>
        <Text style={styles.title}>Log In</Text>
        <TextInput
          value={email}
          style={styles.input}
          autoCapitalize="none" // 最初の文字が大文字にならないようにする
          keyboardType='email-address'
          placeholder='Email Address'
          textContentType='emailAddress'
          onChangeText={(text) => { setEmail(text)}}/>

        <TextInput
          value={password}
          style={styles.input}
          autoCapitalize="none"
          placeholder='Password'
          secureTextEntry
          textContentType='password'
          onChangeText={(text) => { setPassword(text)}}/>

        <Button
          label='Submit'
          onPress={() => handleSubmit()} />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Not registerd?</Text>
          <TouchableOpacity onPress={() => { navigation.reset({
            index: 0,
            routes: [{ name: "SignUp"}]
          })}}>
            <Text style={styles.footerLink}>Sign up here!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8"
  },
  inner: {
    paddingHorizontal: 27,
    paddingVertical: 24,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    fontSize: 16,
    height: 48,
    borderColor: "#DDDDDD",
    borderWidth: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginBottom: 16,
  },
  footer: {
    flexDirection: "row"
  },
  footerText: {
    fontSize: 14,
    lineHeight: 24,
    marginRight: 8
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 24,
    color: "#467FD3"
  }
})

export default LoginScreen