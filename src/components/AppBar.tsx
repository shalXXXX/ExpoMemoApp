import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

function AppBar() {
  return (
    <View style={styles.appBar}>
      <View style={styles.appBarInner}>
        <Text style={styles.appBarTitle}>Memo App</Text>
        <Text style={styles.appBarRight}>ログアウト</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: "#467FD3",
    height: 104,
    width: "100%",
    justifyContent: "flex-end",
  },
  appBarInner: {
    alignItems: "center",
  },
  appBarTitle: {
    fontSize: 32,
    color: "white",
    fontWeight: "500",
    lineHeight: 32,
    marginBottom: 8,
  },
  appBarRight: {
    position: "absolute",
    right: 19,
    bottom: 16,
    color: "rgba(255, 255, 255, 0.7)",
  },
})

export default AppBar