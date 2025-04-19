import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const Profile = () => {
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
					source={require("@assets/images/profile_def_m.png")} // Dynamic path to assets folder
					style={styles.profileImage}
				/>
				<TouchableOpacity style={styles.editProfileButton}>
					<Text style={styles.editProfileText}>Edit Profile</Text>
				</TouchableOpacity>
			</View>

			{/* Donations Made */}
			<View style={styles.infoCard}>
				<Text style={styles.sectionTitle}>Medical Information</Text>
				<Text style={styles.infoText}>
					<Text style={styles.boldText}>Blood group :</Text>{" "}
					<Text style={styles.highlightText}>B+</Text>
				</Text>
				<Text style={styles.infoText}>
					<Text style={styles.boldText}>Diseases :</Text>{" "}
					<Text style={styles.highlightText}>Diabetes , Blood Sugar</Text>
				</Text>
			</View>

			{/* Profile Information */}
			<View style={styles.infoCard}>
				<Text style={styles.sectionTitle}>Profile Information</Text>
				<Text style={styles.infoText}>
					<Text style={styles.boldText}>Name:</Text> Arpit Bansal
				</Text>
				<Text style={styles.infoText}>
					<Text style={styles.boldText}>Email:</Text> arpit@gmail.com
				</Text>
				<Text style={styles.infoText}>
					<Text style={styles.boldText}>Phone:</Text> Not provided
				</Text>
				<Text style={styles.infoText}>
					<Text style={styles.boldText}>Address:</Text> Not provided
				</Text>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F3E5F5",
		padding: 15,
	},
	header: {
		backgroundColor: "#FF5722", // Deep Orange
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 15,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
	headerTitle: {
		fontSize: 20,
		color: "white",
		fontWeight: "bold",
	},
	profileCard: {
		alignItems: "center",
		backgroundColor: "#fff",
		paddingVertical: 20,
		marginBottom: 15,
		borderRadius: 10,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		elevation: 3,
	},
	profileImage: {
		width: 120,
		height: 120,
		borderRadius: 60,
		borderWidth: 3,
		borderColor: "#FF5722", // Deep Orange border
		marginBottom: 10,
	},
	editProfileButton: {
		backgroundColor: "#E64A19",
		paddingVertical: 8,
		paddingHorizontal: 20,
		borderRadius: 20,
		shadowOpacity: 0.3,
		shadowOffset: { width: 2, height: 4 },
		shadowRadius: 4,
	},
	editProfileText: {
		color: "#fff",
		fontSize: 14,
		fontWeight: "bold",
	},
	infoCard: {
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: 15,
		marginBottom: 15,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		elevation: 3,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#E64A19", // Darker Deep Orange
		marginBottom: 10,
	},
	infoText: {
		fontSize: 14,
		color: "#333",
		marginBottom: 5,
	},
	boldText: {
		fontWeight: "bold",
	},
	highlightText: {
		color: "#FF7043", // Lighter Deep Orange highlight
		fontWeight: "bold",
	},
})

export default Profile

