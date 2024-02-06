import { Appbar, Text } from "react-native-paper";
import type { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { getHeaderTitle } from "@react-navigation/elements";
import { router } from "expo-router";

export default function DelNavigationBar({
  options,
  route,
  back,
}: NativeStackHeaderProps) {
  const title = getHeaderTitle(options, route.name);
  return (
    <Appbar.Header elevated>
      {back ? <Appbar.BackAction onPress={() => router.back()} /> : null}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
}
