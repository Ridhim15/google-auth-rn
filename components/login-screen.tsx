import React, { useState } from "react"
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

interface LoginScreenProps {
	signInWithGoogle: () => Promise<void>
	loading: boolean
}

const LoginScreen: React.FC<LoginScreenProps> = ({ signInWithGoogle, loading }) => {
	const [phoneNumber, setPhoneNumber] = useState("")

	return (
		<View style={styles.container}>
			<Image source={require("@assets/icons/splash-icon.png")} style={styles.logo} />
			<Text style={styles.title}>Welcome to Parvaah!</Text>

			<Text style={styles.subtitle}>Please enter your number</Text>

			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder='IN +91'
					keyboardType='phone-pad'
					value={phoneNumber}
					onChangeText={setPhoneNumber}
				/>
			</View>

			<TouchableOpacity style={styles.signInButton}>
				<Text style={styles.signInButtonText}>Sign In / Sign Up</Text>
			</TouchableOpacity>

			<View style={styles.separatorContainer}>
				<View style={styles.separator} />
				<Text style={styles.orText}>OR</Text>
				<View style={styles.separator} />
			</View>

			<View style={styles.socialContainer}>
				<TouchableOpacity style={styles.customGoogleButton} onPress={signInWithGoogle}>
					<Image source={require("../assets/logo/google-icon.png")} style={styles.googleIcon} />
					<Text style={styles.googleButtonText}>Sign in with Google</Text>
				</TouchableOpacity>
			</View>

			<Text style={styles.footerText}>
				By continuing, you agree to our <Text style={styles.terms}>Terms and Conditions</Text>
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
		paddingHorizontal: 20,
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
	inputContainer: {
		width: "100%",
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		paddingHorizontal: 10,
		paddingVertical: 12,
		marginBottom: 15,
	},
	input: {
		fontSize: 16,
		color: "#333",
	},
	signInButton: {
		width: "100%",
		padding: 15,
		backgroundColor: "#FF6600",
		borderRadius: 8,
		alignItems: "center",
		marginBottom: 20,
	},
	signInButtonText: {
		fontSize: 16,
		fontWeight: "bold",
		color: "white",
		textAlign: "center",
	},
	separatorContainer: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		marginVertical: 10,
	},
	separator: {
		flex: 1,
		height: 1,
		backgroundColor: "#ccc",
	},
	orText: {
		marginHorizontal: 10,
		fontSize: 14,
		color: "#333",
	},
	socialContainer: {
		flexDirection: "row",
		justifyContent: "center",
		width: "100%",
		marginBottom: 20,
	},
	customGoogleButton: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		paddingVertical: 10,
		paddingHorizontal: 15,
	},
	googleIcon: {
		width: 24,
		height: 24,
		marginRight: 10,
	},
	googleButtonText: {
		fontSize: 16,
		color: "#333",
		fontWeight: "bold",
	},
	footerText: {
		fontSize: 14,
		color: "#333",
		textAlign: "center",
		marginTop: 10,
	},
	terms: {
		fontWeight: "bold",
		textDecorationLine: "underline",
	},
})

export default LoginScreen

