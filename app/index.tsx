import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Button } from '../shared/Button/Button';
import { AnimatedText } from '../shared/AnimatedText/AnimatedText';
import { Color, Font } from '../shared/tokens';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { useEffect } from 'react';

export default function App() {
	useEffect(() => {
		Notifications.setNotificationHandler({
			handleNotification: async () => ({
				shouldShowAlert: true,
				shouldShowBadge: false,
				shouldPlaySound: true,
				shouldShowBanner: true,
				shouldSetBadge: false,
				shouldShowList: true,
			}),
		});

		const requestPermissions = async () => {
			const { status } = await Notifications.getPermissionsAsync();
			if (status !== 'granted') {
				await Notifications.requestPermissionsAsync();
			}
		};

		if (Platform.OS !== 'web') {
			requestPermissions();
		}
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<ImageBackground source={require('../assets/splash-image.jpg')} resizeMode="cover">
				<View style={styles.wrapper}>
					<AnimatedText style={styles.title} title="Одно из самых вкусных кофе в городе!" />
					<Text style={styles.text}>Свежие зёрна, настоящая арабика и бережная обжарка</Text>
					<Button title="Начать" onPress={() => router.push('/(app)/home')} />
				</View>
			</ImageBackground>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Color.black,
		height: '100%',
	},
	wrapper: {
		justifyContent: 'flex-end',
		paddingHorizontal: 20,
		paddingVertical: 44,
		height: '100%',
	},
	title: {
		fontSize: 34,
		fontWeight: 600,
		letterSpacing: 1,
		textAlign: 'center',
		color: Color.white,
		marginBottom: 8,
		fontFamily: Font.bold,
		transform: [{ translateY: -50 }],
	},
	text: {
		fontSize: 14,
		lineHeight: 18,
		letterSpacing: 1,
		textAlign: 'center',
		color: Color.lightgray,
		marginBottom: 24,
		fontFamily: Font.regular,
	},
});
