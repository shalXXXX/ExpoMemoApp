import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react'
import { StyleSheet, View } from 'react-native'
import AppBar from '../components/AppBar';
import CircleButton from '../components/CircleButton';
import MemoList from '../components/MemoList';
import { MainStackParamList } from '../navigationType';

type Props = {
  navigation: NativeStackNavigationProp<MainStackParamList, "MemoCreate">
}
function MemoListScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      {/* <AppBar /> */}
      <MemoList />
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