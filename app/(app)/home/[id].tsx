import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { CoffeeItemApi, Color, Font } from '../../../shared/tokens';
import StarIcon from '../../../assets/icons/star';

interface Coffee {
	id: number;
	name: string;
	subTitle: string;
	image: string;
	rating: number;
	description: string;
	price: number;
}

export default function CoffeeDetails() {
	const { id } = useLocalSearchParams();
	const [coffee, setCoffee] = useState<Coffee | null>(null);
	const numericId = Number(id);
	const [selected, setSelected] = useState<'S' | 'M' | 'L'>('M');
	const sizes: ('S' | 'M' | 'L')[] = ['S', 'M', 'L'];

	useEffect(() => {
		if (!id) return;

		fetch(`${CoffeeItemApi}/${numericId}`)
			.then((res) => res.json())
			.then((data: Coffee) => {
				setCoffee(data);
			})
			.catch((err) => console.error(err));
	}, [id]);

	if (!coffee)
		return (
			<View style={styles.loaderContainer}>
				<ActivityIndicator size="large" color={Color.primary} />
			</View>
		);

	return (
		<View style={styles.container}>
			<View>
				<Image source={{ uri: coffee.image }} style={styles.image} />
				<View style={styles.header}>
					<View style={styles.nameWrapper}>
						<Text style={styles.name}>{coffee.name}</Text>
						<View style={styles.rating}>
							<StarIcon size={20} />
							<Text style={styles.ratingText}>{coffee.rating}</Text>
						</View>
					</View>
					<Text style={styles.subTitle}>{coffee.subTitle}</Text>
				</View>
				<View style={styles.content}>
					<View style={styles.contentItem}>
						<Text style={styles.contentTitle}>Описание</Text>
						<Text style={styles.description}>{coffee.description}</Text>
					</View>
					<View style={styles.contentItem}>
						<Text style={styles.contentTitle}>Размер</Text>
						<View style={styles.sizeButtonsWrapper}>
							{sizes.map((size) => {
								const isActive = selected === size;
								return (
									<TouchableOpacity
										key={size}
										style={[styles.sizeButton, isActive && styles.activeSizeButton]}
										onPress={() => setSelected(size)}
									>
										<Text style={[styles.sizeText, isActive && styles.activeSizeText]}>{size}</Text>
									</TouchableOpacity>
								);
							})}
						</View>
					</View>
				</View>
			</View>
			<View style={styles.footer}>
				<View style={styles.footerItem}>
					<Text style={styles.priceTitle}>Цена</Text>
					<Text style={styles.price}>{coffee.price} ₽</Text>
				</View>
				<Pressable style={styles.addButton}>
					<Text style={styles.addButtonText}>В корзину</Text>
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 30, backgroundColor: Color.white, justifyContent: 'space-between' },
	image: { width: '100%', height: 226, borderRadius: 16, marginBottom: 20 },
	header: { paddingBottom: 22, borderBottomWidth: 1, borderColor: Color.border, marginBottom: 24 },
	nameWrapper: { marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between' },
	name: { fontFamily: Font.bold, fontWeight: 600, fontSize: 20, lineHeight: 20, color: Color.title },
	subTitle: { fontSize: 12, lineHeight: 12, color: Color.placeholder },
	rating: { flexDirection: 'row', alignItems: 'center', gap: 4 },
	ratingText: { fontFamily: Font.bold, fontWeight: 600, color: Color.title, fontSize: 16, lineHeight: 16 },
	content: { gap: 24 },
	contentItem: { gap: 12 },
	contentTitle: { fontFamily: Font.bold, fontWeight: 600, fontSize: 16, lineHeight: 16, color: Color.title },
	description: { fontSize: 14, lineHeight: 18, color: Color.placeholder },
	sizeButtonsWrapper: { flexDirection: 'row', gap: 12 },
	sizeButton: {
		flex: 1,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: Color.border,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
	},
	activeSizeButton: {
		borderColor: Color.primary,
		backgroundColor: Color.primarylight,
	},
	sizeText: {
		fontFamily: Font.regular,
		fontSize: 14,
		lineHeight: 18,
		color: Color.title,
	},
	activeSizeText: {
		color: Color.primary,
	},
	footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
	footerItem: { gap: 8 },
	priceTitle: { fontFamily: Font.regular, fontSize: 14, lineHeight: 14, color: Color.darkgray },
	price: { fontFamily: Font.bold, fontWeight: 600, fontSize: 18, lineHeight: 18, color: Color.primary },
	addButton: {
		maxWidth: 217,
		width: '100%',
		borderRadius: 16,
		paddingVertical: 21,
		backgroundColor: Color.primary,
		justifyContent: 'center',
		alignItems: 'center',
	},
	addButtonText: { fontFamily: Font.bold, fontWeight: 600, fontSize: 16, lineHeight: 16, color: Color.white },
	loaderContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Color.background,
	},
});
