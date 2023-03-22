import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native"
import AppBar from '../components/AppBar'
import Button from '../components/Button'
import { MainStackParamList } from '../navigationType'

import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { Alert } from 'react-native'
import { firebaseInit } from '../../firebaseInit'
import { translateErrors } from '../utils'


type Props = {
  navigation: NativeStackNavigationProp<MainStackParamList, "LogIn" | "MemoList">
}

function SignUpScreen({ navigation }: Props) {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const auth = getAuth()

  const handleSubmit = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const { user } = userCredential;
      navigation.reset({
        index: 0,
        routes: [{ name: "MemoList"}]
      })
    })
    .catch((err) => {
      const errorMsg = translateErrors(err.code);
      Alert.alert(errorMsg.title, errorMsg.description);
      // Alert.alert(err.code)
    })
  }

  return (
    <View style={styles.container}>
      {/* <AppBar /> */}
      <View style={styles.inner}>
        <Text style={styles.title}>Sign In</Text>
        <TextInput
          value={email}
          style={styles.input}
          autoCapitalize="none"
          keyboardType='email-address'
          placeholder='Email Address'
          textContentType='emailAddress'
          onChangeText={(text) => { setEmail(text);}}/>

        <TextInput
          value={password}
          style={styles.input}
          autoCapitalize="none"
          placeholder='Password'
          secureTextEntry
          textContentType='password'
          onChangeText={(text) => { setPassword(text);}}/>

        <Button
          label='Submit'
          onPress={() => handleSubmit()} />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already registerd?</Text>
          <TouchableOpacity onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: "LogIn"}]
            })
          }}>
            <Text style={styles.footerLink}>Sign in here!</Text>
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
    // color: "#DDDDDD",
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

export default SignUpScreen