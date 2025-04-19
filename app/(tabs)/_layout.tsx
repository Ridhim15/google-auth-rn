import { Tabs } from "expo-router"
import { useEffect } from "react"
import { supabase } from "../../lib/supabase"
import { router } from "expo-router"

export default function TabsLayout() {
	// useEffect(() => {
	// 	checkSession()
	// }, [])

	// async function checkSession() {
	// 	const {
	// 		data: { session },
	// 	} = await supabase.auth.getSession()
	// 	if (!session) {
	// 		router.replace("/(auth)/login")
	// 	}
	// }

	return (
		<Tabs
			screenOptions={{
				headerShown: false, // This hides the header
			}}
		>
			<Tabs.Screen
				name='Community'
				options={{
					title: "Community",
				}}
			/>

			<Tabs.Screen
				name='index'
				options={{
					title: "Home",
				}}
			/>
			<Tabs.Screen
				name='Profile'
				options={{
					title: "Profile",
				}}
			/>
		</Tabs>
	)
}

