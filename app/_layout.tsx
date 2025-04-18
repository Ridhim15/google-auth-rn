import { useEffect, useState } from "react"
import { Stack } from "expo-router"
import { supabase } from "../lib/supabase"
import { Session } from "@supabase/supabase-js"
import { router } from "expo-router"
import { View, ActivityIndicator } from "react-native"

export default function RootLayout() {
	const [isLoading, setIsLoading] = useState(true)
	const [session, setSession] = useState<Session | null>(null)

	useEffect(() => {
		// Initial session check
		checkSession()

		// Listen for auth changes
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (event, currentSession) => {
			console.log("Auth state changed:", event)
			setSession(currentSession)

			if (!currentSession) {
				console.log("No session, redirecting to login")
				router.replace("/auth/login")
			} else {
				console.log("Session found, redirecting to tabs")
				router.replace("/(tabs)")
			}
			setIsLoading(false)
		})

		// Cleanup subscription
		return () => {
			subscription.unsubscribe()
		}
	}, [])

	async function checkSession() {
		try {
			const {
				data: { session: currentSession },
				error,
			} = await supabase.auth.getSession()
			if (error) throw error

			setSession(currentSession)
			if (!currentSession) {
				console.log("Initial check: No session, redirecting to login")
				router.replace("/auth/login")
			} else {
				console.log("Initial check: Session found, redirecting to tabs")
				router.replace("/(tabs)")
			}
		} catch (error) {
			console.error("Error checking session:", error)
			router.replace("/auth/login")
		} finally {
			setIsLoading(false)
		}
	}

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size='large' />
			</View>
		)
	}

	return <Stack />
}

