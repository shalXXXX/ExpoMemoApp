import React, { ReactNode, useEffect, useState } from 'react'
import { View, ScrollView, Text, StyleSheet, Alert } from 'react-native'
import AppBar from '../components/AppBar'
import CircleButton from '../components/CircleButton'
import { Feather } from '@expo/vector-icons';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../navigationType';
import { RouteProp } from '@react-navigation/native';
import { getApp } from 'firebase/app';
import { collection, doc, getDoc, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { dateToString } from '../utils';

type Props = {
  navigation: NativeStackNavigationProp<MainStackParamList, "MemoEdit">
  route: RouteProp<MainStackParamList, "MemoDetail">
}

// type Props = NativeStackScreenProps<MainStackParamList, "MemoDetail">

function MemoDetailScreen({ navigation, route }: Props) {
  const [memo, setMemo] = useState<{id: string, bodyText: string, updatedAt: Date | null}>({id: "", bodyText: "", updatedAt: null})
  const { id } = route.params;
  const app = getApp()
  const db = getFirestore(app);
  const auth = getAuth()
  const user = auth.currentUser;
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (!user) return;
      
      async function fetchData(id: string) {
        try {
          const uid = user?.uid;
          const docRef = doc(db, `users/${uid}/memos`, id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setMemo({
              id: docSnap.id,
              bodyText: data.bodyText,
              updatedAt: data.updatedAt.toDate()
            });
          } else {
            Alert.alert("そのようなメモはありません")
          }
        } catch (error: any) {
          Alert.alert(error)
        }
      };
      if (id) {
        fetchData(id);
      } else {
        Alert.alert("no such id");
      };
    });
    return unsubscribe;
  }, [navigation])
  
  return (
    <View style={styles.container}>
      {/* <AppBar /> */}
      <View style={styles.memoHeader}>
        <Text style={styles.memoTitle} numberOfLines={1}>{memo.bodyText}</Text>
        <Text style={styles.memoDate}>{memo && dateToString(memo.updatedAt)}</Text>
      </View>

      <ScrollView style={styles.memoBody}>
        <Text style={styles.memoText}>
        {memo.bodyText}
        </Text>
      </ScrollView>
      <CircleButton
        style={{top: 60, bottom: "auto"}}
        name="edit-2"
        onPress={() => {
          navigation.navigate("MemoEdit", { id: memo.id, bodyText: memo.bodyText})
        }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  memoHeader: {
    backgroundColor: "#467FD3",
    height: 96,
    justifyContent: "center",
    paddingVertical: 24,
    paddingHorizontal: 19,
  },
  memoTitle: {
    color: "white",
    fontSize: 20,
    lineHeight: 32,
    fontWeight: "bold",
  },
  memoDate: {
    color: "#fff",
    fontSize: 12,
    lineHeight: 16,
  },
  memoBody: {
    paddingVertical: 32,
    paddingHorizontal: 27,
  },
  memoText: {
    fontSize: 16,
    lineHeight: 24,

  }
})

export default MemoDetailScreen