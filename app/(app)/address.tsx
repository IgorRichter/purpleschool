import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PointIcon from '../../assets/icons/point';
import CommentIcon from '../../assets/icons/comment';
import LocationIcon from '../../assets/icons/location';
import { Color, Font } from '../../shared/tokens';

export default function Address() {
	const [address, setAddress] = useState('');
	const [note, setNote] = useState('');

	useEffect(() => {
		const loadData = async () => {
			const savedAddress = await AsyncStorage.getItem('savedAddress');
			const savedNote = await AsyncStorage.getItem('savedNote');
			if (savedAddress) setAddress(savedAddress);
			if (savedNote) setNote(savedNote);
		};
		loadData();
	}, []);

	const getCurrentAddress = async () => {
		const { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
			alert('Разрешение на доступ к геолокации отклонено');
			return;
		}

		const location = await Location.getCurrentPositionAsync({});
		const { latitude, longitude } = location.coords;

		const places = await Location.reverseGeocodeAsync({ latitude, longitude });

		if (places.length > 0) {
			const p = places[0];
			const formatted = `${p.city || p.region || ''}, ${p.street || ''}${p.name ? ', ' + p.name : ''}`;
			setAddress(formatted.trim());
		}
	};

	const saveData = async () => {
		await AsyncStorage.setItem('savedAddress', address);
		await AsyncStorage.setItem('savedNote', note);
	};

	return (
		<View style={styles.container}>
			<View style={styles.cardLocation}>
				<View style={styles.inputWrapper}>
					<PointIcon />
					<TextInput style={styles.input} placeholder="Введите адрес" value={address} onChangeText={setAddress} />
				</View>
				<TouchableOpacity onPress={getCurrentAddress}>
					<LocationIcon />
				</TouchableOpacity>
			</View>

			<View style={styles.cardComment}>
				<View style={styles.inputWrapper}>
					<CommentIcon />
					<TextInput
						style={styles.input}
						placeholder="Комментарий курьеру"
						multiline
						value={note}
						onChangeText={setNote}
					/>
				</View>
			</View>
			<TouchableOpacity style={styles.saveBtn} onPress={saveData}>
				<Text style={styles.saveText}>Сохранить</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Color.white,
		padding: 30,
	},
	cardLocation: {
		flexDirection: 'row',
		gap: 12,
		borderWidth: 1,
		borderColor: Color.border,
		borderRadius: 14,
		paddingLeft: 16,
		paddingRight: 9,
		paddingVertical: 10,
		marginBottom: 16,
	},
	cardComment: {
		flexDirection: 'row',
		gap: 12,
		borderWidth: 1,
		borderColor: Color.border,
		borderRadius: 14,
		paddingLeft: 16,
		paddingRight: 9,
		paddingVertical: 10,
		marginBottom: 16,
		minHeight: 140,
		alignItems: 'flex-start',
	},
	inputWrapper: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	input: {
		flex: 1,
		fontFamily: Font.regular,
		fontSize: 14,
		lineHeight: 18,
	},
	saveBtn: {
		marginTop: 'auto',
		backgroundColor: Color.primary,
		borderRadius: 20,
		alignItems: 'center',
		paddingVertical: 14,
	},
	saveText: {
		color: Color.white,
		fontWeight: '600',
		fontSize: 16,
	},
});
