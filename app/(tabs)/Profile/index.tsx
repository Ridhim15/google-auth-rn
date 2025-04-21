import { Ionicons } from "@expo/vector-icons"
import React, { useEffect, useState } from "react"
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ActivityIndicator,
} from "react-native"
import { supabase } from "../../../lib/supabase"
import { Session } from "@supabase/supabase-js"

interface UserProfile {
	name: string
	email: string
	phone: string
	address: string
	blood_group: string
	diseases: string[]
	profile_image_url: string
}

const Profile = () => {
	const [session, setSession] = useState<Session | null>(null)
	const [profile, setProfile] = useState<UserProfile | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchUserProfile()
	}, [])

	const fetchUserProfile = async () => {
		try {
			const {
				data: { session },
			} = await supabase.auth.getSession()
			setSession(session)

			if (session?.user) {
				const { data, error } = await supabase
					.from("user_profiles")
					.select("*")
					.eq("user_id", session.user.id)
					.single()

				if (error) throw error
				setProfile(data)
			}
		} catch (error) {
			console.error("Error fetching profile:", error)
		} finally {
			setLoading(false)
		}
	}

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size='large' color='#FF5722' />
			</View>
		)
	}

	return (
		<ScrollView style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<TouchableOpacity>
					<Ionicons name='arrow-back' size={24} color='white' />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Profile</Text>
				<TouchableOpacity>
					<Ionicons name='notifications-outline' size={24} color='white' />
				</TouchableOpacity>
			</View>

			<View style={styles.profileCard}>
				<Image
					source={
						profile?.profile_image_url
							? { uri: profile.profile_image_url }
							: require("../../../assets/images/profile_def_m.png")
					}
					style={styles.profileImage}
				/>
				<TouchableOpacity style={styles.editProfileButton}>
					<Text style={styles.editProfileText}>Edit Profile</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.infoCard}>
				<Text style={styles.sectionTitle}>Medical Information</Text>
				<View style={styles.infoRow}>
					<Text style={styles.infoLabel}>Blood group:</Text>
					<Text style={styles.infoValue}>{profile?.blood_group || "Not provided"}</Text>
				</View>
				<View style={styles.infoRow}>
					<Text style={styles.infoLabel}>Diseases:</Text>
					<Text style={styles.infoValue}>{profile?.diseases?.join(", ") || "None reported"}</Text>
				</View>
			</View>

			<View style={styles.infoCard}>
				<Text style={styles.sectionTitle}>Profile Information</Text>
				<View style={styles.infoRow}>
					<Text style={styles.infoLabel}>Name:</Text>
					<Text style={styles.infoValue}>
						{profile?.name || session?.user?.user_metadata?.name || "Not provided"}
					</Text>
				</View>
				<View style={styles.infoRow}>
					<Text style={styles.infoLabel}>Email:</Text>
					<Text style={styles.infoValue}>
						{profile?.email || session?.user?.email || "Not provided"}
					</Text>
				</View>
				<View style={styles.infoRow}>
					<Text style={styles.infoLabel}>Phone:</Text>
					<Text style={styles.infoValue}>{profile?.phone || "Not provided"}</Text>
				</View>
				<View style={styles.infoRow}>
					<Text style={styles.infoLabel}>Address:</Text>
					<Text style={styles.infoValue}>{profile?.address || "Not provided"}</Text>
				</View>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5F5F5",
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F5F5F5",
	},
	header: {
		backgroundColor: "#FF5722",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 16,
		paddingTop: 48,
	},
	headerTitle: {
		fontSize: 20,
		color: "white",
		fontWeight: "600",
	},
	profileCard: {
		alignItems: "center",
		backgroundColor: "white",
		paddingVertical: 24,
		marginHorizontal: 16,
		marginTop: -20,
		borderRadius: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 5,
	},
	profileImage: {
		width: 120,
		height: 120,
		borderRadius: 60,
		borderWidth: 4,
		borderColor: "#FF5722",
	},
	editProfileButton: {
		backgroundColor: "#FF5722",
		paddingVertical: 8,
		paddingHorizontal: 24,
		borderRadius: 24,
		marginTop: 16,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
	},
	editProfileText: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
	infoCard: {
		backgroundColor: "white",
		borderRadius: 16,
		padding: 16,
		margin: 16,
		marginTop: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 3,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: "#333",
		marginBottom: 16,
	},
	infoRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 8,
		borderBottomWidth: 1,
		borderBottomColor: "#F0F0F0",
	},
	infoLabel: {
		fontSize: 16,
		color: "#666",
		flex: 1,
	},
	infoValue: {
		fontSize: 16,
		color: "#333",
		fontWeight: "500",
		flex: 2,
		textAlign: "right",
	},
})

export default Profile

