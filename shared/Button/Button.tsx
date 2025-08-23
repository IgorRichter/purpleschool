import { Text, StyleSheet, PressableProps, Pressable, View } from "react-native";

export function Button({title, ...probs}: PressableProps & {title: string}) {
  return (
    <Pressable {...probs}>
      <View style={styles.button}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#C67C4E',
    borderRadius: 16,
    height: 62,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
    textAlign: 'center',
    color: '#ffffff',
  }
})