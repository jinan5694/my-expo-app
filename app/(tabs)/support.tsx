import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { router } from "expo-router";

export default function TabSupportScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Support</Text>
      <Button onPress={() => router.push("/Detail")}>modal</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
