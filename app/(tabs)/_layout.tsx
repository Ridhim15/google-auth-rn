import { Tabs } from "expo-router"
import { useEffect } from "react"
import { supabase } from "../../lib/supabase"
import { router } from "expo-router"

export default function TabsLayout() {
	// Verify session on tabs mount
	useEffect(() => {
		checkSession()
	}, [])

	async function checkSession() {
		const {
			data: { session },
		} = await supabase.auth.getSession()
		if (!session) {
			router.replace("/(auth)/login")
		}
	}

	return (
		<Tabs screenOptions={{ headerShown: false }}>
			<Tabs.Screen
				name='index'
				options={{
					title: "Home",
					tabBarLabel: "Home",
					headerShown: true,
				}}
			/>
		</Tabs>
	)
}

