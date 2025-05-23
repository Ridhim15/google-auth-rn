import { Stack } from "expo-router"

export default function AuthLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name='login'
				options={{
					headerShown: true,
					headerTitle: "Authentication",
					headerTitleAlign: "center",
				}}
			/>
		</Stack>
	)
}

