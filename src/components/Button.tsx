import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from "react-native"

type Props = {
  label: string;
  onPress?: () => void;
}

function Button({label, onPress}: Props) {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
        <Text style={styles.buttonLabel}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#467FD3",
    borderRadius: 4,
    alignSelf: "flex-start",
    marginBottom: 24,
  },
  buttonLabel: {
    fontSize: 16,
    lineHeight: 32,
    paddingVertical: 8,
    paddingHorizontal: 32,
    color: "#fff"
  },
})

export default Button