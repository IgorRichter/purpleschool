import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditIcon from '../../../assets/icons/edit';
import { Color, Font } from '../../../shared/tokens';
import { router, useNavigation } from 'expo-router';

export default function Cart() {
	const [address, setAddress] = useState('');
	const [note, setNote] = useState('');
	const navigation = useNavigation();

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', async () => {
			const savedAddress = await AsyncStorage.getItem('savedAddress');
			const savedNote = await AsyncStorage.getItem('savedNote');
			if (savedAddress) setAddress(savedAddress);
			if (savedNote) setNote(savedNote);
		});

		return unsubscribe;
	}, [navigation]);
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
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Color.background,
		padding: 30,
	},
	addressCard: {
		gap: 16,
	},
	addressTitle: {
		fontFamily: Font.bold,
		fontSize: 16,
		lineHeight: 16,
		color: Color.title,
		fontWeight: 600,
	},
	addressWrapper: {
		gap: 8,
	},
	address: {
		fontFamily: Font.bold,
		fontSize: 14,
		lineHeight: 14,
		color: Color.title,
		fontWeight: 600,
	},
	note: {
		fontFamily: Font.regular,
		fontSize: 12,
		lineHeight: 12,
		color: Color.titlesecond,
	},
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
	addressButtonText: {
		fontFamily: Font.regular,
		fontSize: 12,
		lineHeight: 12,
		color: Color.title,
	},
});
