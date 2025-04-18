import { useRouter } from "expo-router"
import React, { useState } from "react"
import { Image, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from "react-native"
import { supabase } from "../../lib/supabase"

const RolesScreen = () => {
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	const handleRoleSelection = async (role: string) => {
		try {
			setLoading(true)

			// Get current user
			const {
				data: { user },
			} = await supabase.auth.getUser()
			if (!user) throw new Error("No user found")

			// Update user's role in the database
			const { error } = await supabase.from("user_profiles").upsert({
				user_id: user.id,
				role: role,
				updated_at: new Date().toISOString(),
			})

			if (error) throw error

			// Redirect based on role
			router.replace("/(tabs)")
		} catch (error) {
			console.error("Error setting role:", error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<View style={styles.container}>
			<Image source={require("../../assets/icons/splash-icon.png")} style={styles.logo} />
			<Text style={styles.title}>Welcome to Parvah!</Text>
			<Text style={styles.subtitle}>Tell us who you are?</Text>

			{loading ? (
				<ActivityIndicator size='large' color='#653600' />
			) : (
				<>
					<TouchableOpacity style={styles.button} onPress={() => handleRoleSelection("elderly")}>
						<Text style={styles.buttonText}>An Elderly</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.button} onPress={() => handleRoleSelection("relative")}>
						<Text style={styles.buttonText}>A Relative of Elderly</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.button} onPress={() => handleRoleSelection("caregiver")}>
						<Text style={styles.buttonText}>A Care Provider</Text>
					</TouchableOpacity>
				</>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
	},
	logo: {
		width: "50%",
		height: 100,
		marginBottom: 20,
	},
	title: {
		fontSize: 22,
		fontWeight: "bold",
		color: "#653600",
		marginBottom: 10,
	},
	subtitle: {
		fontSize: 16,
		color: "#333",
		marginBottom: 20,
	},
	button: {
		width: "80%",
		padding: 15,
		marginVertical: 8,
		backgroundColor: "white",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "black",
		alignItems: "center",
		justifyContent: "center",
	},
	buttonText: {
		fontSize: 16,
		fontWeight: "bold",
		color: "black",
		textAlign: "center",
	},
})

export default RolesScreen

