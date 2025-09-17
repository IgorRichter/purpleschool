import { useEffect, useRef } from 'react';
import { Text, Animated, TextStyle } from 'react-native';

type AnimatedTextProps = {
	title: string;
	style?: TextStyle;
};

export function AnimatedText({ title, style }: AnimatedTextProps) {
	const animatedValue = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

	useEffect(() => {
		Animated.timing(animatedValue, {
			toValue: { x: 0, y: 100 },
			duration: 2000,
			useNativeDriver: true,
		}).start();
	}, []);

	return (
		<Animated.View
			style={{
				transform: [{ translateX: animatedValue.x }, { translateY: animatedValue.y }],
			}}
		>
			<Text style={style}>{title}</Text>
		</Animated.View>
	);
}
