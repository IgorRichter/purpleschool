import { Stack } from 'expo-router';
import { Color, Font } from '../../../shared/tokens';
import BackButton from '../../../shared/BackButton/BackButton';

export default function OrderLayout() {
	return (
		<Stack
			initialRouteName="index"
			screenOptions={{
				headerShown: true,
				contentStyle: { backgroundColor: Color.white },
				headerTitleAlign: 'center',
				headerShadowVisible: false,
				headerTitleStyle: {
					fontWeight: 600,
					fontSize: 18,
					fontFamily: Font.bold,
				},
				headerTintColor: Color.title,
				headerStyle: {
					backgroundColor: Color.white,
				},
				headerLeft: () => <BackButton />,
			}}
		>
			<Stack.Screen name="index" options={{ headerTitle: 'Заказ' }} />
			<Stack.Screen
				name="success"
				options={{
					headerTitle: 'Заказ оформлен!',
					headerLeft: () => null,
					headerBackVisible: false,
				}}
			/>
		</Stack>
	);
}
