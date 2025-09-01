import { Text, StyleSheet, PressableProps, Pressable, Animated, GestureResponderEvent } from 'react-native';
import { Color } from '../tokens';

export function Button({ title, ...probs }: PressableProps & { title: string }) {
	const animatedValue = new Animated.Value(100);
	const color = animatedValue.interpolate({
		inputRange: [0, 100],
		outputRange: ['#A76237', '#C67C4E'],
	});

	const fadeIn = (e: GestureResponderEvent) => {
		Animated.timing(animatedValue, {
			toValue: 0,
			duration: 100,
			useNativeDriver: false,
		}).start();
		probs.onPressIn?.(e);
	};

	const fadeOut = (e: GestureResponderEvent) => {
		Animated.timing(animatedValue, {
			toValue: 100,
			duration: 100,
			useNativeDriver: true,
		}).start();
		probs.onPressOut?.(e);
	};

	return (
		<Pressable {...probs} onPressIn={fadeIn} onPressOut={fadeOut}>
			<Animated.View style={{ ...styles.button, backgroundColor: color }}>
				<Text style={styles.title}>{title}</Text>
			</Animated.View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: Color.primary,
		borderRadius: 16,
		height: 62,
		justifyContent: 'center',
	},
	title: {
		fontSize: 16,
		fontWeight: 600,
		textAlign: 'center',
		color: Color.white,
	},
});
