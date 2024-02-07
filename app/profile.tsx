import { useRouter } from "expo-router";
import { Text, Button } from "react-native-paper";

export default function ProfileScreen() {
  const router = useRouter();
  return (
    <>
      <Text>profile page</Text>
      <Button onPress={() => router.push("/about")}>to about</Button>
    </>
  );
}
