import React from 'react'
import { View, Text, TextInput, StyleSheet } from "react-native"
import AppBar from '../components/AppBar'
import Button from '../components/Button'
 
function SignUpScreen() {
  return (
    <View style={styles.container}>
      <AppBar />
      <View style={styles.inner}>
        <Text style={styles.title}>Sign In</Text>
        <TextInput value="Email Address" style={styles.input}/>
        <TextInput value="Password" style={styles.input}/>

        <Button label='Submit' />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already registerd?</Text>
          <Text style={styles.footerLink}>Sign in here!</Text>
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
    color: "#DDDDDD",
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