import { NativeStackNavigationProp } from "@react-navigation/native-stack";


export type MainStackParamList = {
  MemoList: undefined;
  MemoDetail: {id?: string};
  MemoEdit: undefined;
  MemoCreate: undefined;
  LogIn: undefined;
  SignUp: undefined;
}

export type RouteStackParamList = {
  MemoDetail: {id: string};
}