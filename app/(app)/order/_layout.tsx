import { Stack } from 'expo-router';
import { Color } from '../../../shared/tokens';

export default function OrderLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				contentStyle: { backgroundColor: Color.white },
			}}
		/>
	);
}
