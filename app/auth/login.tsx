import { View, Button, StyleSheet } from "react-native"
import { useState } from "react"
import { supabase } from "../../lib/supabase"
import * as WebBrowser from "expo-web-browser"
import { router } from "expo-router"

export default function Login() {
	const [loading, setLoading] = useState(false)

	async function signInWithGoogle() {
		try {
			setLoading(true)
			const { data, error } = await supabase.auth.signInWithOAuth({
				provider: "google",
				options: {
					redirectTo: "yourscheme://",
					skipBrowserRedirect: true,
				},
			})

			if (error) throw error

			if (data) {
				const res = await WebBrowser.openAuthSessionAsync(data?.url ?? "", "yourscheme://")

				if (res.type === "success") {
					router.replace("/(tabs)")
				}
			}
		} catch (error) {
			console.error(error)
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

