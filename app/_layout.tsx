import { useEffect } from "react"
import { Stack } from "expo-router"
import { supabase } from "../lib/supabase"
import { Session } from "@supabase/supabase-js"
import { router } from "expo-router"

export default function RootLayout() {
	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			if (!session) {
				router.replace("/auth/login")
			}
		})

		supabase.auth.onAuthStateChange((_event, session) => {
			if (!session) {
				router.replace("/auth/login")
			}
		})
	}, [])

	return <Stack />
}

