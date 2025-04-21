import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	ScrollView,
	ActivityIndicator,
} from "react-native"
import React, { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import { Session } from "@supabase/supabase-js"
import { Link } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

interface DashboardData {
	appointments_count: number
	recent_activities: string[]
	upcoming_appointments: any[]
	notifications: number
}

const Index = () => {
	const [session, setSession] = useState<Session | null>(null)
	const [userRole, setUserRole] = useState<string | null>(null)
	const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchUserData()
	}, [])

	const fetchUserData = async () => {
		try {
			const {
				data: { session },
			} = await supabase.auth.getSession()
			setSession(session)

			if (session?.user) {
				// Fetch user role
				const { data: profileData, error: profileError } = await supabase
					.from("user_profiles")
					.select("role, name, profile_image_url")
					.eq("user_id", session.user.id)
					.single()

				if (profileError) throw profileError
				setUserRole(profileData?.role || "Not set")

				// Fetch dashboard data
				const { data: dashboardData, error: dashboardError } = await supabase
					.from("dashboard_stats")
					.select("*")
					.eq("user_id", session.user.id)
					.single()

				if (dashboardError && dashboardError.code !== "PGRST116") {
					throw dashboardError
				}

				setDashboardData(
					dashboardData || {
						appointments_count: 0,
						recent_activities: ["No recent activities"],
						upcoming_appointments: [{ title: "No appointments", date: "Not set" }],
						notifications: 0,
					}
				)
				// Set placeholders for profile data if not available
				setUserRole(profileData?.role || "Not set")
				profileData.name = profileData?.name || "Name not set"
				profileData.profile_image_url = profileData?.profile_image_url || "Image not set"
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
		} catch (error) {
			console.error("Error signing out:", error)
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
			<View style={styles.header}>
				<View style={styles.headerTop}>
					<View style={styles.userInfo}>
						<Image
							source={
								session?.user?.user_metadata?.picture
									? { uri: session.user.user_metadata.picture }
									: require("../../assets/images/profile_def_m.png")
							}
							style={styles.profileImage}
						/>
						<View style={styles.userTextInfo}>
							<Text style={styles.welcomeText}>Welcome back,</Text>
							<Text style={styles.userName}>{session?.user?.user_metadata?.name || "User"}</Text>
						</View>
					</View>
					<TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
						<Ionicons name='log-out-outline' size={24} color='#FF5722' />
					</TouchableOpacity>
				</View>

				<View style={styles.roleContainer}>
					<Text style={styles.roleText}>
						{userRole
							? userRole.charAt(0).toUpperCase() + userRole.slice(1).toLowerCase()
							: "Role not set"}
					</Text>
				</View>
			</View>

			<View style={styles.statsContainer}>
				<View style={styles.statCard}>
					<Ionicons name='calendar' size={24} color='#FF5722' />
					<Text style={styles.statNumber}>{dashboardData?.appointments_count || 0}</Text>
					<Text style={styles.statLabel}>Appointments</Text>
				</View>

				<View style={styles.statCard}>
					<Ionicons name='notifications' size={24} color='#FF5722' />
					<Text style={styles.statNumber}>{dashboardData?.notifications || 0}</Text>
					<Text style={styles.statLabel}>Notifications</Text>
				</View>
			</View>

			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Recent Activities</Text>
				{dashboardData?.recent_activities?.map((activity, index) => (
					<View key={index} style={styles.activityItem}>
						<Ionicons name='time-outline' size={20} color='#666' />
						<Text style={styles.activityText}>{activity}</Text>
					</View>
				)) || <Text style={styles.emptyText}>No recent activities</Text>}
			</View>

			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Upcoming Appointments</Text>
				{dashboardData?.upcoming_appointments?.map((appointment, index) => (
					<View key={index} style={styles.appointmentCard}>
						<Text style={styles.appointmentTitle}>{appointment.title}</Text>
						<Text style={styles.appointmentDate}>{appointment.date}</Text>
					</View>
				)) || <Text style={styles.emptyText}>No upcoming appointments</Text>}
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
		backgroundColor: "white",
		padding: 20,
		paddingTop: 60,
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 5,
	},
	headerTop: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	userInfo: {
		flexDirection: "row",
		alignItems: "center",
	},
	userTextInfo: {
		marginLeft: 15,
	},
	welcomeText: {
		fontSize: 14,
		color: "#666",
	},
	userName: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#333",
	},
	profileImage: {
		width: 50,
		height: 50,
		borderRadius: 25,
		borderWidth: 2,
		borderColor: "#FF5722",
	},
	logoutButton: {
		padding: 8,
	},
	roleContainer: {
		marginTop: 15,
		backgroundColor: "#FFF3E0",
		paddingVertical: 8,
		paddingHorizontal: 15,
		borderRadius: 20,
		alignSelf: "flex-start",
	},
	roleText: {
		color: "#FF5722",
		fontWeight: "600",
	},
	statsContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 20,
		paddingHorizontal: 10,
	},
	statCard: {
		backgroundColor: "white",
		padding: 20,
		borderRadius: 15,
		alignItems: "center",
		width: "45%",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	statNumber: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#333",
		marginVertical: 8,
	},
	statLabel: {
		fontSize: 14,
		color: "#666",
	},
	section: {
		backgroundColor: "white",
		margin: 15,
		padding: 20,
		borderRadius: 15,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 15,
	},
	activityItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#F0F0F0",
	},
	activityText: {
		marginLeft: 10,
		color: "#666",
		flex: 1,
	},
	appointmentCard: {
		backgroundColor: "#F8F8F8",
		padding: 15,
		borderRadius: 10,
		marginBottom: 10,
	},
	appointmentTitle: {
		fontSize: 16,
		fontWeight: "600",
		color: "#333",
	},
	appointmentDate: {
		fontSize: 14,
		color: "#666",
		marginTop: 5,
	},
	emptyText: {
		color: "#666",
		fontStyle: "italic",
		textAlign: "center",
	},
})

export default Index

