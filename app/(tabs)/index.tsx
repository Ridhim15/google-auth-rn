import { View, Text, Button, StyleSheet } from "react-native"
import React, { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import { Session } from "@supabase/supabase-js"
import { router } from "expo-router"

const Index = () => {
	const [session, setSession] = useState<Session | null>(null)

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session)
		})

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session)
		})
	}, [])

	const handleLogout = async () => {
		try {
			const { error } = await supabase.auth.signOut()
			if (error) throw error
			// The _layout.tsx will handle the redirect to login
		} catch (error) {
			console.error("Error signing out:", error)
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Welcome to the Dashboard!</Text>
			{session?.user && (
				<>
					<Text style={styles.text}>Logged in as: {session.user.email}</Text>
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
	buttonContainer: {
		marginTop: 20,
	},
})

export default Index

