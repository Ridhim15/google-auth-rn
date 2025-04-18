import { useEffect, useState } from "react"
import { Slot, useSegments, useRouter } from "expo-router"
import { supabase } from "../lib/supabase"
import { Session } from "@supabase/supabase-js"
import { Alert } from "react-native"

// This hook will protect the route access based on user authentication and role
function useProtectedRoute(session: Session | null) {
	const segments = useSegments()
	const router = useRouter()

	useEffect(() => {
		const inAuthGroup = segments[0] === "(auth)"

		const checkUserRole = async () => {
			if (session?.user) {
				const { data: profile, error } = await supabase
					.from("user_profiles")
					.select("role")
					.eq("user_id", session.user.id)
					.single()

				if (!profile?.role && !inAuthGroup) {
					Alert.alert("Role Required", "Please select your role to continue", [{ text: "OK" }])
					router.replace("/(auth)/roles")
					return
				}
			}

			if (!session && !inAuthGroup) {
				// Redirect to the sign-in page if not signed in
				router.replace("/(auth)/login")
			} else if (session && inAuthGroup && segments[1] !== "roles") {
				// Only redirect away from auth group if signed in and not on roles page
				router.replace("/(tabs)")
			}
		}

		checkUserRole()
	}, [session, segments])
}

export default function RootLayout() {
	const [session, setSession] = useState<Session | null>(null)

	useEffect(() => {
		// Check current session
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session)
		})

		// Listen for auth changes
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session)
		})

		return () => subscription.unsubscribe()
	}, [])

	useProtectedRoute(session)

	// Return the Slot for child routes to render
	return <Slot />
}

