import { View, Text, Button, StyleSheet, Image } from "react-native"
import React, { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import { Session } from "@supabase/supabase-js"
import { Link } from "expo-router"

const Index = () => {
	const [session, setSession] = useState<Session | null>(null)
	const [userRole, setUserRole] = useState<string | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchUserData()
	}, [])

	const fetchUserData = async () => {
		try {
			// Get current session
			const {
				data: { session },
			} = await supabase.auth.getSession()
			setSession(session)

			if (session?.user) {
				// Fetch user role from profiles
				const { data, error } = await supabase
					.from("user_profiles")
					.select("role")
					.eq("user_id", session.user.id)
					.single()

				if (error) throw error
				setUserRole(data?.role)
			}
		} catch (error) {
			console.error("Error fetching user data:", error)
		} finally {
			setLoading(false)
		}
	}

	const handleLogout = async () => {
		try {
			const { error } = await supabase.auth.signOut()
			if (error) throw error
			// The _layout.tsx will handle the redirect to login
		} catch (error) {
			console.error("Error signing out:", error)
		}
	}

	if (loading) {
		return (
			<View style={styles.container}>
				<Text>Loading...</Text>
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Welcome to the Dashboard!</Text>
			{session?.user && (
				<>
					<Text style={styles.text}>Logged in as: {session.user.email}</Text>
					{/* Display user profile image and name */}
					{session.user.user_metadata.picture && (
						<Image
							source={{ uri: session.user.user_metadata.picture }}
							style={styles.profileImage}
						/>
					)}
					<Text style={styles.text}>Name: {session.user.user_metadata.name}</Text>
					<Text style={styles.roleText}>
						Your role:{" "}
						{userRole
							? userRole.charAt(0).toUpperCase() + userRole.slice(1).toLowerCase()
							: "Not set"}
					</Text>
					<View style={styles.buttonContainer}>
						<Button title='Sign Out' onPress={handleLogout} />
					</View>
				</>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	text: {
		fontSize: 16,
		marginBottom: 20,
	},
	roleText: {
		fontSize: 18,
		fontWeight: "500",
		marginBottom: 20,
		color: "#333",
	},
	buttonContainer: {
		marginTop: 20,
	},
	profileImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginBottom: 20,
	},
})

export default Index

