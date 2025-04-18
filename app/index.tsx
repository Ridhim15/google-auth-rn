import { View, Text } from "react-native"
import React from "react"
import { Link } from "expo-router"

const index = () => {
	return (
		<View>
			<Text>Hello</Text>
			<Link href='/(auth)/login'>
				<Text>Login</Text>
			</Link>
			<Link href='/(tabs)'>
				<Text>Tabs</Text>
			</Link>
		</View>
	)
}

export default index

