import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { getAuth } from 'firebase/auth'
import { signOut } from 'firebase/auth/react-native'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Alert } from 'react-native/Libraries/Alert/Alert'
import { firebaseInit } from '../../firebaseInit'
import { MainStackParamList } from '../navigationType'

function LogOutButton() {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList, "LogIn">>()
  const auth = getAuth()
  const handlePress = () => {
    signOut(auth)
    .then(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "LogIn" }]
      })
    })
    .catch((err) => {
      Alert.alert("ログアウトに失敗しました")
    });
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {handlePress();}}>
      <Text style={styles.label}>ログアウト</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  label: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
  }
})

export default LogOutButton