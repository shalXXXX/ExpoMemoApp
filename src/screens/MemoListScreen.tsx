import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, getFirestore, orderBy, query, Timestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'

import CircleButton from '../components/CircleButton';
import LogOutButton from '../components/LogOutButton';
import MemoList from '../components/MemoList';
import { MainStackParamList } from '../navigationType';

type Props = {
  navigation: NativeStackNavigationProp<MainStackParamList, "MemoCreate">
}

interface IMemo {
  id: string;
  bodyText: string;
  updatedAt: Date;
}

function MemoListScreen({ navigation }: Props) {
  const [memos, setMemos] = useState<IMemo[]>([])
  const app = getApp();
  const db = getFirestore(app);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogOutButton />
    });
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (!user) return;

      async function fetchData() {
        try {
          const uid = user?.uid;
          const memoRef = collection(db, `users/${uid}/memos`);
          const q = query(memoRef, orderBy("updatedAt", "desc"))
          const querySnapshot = await getDocs(q);
          const userMemos: IMemo[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            userMemos.push({
              id: doc.id,
              bodyText: data.bodyText,
              updatedAt: data.updatedAt.toDate(),
            });
          });
          setMemos(userMemos);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <MemoList memos={memos}/>
      <CircleButton
        name="plus"
        onPress={() => {navigation.navigate("MemoCreate")}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    overflow: "scroll",
  },
});

export default MemoListScreen