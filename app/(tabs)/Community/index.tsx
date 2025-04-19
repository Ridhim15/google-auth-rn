import { FontAwesome } from "@expo/vector-icons"
import React from "react"
import {
	Dimensions,
	Platform,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	useWindowDimensions,
	View,
} from "react-native"

const Community = () => {
	const { width } = useWindowDimensions() // Dynamically get screen width

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<SafeAreaView>
				<Text style={styles.header}>Join the Parvaah Community</Text>
			</SafeAreaView>

			<TouchableOpacity style={[styles.whatsappButton, { width: width * 0.9 }]}>
				<FontAwesome name='whatsapp' size={20} color='white' />
				<Text style={styles.buttonText}> WhatsApp</Text>
			</TouchableOpacity>

			<Text style={styles.subHeader}>Follow Us</Text>

			<View style={[styles.socialButtons, { width: width * 0.9 }]}>
				<TouchableOpacity style={styles.instagramButton}>
					<FontAwesome name='instagram' size={20} color='white' />
					<Text style={styles.buttonText}> Instagram</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.twitterButton}>
					<FontAwesome name='twitter' size={20} color='white' />
					<Text style={styles.buttonText}> Twitter</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.facebookButton}>
					<FontAwesome name='facebook' size={20} color='white' />
					<Text style={styles.buttonText}> Facebook</Text>
				</TouchableOpacity>
			</View>

			<Text style={styles.subHeader}>Upcoming Events</Text>

			<View style={[styles.eventCard, { width: width * 0.9 }]}>
				<Text style={styles.eventTitle}>Health Awareness Webinar</Text>
				<Text style={styles.eventDate}>Date: November 25, 2024</Text>
				<Text style={styles.eventDescription}>
					Join us for an informative webinar on maintaining health and wellness for the elderly,
					hosted by leading healthcare professionals.
				</Text>
			</View>

			<View style={[styles.eventCard, { width: width * 0.9 }]}>
				<Text style={styles.eventTitle}>Parvaah Community Meetup</Text>
				<Text style={styles.eventDate}>Date: December 10, 2024</Text>
				<Text style={styles.eventDescription}>
					Meet other community members in person at our Parvaah Community Meetup, an event to foster
					connections and discuss elder care solutions.
				</Text>
			</View>
		</ScrollView>
	)
}
const { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		paddingVertical: height * 0.02,
		backgroundColor: "#fff",
	},
	header: {
		fontSize: Platform.OS === "ios" ? width * 0.045 : width * 0.05,
		fontWeight: "bold",
		color: "#F28C28",
		textAlign: "center",
		marginBottom: height * 0.02,
	},
	subHeader: {
		fontSize: Platform.OS === "ios" ? width * 0.035 : width * 0.04,
		fontWeight: "bold",
		color: "#F28C28",
		textAlign: "center",
		marginVertical: height * 0.015,
	},
	whatsappButton: {
		flexDirection: "row",
		backgroundColor: "#25D366",
		paddingVertical: height * 0.015,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: height * 0.02,
	},
	socialButtons: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: height * 0.025,
	},
	instagramButton: {
		flexDirection: "row",
		backgroundColor: "#E4405F",
		padding: height * 0.015,
		borderRadius: 8,
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
		marginHorizontal: width * 0.01,
	},
	twitterButton: {
		flexDirection: "row",
		backgroundColor: "#1DA1F2",
		padding: height * 0.015,
		borderRadius: 8,
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
		marginHorizontal: width * 0.01,
	},
	facebookButton: {
		flexDirection: "row",
		backgroundColor: "#1877F2",
		padding: height * 0.015,
		borderRadius: 8,
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
		marginHorizontal: width * 0.01,
	},
	buttonText: {
		color: "white",
		fontSize: Platform.OS === "ios" ? width * 0.03 : width * 0.035,
		fontWeight: "bold",
		marginLeft: width * 0.02,
	},
	eventCard: {
		backgroundColor: "#fff",
		padding: height * 0.02,
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
		elevation: 5,
		marginBottom: height * 0.02,
	},
	eventTitle: {
		fontSize: Platform.OS === "ios" ? width * 0.035 : width * 0.04,
		fontWeight: "bold",
		color: "#F28C28",
		marginBottom: height * 0.01,
	},
	eventDate: {
		fontSize: Platform.OS === "ios" ? width * 0.03 : width * 0.035,
		fontWeight: "bold",
		marginBottom: height * 0.01,
	},
	eventDescription: {
		fontSize: Platform.OS === "ios" ? width * 0.03 : width * 0.035,
		color: "#444",
	},
})

export default Community

