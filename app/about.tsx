import { Text } from "react-native-paper";
import { router, useNavigation } from "expo-router";
import { useEffect } from "react";

export default function AboutScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: "About",
    });
  }, [navigation]);

  return <Text>about</Text>;
}
