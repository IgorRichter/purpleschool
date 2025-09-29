import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import BackIcon from '../../assets/icons/back';

export default function BackButton() {
	const router = useRouter();

	return (
		<TouchableOpacity onPress={() => router.back()}>
			<BackIcon />
		</TouchableOpacity>
	);
}
