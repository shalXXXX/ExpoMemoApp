import React, { ReactNode } from 'react'
import { View, StyleSheet, Text, StyleProp, TextStyle } from 'react-native'

type Props = {
	children: string;
	bang?: boolean;
	style?: StyleProp<TextStyle>;

}

function Hello({children, bang=false, style}: Props) {
	return (
		<View>
				<Text style={[styles.text, style]}>
					{`Hello ${children}${bang ? "!" : ""}`}
				</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	text: {
		color: "#ffffff",
		backgroundColor: "green",
		fontSize: 40,
		fontWeight: "bold",
		padding: 16,
	},
})

export default Hello;
