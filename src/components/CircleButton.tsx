import React, { ComponentProps } from 'react'
import { StyleSheet, StyleProp, ViewStyle, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons';

type Props = {
  style?: StyleProp<ViewStyle>
  name: ComponentProps<typeof Feather>["name"]
  onPress?: () => void
}
function CircleButton({ style, name, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.circleBotton, style]}
      onPress={onPress}>
      <Feather name={name} size={32} color="white" />
    </TouchableOpacity>
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