import { View, Button, StyleSheet } from "react-native"
import { useState, useEffect } from "react"
import { supabase } from "../../lib/supabase"
import * as WebBrowser from "expo-web-browser"
import { router } from "expo-router"
import { makeRedirectUri } from "expo-auth-session"

// Add this at the top of your component
WebBrowser.maybeCompleteAuthSession()

export default function Login() {
	const [loading, setLoading] = useState(false)

	// Initialize WebBrowser
	useEffect(() => {
		WebBrowser.warmUpAsync()
		return () => {
			WebBrowser.coolDownAsync()
		}
	}, [])

	const redirectUrl = makeRedirectUri({
		scheme: "parvaah",
		path: "login-callback",
	})

	async function signInWithGoogle() {
		try {
			setLoading(true)
			const { data, error } = await supabase.auth.signInWithOAuth({
				provider: "google",
				options: {
					redirectTo: redirectUrl,
					skipBrowserRedirect: false, // Change this to false
					queryParams: {
						access_type: "offline",
						prompt: "consent",
					},
				},
			})

			if (error) throw error

			if (data?.url) {
				const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUrl, {
					showInRecents: true,
					preferEphemeralSession: true,
				})

				if (result.type === "success") {
					const {
						data: { session },
						error,
					} = await supabase.auth.getSession()
					if (error) throw error
					if (session) {
						router.replace("/(tabs)")
					}
				}
			}
		} catch (error) {
			console.error("Error:", error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<View style={styles.container}>
			<Button
				title={loading ? "Loading..." : "Sign in with Google"}
				onPress={signInWithGoogle}
				disabled={loading}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 20,
	},
})

