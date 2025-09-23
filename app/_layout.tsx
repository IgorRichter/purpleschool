import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { Color } from '../shared/tokens';

export default function RootLayout() {
	const [loaded, error] = useFonts({
		Sora: require('../assets/fonts/Sora-Regular.ttf'),
		SoraSemiBold: require('../assets/fonts/Sora-SemiBold.ttf'),
	});

	useEffect(() => {
		if (loaded) SplashScreen.hideAsync();
	}, [loaded]);

	useEffect(() => {
		if (error) throw error;
	}, [error]);

	if (!loaded) return null;

	return (
		<SafeAreaProvider>
			<StatusBar style="auto" />
			<Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Color.white } }}>
				<Stack.Screen name="index" />
				<Stack.Screen name="(app)" options={{ headerShown: false }} />
			</Stack>
		</SafeAreaProvider>
	);
}
