import { Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import { Color, Font } from '../../../shared/tokens';
import { router } from 'expo-router';

export default function Success() {
	return (
		<View style={styles.container}>
			<View style={styles.imageWrapper}>
				<Image source={require('../../../assets/success.png')} style={styles.image} resizeMode="contain" />
			</View>
			<TouchableOpacity style={styles.button} onPress={() => router.push('/(app)/home')}>
				<Text style={styles.buttonText}>На главную</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 30,
		backgroundColor: Color.white,
	},
	imageWrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: 214,
		height: 214,
	},
	button: {
		backgroundColor: Color.primary,
		borderRadius: 16,
		paddingVertical: 20,
		alignItems: 'center',
		width: '100%',
	},
	buttonText: {
		color: Color.white,
		fontFamily: Font.bold,
		fontSize: 16,
	},
});
