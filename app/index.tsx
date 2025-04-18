import { Text, View } from "react-native"
import { Link } from "expo-router"

export default function Index() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text>Edit app/index.tsx to edit this screen.</Text>
			<Link href='/auth/login' style={{ marginTop: 20, color: "blue" }}>
				Go to Auth Page
			</Link>
		</View>
	)
}

