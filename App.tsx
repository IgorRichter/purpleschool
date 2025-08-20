import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View>
      <Text>Одно из самых вкусных кофе в городе!</Text>
      <Text>Свежие зёрна, настоящая арабика и бережная обжарка</Text>
      <Button title='Начать' />
      <StatusBar style="auto" />
    </View>
  );
}
