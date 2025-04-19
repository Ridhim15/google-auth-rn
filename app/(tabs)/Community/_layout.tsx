import { Stack } from "expo-router"

const StackLayout = () => {
	return (
		<Stack>
			<Stack.Screen
				name='index'
				options={{
					headerTitle: "Community",
					headerTitleAlign: "center",
				}}
			/>
		</Stack>
	)
}

export default StackLayout

