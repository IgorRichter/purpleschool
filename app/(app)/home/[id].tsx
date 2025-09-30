import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState, useMemo } from 'react';
import { ActivityIndicator, TouchableOpacity, View, Text, Image, Pressable, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CoffeeItemApi, Color, Font } from '../../../shared/tokens';
import StarIcon from '../../../assets/icons/star';
import MinusIcon from '../../../assets/icons/minus';
import PlusIcon from '../../../assets/icons/plus';
import Toast from 'react-native-toast-message';

interface Coffee {
	id: number;
	name: string;
	subTitle: string;
	image: string;
	rating: number;
	description: string;
	price: number;
}

interface CartItem extends Coffee {
	size: 'S' | 'M' | 'L';
	price: number;
	qty: number;
}

export default function CoffeeDetails() {
	const { id } = useLocalSearchParams();
	const numericId = Number(id);
	const [coffee, setCoffee] = useState<Coffee | null>(null);
	const [selected, setSelected] = useState<'S' | 'M' | 'L'>('M');
	const [cartQty, setCartQty] = useState<number>(0);
	const sizes: ('S' | 'M' | 'L')[] = ['S', 'M', 'L'];

	useEffect(() => {
		if (!id) return;
		fetch(`${CoffeeItemApi}/${numericId}`)
			.then((res) => res.json())
			.then((data: Coffee) => setCoffee(data))
			.catch((err) => console.error(err));
	}, [id]);

	const displayPrice = useMemo(() => {
		if (!coffee) return 0;
		const base = coffee.price;
		if (selected === 'L') return Math.round(base * 1.2);
		if (selected === 'S') return Math.round(base * 0.8);
		return base;
	}, [coffee, selected]);

	const loadCartQty = async () => {
		if (!coffee) return;
		const raw = await AsyncStorage.getItem('cart');
		const cart: CartItem[] = raw ? (JSON.parse(raw) as CartItem[]) : [];
		const item = cart.find((i) => i.id === coffee.id && i.size === selected);
		setCartQty(item ? item.qty : 0);
	};

	useEffect(() => {
		loadCartQty();
	}, [coffee, selected]);

	const updateCart = async (newQty: number) => {
		if (!coffee) return;
		const raw = await AsyncStorage.getItem('cart');
		const cart: CartItem[] = raw ? (JSON.parse(raw) as CartItem[]) : [];

		const idx = cart.findIndex((i) => i.id === coffee.id && i.size === selected);

		if (newQty <= 0) {
			if (idx >= 0) cart.splice(idx, 1);
		} else if (idx >= 0) {
			cart[idx].qty = newQty;
			cart[idx].price = displayPrice;
		} else {
			cart.push({ ...coffee, size: selected, price: displayPrice, qty: newQty });
		}

		await AsyncStorage.setItem('cart', JSON.stringify(cart));
		setCartQty(newQty);

		if (newQty > 0) {
			Toast.show({
				type: 'success',
				text1: `${coffee.name} (${selected}) добавлен в корзину`,
				position: 'top',
				visibilityTime: 2000,
			});
		}
	};

	const increment = () => updateCart(cartQty + 1);
	const decrement = () => updateCart(cartQty - 1);

	if (!coffee) {
		return (
			<View style={styles.loaderContainer}>
				<ActivityIndicator size="large" color={Color.primary} />
			</View>
		);
	}

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
					<Text style={styles.price}>{displayPrice} ₽</Text>
				</View>

				{cartQty === 0 ? (
					<Pressable style={styles.addButton} onPress={() => updateCart(1)}>
						<Text style={styles.addButtonText}>В корзину</Text>
					</Pressable>
				) : (
					<View style={styles.counter}>
						<Pressable style={styles.counterBtn} onPress={decrement}>
							<MinusIcon />
						</Pressable>
						<Text style={styles.counterQty}>{cartQty}</Text>
						<Pressable style={styles.counterBtn} onPress={increment}>
							<PlusIcon />
						</Pressable>
					</View>
				)}
			</View>
			<Toast />
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 30, backgroundColor: Color.white, justifyContent: 'space-between' },
	image: { width: '100%', height: 226, borderRadius: 16, marginBottom: 20 },
	header: { paddingBottom: 22, borderBottomWidth: 1, borderColor: Color.border, marginBottom: 24 },
	nameWrapper: { marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between' },
	name: { fontFamily: Font.bold, fontWeight: '600', fontSize: 20, color: Color.title },
	subTitle: { fontSize: 12, color: Color.placeholder },
	rating: { flexDirection: 'row', alignItems: 'center', gap: 4 },
	ratingText: { fontFamily: Font.bold, fontWeight: '600', color: Color.title, fontSize: 16 },
	content: { gap: 24 },
	contentItem: { gap: 12 },
	contentTitle: { fontFamily: Font.bold, fontWeight: '600', fontSize: 16, color: Color.title },
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
	activeSizeButton: { borderColor: Color.primary, backgroundColor: Color.primarylight },
	sizeText: { fontFamily: Font.regular, fontSize: 14, color: Color.title },
	activeSizeText: { color: Color.primary },
	footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
	footerItem: { gap: 8 },
	priceTitle: { fontFamily: Font.regular, fontSize: 14, color: Color.darkgray },
	price: { fontFamily: Font.bold, fontWeight: '600', fontSize: 18, color: Color.primary },
	addButton: {
		maxWidth: 217,
		width: '100%',
		borderRadius: 16,
		paddingVertical: 21,
		backgroundColor: Color.primary,
		justifyContent: 'center',
		alignItems: 'center',
	},
	addButtonText: { fontFamily: Font.bold, fontWeight: '600', fontSize: 16, color: Color.white },
	counter: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 16,
		backgroundColor: Color.primarylight,
		height: 66,
	},
	counterBtn: {
		paddingHorizontal: 20,
		paddingVertical: 16,
	},
	counterQty: {
		fontSize: 16,
		fontWeight: '600',
		color: Color.title,
		paddingHorizontal: 10,
	},
	loaderContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Color.background,
	},
});
