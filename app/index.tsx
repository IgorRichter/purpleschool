import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Button } from '../shared/Button/Button';
import { AnimatedText } from '../shared/AnimatedText/AnimatedText';
import { Color } from '../shared/tokens';

export default function App() {
	return (
		<View style={styles.container}>
			<ImageBackground source={require('../assets/splash-image.jpg')} resizeMode="cover">
				<View style={styles.wrapper}>
					<AnimatedText style={styles.title} title="Одно из самых вкусных кофе в городе!" />
					<Text style={styles.text}>Свежие зёрна, настоящая арабика и бережная обжарка</Text>
					<Button title="Начать" href="catalog/index" />
				</View>
			</ImageBackground>
		</View>
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
		fontWeight: '600',
		letterSpacing: 1,
		textAlign: 'center',
		color: Color.white,
		marginBottom: 8,
		fontFamily: 'SoraSemiBold',
		transform: [{ translateY: -50 }],
	},
	text: {
		fontSize: 14,
		lineHeight: 18,
		letterSpacing: 1,
		textAlign: 'center',
		color: Color.gray,
		marginBottom: 24,
		fontFamily: 'Sora',
	},
});
