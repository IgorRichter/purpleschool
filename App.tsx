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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 0,
    paddingRight: 30,
    paddingBottom: 43,
    paddingLeft: 30,
  },
  title: {
    fontSize: 34,
    lineHeight: 1,
    letterSpacing: 1,
    textAlignVertical: 'center',
    color: '#fff',
  },
  text: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 1,
    textAlignVertical: 'center',
    color: '#A9A9A9',
  },
});
