import { Tabs } from 'expo-router';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { Color, Font } from '../../shared/tokens';
import HomeTab from '../../assets/icons/homeTab';
import OrderTab from '../../assets/icons/orderTab';
import BackButton from '../../shared/BackButton/BackButton';

type Props = BottomTabBarProps;

function CustomTabBar({ state, descriptors, navigation }: Props) {
	const tabNames = ['home', 'order'];

	return (
		<View style={styles.tabs}>
			{tabNames.map((tabName, index) => {
				const route = state.routes.find((r) => r.name === tabName)!;
				const { options } = descriptors[route.key];

				const currentRouteName = state.routes[state.index]?.name;

				const isFocused = currentRouteName === 'home' ? tabName === 'home' : tabName === 'order';

				const onPress = () => {
					navigation.navigate(tabName);
				};

				return (
					<React.Fragment key={route.key}>
						<TouchableOpacity onPress={onPress} style={styles.tab}>
							<View style={styles.iconWrapper}>
								{options.tabBarIcon?.({
									focused: isFocused,
									color: isFocused ? Color.primary : Color.darkgray,
									size: 24,
								})}
								{isFocused && <View style={styles.activeBar} />}
							</View>
							<Text style={styles.tabTitle}>{options.title}</Text>
						</TouchableOpacity>

						{index < state.routes.length - 1 && <View style={styles.divider} />}
					</React.Fragment>
				);
			})}
		</View>
	);
}

export default function AppLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
			}}
			tabBar={(props) => <CustomTabBar {...props} />}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: 'Главная',
					tabBarIcon: ({ color }) => <HomeTab color={color} />,
				}}
			/>
			<Tabs.Screen
				name="order"
				options={{
					title: 'Заказ',
					tabBarIcon: ({ color }) => <OrderTab color={color} />,
				}}
			/>
			<Tabs.Screen
				name="address"
				options={{
					headerShown: true,
					headerTitleAlign: 'center',
					headerShadowVisible: false,
					headerTitle: 'Изменить адрес',
					headerTitleStyle: {
						fontWeight: 600,
						fontSize: 18,
						fontFamily: Font.bold,
					},
					headerTintColor: Color.title,
					headerStyle: {
						backgroundColor: Color.white,
					},
					headerLeftContainerStyle: {
						paddingLeft: 16,
						paddingTop: 0,
					},
					headerLeft: () => <BackButton />,
				}}
			/>
		</Tabs>
	);
}

const styles = StyleSheet.create({
	tabs: {
		flexDirection: 'row',
		backgroundColor: Color.white,
		height: 100,
		borderRadius: 24,
	},
	tab: {
		flex: 1,
		flexDirection: 'row',
		gap: 8,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 16,
		marginBottom: 37,
	},
	divider: {
		backgroundColor: Color.gray,
		width: 1,
		height: 46,
		marginTop: 16,
	},
	tabTitle: {
		fontFamily: Font.regular,
		fontSize: 14,
		lineHeight: 14,
		color: Color.darkgray,
		alignItems: 'center',
	},
	iconWrapper: {
		position: 'relative',
		alignItems: 'center',
	},
	activeBar: {
		position: 'absolute',
		left: '50%',
		bottom: -5,
		height: 5,
		width: 10,
		backgroundColor: Color.primary,
		borderRadius: 18,
		transform: [{ translateX: -5 }],
	},
});
