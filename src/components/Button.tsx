import React from 'react'
import { View, Text, StyleSheet } from "react-native"

type Props = {
  label: string
}

function Button({label}: Props) {
  return (
    <View style={styles.buttonContainer}>
        <Text style={styles.buttonLabel}>{label}</Text>
    </View>
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