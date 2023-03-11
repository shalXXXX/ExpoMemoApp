import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../navigationType';

type navigationType = NativeStackNavigationProp<MainStackParamList, "MemoDetail">

function MemoList() {
  const navigation = useNavigation<navigationType>();
  return (
    <View>
      <TouchableOpacity
        style={styles.memoListItem}
        onPress={() => {
          navigation.navigate("MemoDetail")
        }}>
        <View>
          <Text style={styles.memoListItemTitle}>買い物リスト</Text>
          <Text style={styles.memoListItemDate}>2020年12月24日</Text>
        </View>

        {/**削除ボタン */}
        <TouchableOpacity
          style={styles.memoDelete}
          onPress={() => {Alert.alert("Are you sure?")}}>
          <Feather name="x" size={16} color="#B0B0B0"/>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  memoListItem: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 19,
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.15)",
  },
  memoListItemTitle: {
    fontSize: 16,
    lineHeight: 32,
  },
  memoListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: "#848484"
  },
  memoDelete: {
    padding: 8,
  }
})
export default MemoList