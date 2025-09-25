import React, { useRef } from 'react';
import { Text, StyleSheet, Pressable, PressableProps, Animated, GestureResponderEvent } from 'react-native';
import { useNavigation } from 'expo-router'; // <-- expo-router
import { Color, Font } from '../tokens';

type ButtonProps = PressableProps & {
	title: string;
	href?: string;
};

export function Button({ title, href, onPress, ...props }: ButtonProps) {
	const navigation = useNavigation();
	const animatedValue = useRef(new Animated.Value(100)).current;

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
		props.onPressIn?.(e);
	};

	const fadeOut = (e: GestureResponderEvent) => {
		Animated.timing(animatedValue, {
			toValue: 100,
			duration: 100,
			useNativeDriver: false,
		}).start();
		props.onPressOut?.(e);
	};

	const handlePress = (e: GestureResponderEvent) => {
		if (onPress) {
			onPress(e);
		} else if (href) {
			navigation.navigate(href as never);
		}
	};

	return (
		<Pressable {...props} onPressIn={fadeIn} onPressOut={fadeOut} onPress={handlePress}>
			<Animated.View style={[styles.button, { backgroundColor: color }]}>
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
		fontFamily: Font.bold,
	},
});
