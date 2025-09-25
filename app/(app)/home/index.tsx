import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	FlatList,
	Image,
	Pressable,
	ScrollView,
	Dimensions,
	TouchableOpacity,
} from 'react-native';
import { Api, Color, Font } from '../../../shared/tokens';
import SearchIcon from '../../../assets/icons/search';
import StarIcon from '../../../assets/icons/star';
import { BlurView } from 'expo-blur';
import PlusIcon from '../../../assets/icons/plus';
import { router, useNavigation } from 'expo-router';
import EditIcon from '../../../assets/icons/edit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

type CoffeeItem = {
	id: number;
	name: string;
	subTitle: string;
	type: string;
	price: number;
	image: string;
	description: string;
	rating: number;
};

const TYPES = ['all', 'cappuccino', 'macchiato', 'latte', 'americano'];

const { width } = Dimensions.get('window');
const NUM_COLUMNS = 2;
const CARD_MARGIN = 16;
const CONTAINER_PADDING = 30;

const cardWidth = (width - CONTAINER_PADDING * 2 - CARD_MARGIN) / NUM_COLUMNS;

export default function Catalog() {
	const [coffees, setCoffees] = useState<CoffeeItem[]>([]);
	const [searchText, setSearchText] = useState('');
	const [activeType, setActiveType] = useState('all');
	const [address, setAddress] = useState('');
	const navigation = useNavigation();

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', async () => {
			const savedAddress = await AsyncStorage.getItem('savedAddress');
			if (savedAddress) setAddress(savedAddress);
		});

		return unsubscribe;
	}, [navigation]);

	const TYPE_LABELS: Record<string, string> = {
		all: 'Все',
		cappuccino: 'Капучино',
		macchiato: 'Маккиято',
		latte: 'Латте',
		americano: 'Американо',
	};

	useEffect(() => {
		fetch(Api)
			.then((res) => res.json())
			.then((data) => setCoffees(data))
			.catch((err) => console.error(err));
	}, []);

	const filteredCoffees = coffees.filter((coffee) => {
		const matchesType = activeType === 'all' || coffee.type === activeType;
		const matchesText =
			coffee.name.toLowerCase().includes(searchText.toLowerCase()) ||
			coffee.subTitle.toLowerCase().includes(searchText.toLowerCase());
		return matchesType && matchesText;
	});

	const renderCoffee = ({ item, index }: { item: CoffeeItem; index: number }) => {
		const isRight = (index + 1) % NUM_COLUMNS === 0;

		return (
			<View style={[styles.card, !isRight && { marginRight: CARD_MARGIN }]}>
				<View style={styles.ratingContainer}>
					<BlurView intensity={50} style={styles.ratingBlur}>
						<StarIcon />
						<Text style={styles.ratingText}>{item.rating}</Text>
					</BlurView>
				</View>
				<Image source={{ uri: item.image }} style={styles.image} />
				<View style={styles.cardContent}>
					<Text style={styles.name}>{item.name}</Text>
					<Text style={styles.subTitle}>{item.subTitle}</Text>
					<View style={styles.footer}>
						<Text style={styles.price}>{item.price} ₽</Text>
						<Pressable style={styles.addButton}>
							<PlusIcon />
						</Pressable>
					</View>
				</View>
			</View>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.containerHeader}>
				<View style={styles.addressCard}>
					<Text style={styles.addressTitle}>Адрес</Text>
					<View style={styles.addressWrapper}>
						<Text style={styles.address}>{address || 'Адрес не указан'}</Text>
						<TouchableOpacity onPress={() => router.push('/address')}>
							<EditIcon color="#DDD" />
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.searchInner}>
					<View style={styles.searchIcon}>
						<SearchIcon />
					</View>
					<TextInput
						style={styles.searchInput}
						placeholder="Найти кофе"
						placeholderTextColor={Color.placeholder}
						value={searchText}
						onChangeText={setSearchText}
					/>
				</View>
			</View>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				style={styles.filters}
				contentContainerStyle={styles.filtersContent}
			>
				{TYPES.map((type) => (
					<Pressable
						key={type}
						onPress={() => setActiveType(type)}
						style={[styles.filterButton, activeType === type && styles.filterButtonActive]}
					>
						<Text style={[styles.filterText, activeType === type && styles.filterTextActive]}>{TYPE_LABELS[type]}</Text>
					</Pressable>
				))}
			</ScrollView>

			<FlatList
				data={filteredCoffees}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderCoffee}
				numColumns={2}
				contentContainerStyle={styles.listContent}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Color.background,
	},
	containerHeader: {
		backgroundColor: Color.black,
		padding: 30,
	},
	addressCard: {
		gap: 4,
		marginBottom: 30,
	},
	addressTitle: {
		fontFamily: Font.regular,
		fontSize: 12,
		lineHeight: 12,
		color: Color.titlesecond,
	},
	addressWrapper: {
		flexDirection: 'row',
		gap: 4,
		alignItems: 'center',
	},
	address: {
		fontFamily: Font.bold,
		fontWeight: 600,
		fontSize: 14,
		lineHeight: 14,
		color: Color.address,
	},
	searchInner: {
		position: 'relative',
	},
	searchInput: {
		height: 52,
		borderRadius: 16,
		backgroundColor: Color.lightblack,
		paddingHorizontal: 17,
		paddingLeft: 50,
		paddingRight: 20,
		color: Color.white,
	},
	searchIcon: {
		position: 'absolute',
		top: 16,
		left: 16,
		zIndex: 10,
	},
	filters: {
		marginVertical: 28,
		paddingLeft: 30,
		maxHeight: 38,
	},
	filtersContent: {
		paddingRight: 30,
		alignItems: 'center',
	},
	filterButton: {
		paddingVertical: 10,
		paddingHorizontal: 16,
		borderRadius: 12,
		marginRight: 8,
	},
	filterButtonActive: {
		backgroundColor: Color.primary,
	},
	filterText: {
		fontFamily: Font.regular,
		color: Color.black,
		fontSize: 14,
		fontWeight: 400,
		lineHeight: 14,
	},
	filterTextActive: {
		fontFamily: Font.bold,
		color: Color.white,
		fontWeight: 600,
	},
	listContent: {
		paddingHorizontal: 30,
		flex: 1,
	},
	card: {
		width: cardWidth,
		marginRight: CARD_MARGIN,
		marginBottom: 16,
		padding: 4,
		backgroundColor: Color.white,
		borderRadius: 16,
		overflow: 'hidden',
		position: 'relative',
	},
	image: { width: '100%', height: 132, borderRadius: 16, marginBottom: 12 },
	cardContent: { padding: 8 },
	ratingContainer: {
		position: 'absolute',
		top: 4,
		left: 4,
		zIndex: 10,
		borderTopLeftRadius: 16,
		borderTopRightRadius: 0,
		borderBottomRightRadius: 16,
		borderBottomLeftRadius: 0,
		overflow: 'hidden',
	},
	ratingBlur: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 6,
		paddingLeft: 8,
		paddingRight: 14,
	},
	ratingText: {
		fontFamily: Font.bold,
		fontSize: 10,
		fontWeight: 600,
		color: Color.white,
		marginLeft: 3,
	},
	name: { fontSize: 16, fontFamily: Font.bold, fontWeight: 600, marginBottom: 4, color: Color.title },
	subTitle: { fontSize: 12, color: Color.placeholder, marginBottom: 12 },
	footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
	price: { fontFamily: Font.bold, fontWeight: 600, fontSize: 18, color: Color.price },
	addButton: {
		width: 32,
		height: 32,
		borderRadius: 10,
		backgroundColor: Color.primary,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
