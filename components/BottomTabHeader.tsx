import { Appbar } from "react-native-paper";
import type { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { getHeaderTitle } from "@react-navigation/elements";

export default function DelNavigationBar({
  options,
  route,
}: BottomTabHeaderProps) {
  const title = getHeaderTitle(options, route.name);
  return (
    <Appbar.Header>
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
}
