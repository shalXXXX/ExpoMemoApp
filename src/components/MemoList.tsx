import React, { ReactElement } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../navigationType';
import { collection, deleteDoc, deleteField, doc, getFirestore, Timestamp, updateDoc } from 'firebase/firestore';
import { FlatList } from 'react-native';
import { dateToString } from '../utils';
import { getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth/react-native';

type navigationType = NativeStackNavigationProp<MainStackParamList, "MemoDetail">
interface IMemo {
  id: string;
  bodyText: string;
  updatedAt: Date;
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
  const app = getApp();
  const auth = getAuth();
  const db = getFirestore(app);
  const user = auth.currentUser;
  
  const handlePress = (id: string) => {
    Alert.alert("メモを削除します", "よろしいですか？", [
      {
        text: "キャンセル", 
        onPress: () => {},
      },
      {
        text: "削除する",
        style: "destructive",
        onPress: async () => {
          await deleteDoc(doc(db, `users/${user?.uid}/memos/${id}`))
          .catch(() => {
            Alert.alert("削除に失敗しました。")
          });
        }
      }
    ])
  }

  function RenderItem({item}: any) {
    return (
      <TouchableOpacity
      style={styles.memoListItem}
        onPress={() => {
          navigation.navigate("MemoDetail", { id: item.id })
        }}>
        <View>
          <Text
          style={styles.memoListItemTitle}
           numberOfLines={1}
           >
            {item.bodyText}
          </Text>
          <Text style={styles.memoListItemDate}>{dateToString(item.updatedAt)}</Text>
        </View>

        {/**削除ボタン */}
        <TouchableOpacity
          style={styles.memoDelete}
          onPress={() => {handlePress(item.id);}}>
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