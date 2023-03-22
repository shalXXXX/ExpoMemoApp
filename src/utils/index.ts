import { format } from "date-fns";

export function dateToString(date: Date | null): string {
  if (!date) { return "";}
  return format(date, "yyyy年M月d日 hh時mm分")
}

type Error = {
  title: string;
  description: string;
}

export function translateErrors(code: any): Error {
  const error: Error = { title: "エラー", description: ""};
  switch (code) {
    case "auth/invalid-email":
      error.description = "メールアドレスが不正です"
      break;
    case "auth/user-disabled":
      error.description = "アカウントが無効です。"
      break;
    case "auth/user-not-found":
      error.description = "ユーザーが見つかりませんでした。"
      break;
    case "auth/wrong-password":
      error.description = "パスワードが間違っています。"
      break;
    case "auth/email-already-in-use":
      error.description = "メールアドレスが既に登録されています。"
      break;
    case "auth/operation-not-allowd":
      error.description = "開発者にお問い合わせください"
      break;
    case "auth/weak-password":
      error.description = "パスワードが簡単すぎます"
      break;
    case "auth/wrong-password":
      error.description = "パスワードが間違っています。"
      break;
    default:
      error.description = "時間をおいてお試しください。"
  }
  return error;
}