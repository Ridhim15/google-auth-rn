import { View, Button, StyleSheet } from "react-native"
import { useState, useEffect } from "react"
import { supabase } from "../../lib/supabase"
import * as WebBrowser from "expo-web-browser"
import { router } from "expo-router"
import { makeRedirectUri } from "expo-auth-session"
import LoginScreen from "../../components/login-screen"

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
		console.log("Sign in with Google button clicked")
		try {
			setLoading(true)
			console.log("Starting Google OAuth process...")
			const { data, error } = await supabase.auth.signInWithOAuth({
				provider: "google",
				options: {
					redirectTo: redirectUrl,
					skipBrowserRedirect: false,
					queryParams: {
						access_type: "offline",
						prompt: "consent",
					},
				},
			})

			if (error) {
				console.error("Error during OAuth setup:", error)
				throw error
			}

			console.log("OAuth URL generated:", data?.url)
			if (data?.url) {
				console.log("Opening auth session in browser...")
				const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUrl, {
					showInRecents: true,
					preferEphemeralSession: true,
				})

				console.log("Auth session result:", result)
				if (result.type === "success") {
					console.log("Browser authentication successful, getting session...")

					// Extract tokens from the URL
					const params = new URLSearchParams(result.url.split("#")[1])
					const access_token = params.get("access_token")
					const refresh_token = params.get("refresh_token")

					if (access_token) {
						console.log("Got access token, setting session...")
						const {
							data: { session },
							error: sessionError,
						} = await supabase.auth.setSession({
							access_token,
							refresh_token: refresh_token || "",
						})

						if (sessionError) {
							console.error("Error setting session:", sessionError)
							throw sessionError
						}

						if (session) {
							console.log("Session successfully created:")
							// Check if user has a role
							const { data: profile } = await supabase
								.from("user_profiles")
								.select("role")
								.eq("user_id", session.user.id)
								.single()

							if (!profile?.role) {
								router.replace("/(auth)/roles")
							} else {
								router.replace("/(tabs)")
							}
						} else {
							console.log("No session created after setting tokens")
						}
					} else {
						console.log("No access token found in callback URL")
					}
				} else {
					console.log("Browser authentication was not successful:", result.type)
				}
			} else {
				console.log("No OAuth URL was generated")
			}
		} catch (error) {
			console.error("Error during login process:", error)
		} finally {
			console.log("Login process completed, loading state reset")
			setLoading(false)
		}
	}

	return <LoginScreen signInWithGoogle={signInWithGoogle} loading={loading} />
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 20,
	},
})

