import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import EditIcon from '../../../assets/icons/edit';
import { CoffeePostApi, Color, Font } from '../../../shared/tokens';
import { router, useNavigation } from 'expo-router';
import MinusIcon from '../../../assets/icons/minus';
import PlusIcon from '../../../assets/icons/plus';

type CartItem = {
	id: number;
	name: string;
	subTitle: string;
	image: string;
	price: number;
	size?: 'S' | 'M' | 'L';
	qty: number;
};

export default function Cart() {
	const [items, setItems] = useState<CartItem[]>([]);
	const [address, setAddress] = useState('');
	const [note, setNote] = useState('');
	const navigation = useNavigation();

	const loadData = async () => {
		const savedAddress = await AsyncStorage.getItem('savedAddress');
		const savedNote = await AsyncStorage.getItem('savedNote');
		const savedCart = await AsyncStorage.getItem('cart');
		if (savedAddress) setAddress(savedAddress);
		if (savedNote) setNote(savedNote);
		if (savedCart) setItems(JSON.parse(savedCart));
	};

	useEffect(() => {
		const unsub = navigation.addListener('focus', loadData);
		return unsub;
	}, [navigation]);

	const changeQty = async (id: number, delta: number) => {
		const updated = [...items];
		const idx = updated.findIndex((it) => it.id === id);

		if (idx >= 0) {
			const newQty = updated[idx].qty + delta;
			if (newQty <= 0) {
				updated.splice(idx, 1);
			} else {
				updated[idx].qty = newQty;
			}
		}

		setItems(updated);
		await AsyncStorage.setItem('cart', JSON.stringify(updated));
	};

	const total = items.reduce((acc, i) => acc + i.price * i.qty, 0);
	const delivery = items.length === 0 ? 0 : 100;

	const goToDetails = (item: CartItem) => {
		router.push(`/home/${item.id}`);
	};

	const handleOrder = async () => {
		if (!items.length) {
			Alert.alert('Корзина пуста', 'Добавьте товары для оформления заказа');
			return;
		}
		if (!address) {
			Alert.alert('Адрес не указан', 'Укажите адрес доставки');
			return;
		}

		const orderData = {
			address,
			note,
			orderItem: items.map((item) => ({
				id: item.id,
				size: item.size || null,
				qty: item.qty,
			})),
		};

		try {
			const res = await fetch(CoffeePostApi, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(orderData),
			});

			if (!res.ok) throw new Error(`Ошибка сервера: ${res.status}`);

			await AsyncStorage.removeItem('cart');
			setItems([]);

			await Notifications.scheduleNotificationAsync({
				content: {
					title: 'Кофе готово! ☕',
					body: 'Заберите свой заказ у бариста.',
				},
				trigger: {
					seconds: 10,
					repeats: false,
					type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
				},
			});

			router.replace('/order/success');
		} catch (err) {
			console.error(err);
			Alert.alert('Ошибка', 'Не удалось отправить заказ, попробуйте позже.');
		}
	};

	const renderItem = ({ item }: { item: CartItem }) => (
		<TouchableOpacity onPress={() => goToDetails(item)} style={styles.itemCard}>
			<Image source={{ uri: item.image }} style={styles.itemImage} />
			<View style={styles.itemWrapper}>
				<Text style={styles.itemName}>{item.name}</Text>
				<Text style={styles.itemSub}>
					{item.subTitle}
					{item.size ? ` / ${item.size}` : ''}
				</Text>
				<Text style={styles.itemPrice}>{item.price} ₽</Text>
			</View>
			<View style={styles.qtyBlock}>
				<TouchableOpacity onPress={() => changeQty(item.id, -1)}>
					<View style={styles.qtyBtn}>
						<MinusIcon />
					</View>
				</TouchableOpacity>
				<Text style={styles.qtyText}>{item.qty}</Text>
				<TouchableOpacity onPress={() => changeQty(item.id, 1)}>
					<View style={styles.qtyBtn}>
						<PlusIcon />
					</View>
				</TouchableOpacity>
			</View>
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			<View style={styles.addressCard}>
				<Text style={styles.addressTitle}>Адрес доставки</Text>
				<View style={styles.addressWrapper}>
					<Text style={styles.address}>{address || 'Адрес не указан'}</Text>
					<Text style={styles.note}>{note || 'Комментарий не указан'}</Text>
					<TouchableOpacity style={styles.addressButton} onPress={() => router.push('/address')}>
						<EditIcon color={'#2F2D2C'} />
						<Text style={styles.addressButtonText}>Редактировать адрес</Text>
					</TouchableOpacity>
				</View>
			</View>

			<FlatList
				data={items}
				keyExtractor={(i) => `${i.id}-${i.size || 'default'}`}
				renderItem={renderItem}
				contentContainerStyle={styles.list}
			/>

			<View style={styles.summaryCard}>
				<View style={styles.summaryRow}>
					<Text style={styles.summaryLabel}>Цена</Text>
					<Text style={styles.summaryValue}>{total} ₽</Text>
				</View>
				<View style={styles.summaryRow}>
					<Text style={styles.summaryLabel}>Доставка</Text>
					<Text style={styles.summaryValue}>{delivery} ₽</Text>
				</View>
				<View style={[styles.summaryRow, styles.summaryTotalRow]}>
					<Text style={styles.summaryTotalLabel}>Итого к оплате</Text>
					<Text style={styles.summaryTotalValue}>{total + delivery} ₽</Text>
				</View>
			</View>

			<TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
				<Text style={styles.orderButtonText}>Заказать</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: Color.background, padding: 30 },
	addressCard: { marginBottom: 20, gap: 8 },
	addressTitle: { fontFamily: Font.bold, fontSize: 16, color: Color.title },
	addressWrapper: { gap: 4 },
	address: { fontFamily: Font.bold, fontSize: 14, color: Color.title },
	note: { fontFamily: Font.regular, fontSize: 12, color: Color.titlesecond },
	addressButton: {
		borderWidth: 1,
		borderColor: Color.border,
		borderRadius: 16,
		paddingHorizontal: 12,
		paddingVertical: 6,
		flexDirection: 'row',
		gap: 4,
		alignItems: 'center',
		alignSelf: 'flex-start',
		marginTop: 8,
	},
	addressButtonText: { fontSize: 12, color: Color.title },
	list: { borderTopWidth: 1, borderColor: Color.border },
	itemCard: {
		flexDirection: 'row',
		backgroundColor: Color.white,
		alignItems: 'center',
		borderBottomWidth: 1,
		borderColor: Color.border,
		paddingVertical: 12,
	},
	itemWrapper: { flex: 1 },
	itemImage: { width: 60, height: 60, borderRadius: 12, marginRight: 12 },
	itemName: { fontFamily: Font.bold, fontSize: 16, color: Color.title },
	itemSub: { fontSize: 12, color: Color.placeholder, marginVertical: 4 },
	itemPrice: { fontFamily: Font.bold, fontSize: 14, color: Color.price },
	qtyBlock: { flexDirection: 'row', alignItems: 'center', gap: 8 },
	qtyBtn: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 28,
		height: 28,
		borderRadius: 28,
		borderWidth: 1,
		borderColor: Color.border,
	},
	qtyText: { fontSize: 16, fontFamily: Font.bold },
	summaryCard: { marginTop: 10, gap: 8 },
	summaryRow: { flexDirection: 'row', justifyContent: 'space-between' },
	summaryLabel: { fontSize: 14, color: Color.title },
	summaryValue: { fontSize: 14, color: Color.title },
	summaryTotalRow: { borderTopWidth: 1, borderColor: Color.border, paddingTop: 8, marginTop: 4 },
	summaryTotalLabel: { fontFamily: Font.bold, fontSize: 16, color: Color.title },
	summaryTotalValue: { fontFamily: Font.bold, fontSize: 16, color: Color.primary },

	orderButton: {
		marginTop: 20,
		backgroundColor: Color.primary,
		borderRadius: 16,
		paddingVertical: 20,
		alignItems: 'center',
	},
	orderButtonText: { color: Color.white, fontFamily: Font.bold, fontSize: 16 },
});
