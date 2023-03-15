import React, { ReactElement } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../navigationType';
import { Timestamp } from 'firebase/firestore';
import { FlatList } from 'react-native';

type navigationType = NativeStackNavigationProp<MainStackParamList, "MemoDetail">
interface IMemo {
  id: string;
  bodyText: string;
  updatedAt: Timestamp;
}

type MemoArray = IMemo[]
// interface Item {
//   item: IMemo
// }
interface Props {
  memos: MemoArray
}

function MemoList({ memos }: Props) {
  const navigation = useNavigation<navigationType>();

  function RenderItem({item}: any) {
    return (
      <TouchableOpacity
      style={styles.memoListItem}
        onPress={() => {
          navigation.navigate("MemoDetail")
        }}>
        <View>
          <Text
          style={styles.memoListItemTitle}
           numberOfLines={1}>
            {item.bodyText}
          </Text>
          <Text style={styles.memoListItemDate}>{String(item.updatedAt)}</Text>
        </View>

        {/**削除ボタン */}
        <TouchableOpacity
          style={styles.memoDelete}
          onPress={() => {Alert.alert("Are you sure?")}}>
          <Feather name="x" size={16} color="#B0B0B0"/>
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={memos}
        renderItem={RenderItem}
        keyExtractor={(item) => item.id }
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
export default MemoList;