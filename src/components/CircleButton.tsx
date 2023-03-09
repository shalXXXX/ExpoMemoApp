import React from 'react'
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native'

type Props = {
  children: string,
  style?: StyleProp<ViewStyle>
}
function CircleButton({ children, style }: Props) {
  return (
    <View style={[styles.circleBotton, style]}>
      <Text style={styles.circleBottonLabel}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  circleBotton: {
    backgroundColor: "#467FD3",
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 40,
    bottom: 40,
    // iOSのシャドウ
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    // androidのシャドウ
    elevation: 8,
  },
  circleBottonLabel: {
    color: "#fff",
    fontSize: 40,
    lineHeight: 46,
  }
})

export default CircleButton