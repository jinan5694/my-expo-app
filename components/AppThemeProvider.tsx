import { PropsWithChildren } from "react";
import { useColorScheme, type StatusBarStyle } from "react-native";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
  PaperProvider,
} from "react-native-paper";
import merge from "deepmerge";

import CustomDark from "@/theme/dark";
import CustomLight from "@/theme/light";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

MD3LightTheme.colors = CustomLight.colors;
MD3DarkTheme.colors = CustomDark.colors;

const CombinedLightTheme = merge(LightTheme, MD3LightTheme);
const CombinedDarkTheme = merge(DarkTheme, MD3DarkTheme);

export function useCombTheme() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? CombinedDarkTheme : CombinedLightTheme;

  const barStyle: StatusBarStyle =
    colorScheme === "dark" ? "light-content" : "dark-content";

  return { theme, barStyle };
}

export default function AppThemeProvider({ children }: PropsWithChildren) {
  const { theme, barStyle } = useCombTheme();
  return (
    <PaperProvider theme={theme}>
      <ThemeProvider value={theme}>{children}</ThemeProvider>
    </PaperProvider>
  );
}
