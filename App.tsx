import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Одно из самых вкусных кофе в городе!</Text>
      <Text style={styles.text}>Свежие зёрна, настоящая арабика и бережная обжарка</Text>
      <Button title='Начать' />
      <StatusBar style="auto" />
    </View>
  );
}
