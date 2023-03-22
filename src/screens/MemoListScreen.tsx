import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, getFirestore, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Alert } from 'react-native'
import Button from '../components/Button';

import CircleButton from '../components/CircleButton';
import Loading from '../components/Loading';
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
  const [memos, setMemos] = useState<IMemo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const app = getApp();
  const db = getFirestore(app);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogOutButton />
    });
  }, []);

  
  useEffect(() => {
    if (!user) return;
    setIsLoading(true)
    const uid = user?.uid;
    const memoRef = collection(db, `users/${uid}/memos`);
    const q = query(memoRef, orderBy("updatedAt", "desc"))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      async function fetchData() {
        try {
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
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          Alert.alert(error)
        }
      }
      fetchData();
    });
    return unsubscribe;
  }, []);

  if (memos.length === 0) {
    return (
      <View style={emptyStyles.container}>
        <Loading isLoading={isLoading}/>
        <View style={emptyStyles.inner}>
          <Text style={emptyStyles.title}>最初のメモを作成しましょう</Text>
          <Button style={emptyStyles.button} label='作成する' onPress={() => {navigation.navigate("MemoCreate")}}/>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Loading isLoading={isLoading}/>
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

const emptyStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    marginBottom: 24,
  },
  button: {
    alignSelf: "center",
  }
})

export default MemoListScreen