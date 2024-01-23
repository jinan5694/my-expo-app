import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, View, SafeAreaView } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { Text, BottomNavigation, Icon } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';

const Tab = createMaterialBottomTabNavigator();

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

function MyTabBar({ navigation, state, descriptors, insets }: BottomTabBarProps) {
  return (
    <BottomNavigation.Bar
    navigationState={state}
   safeAreaInsets={insets}
    onTabPress={({ route, preventDefault }) => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (event.defaultPrevented) {
        preventDefault();
      } else {
       navigation.dispatch({
          ...CommonActions.navigate(route.name, route.params),
          target: state.key,
        });
      }
    }}
    renderIcon={({ route, focused, color }) => {
      const { options } = descriptors[route.key];
      if (options.tabBarIcon) {
        return options.tabBarIcon({ focused, color, size: 24 });
      }

      return null;
    }}
    getLabelText={({ route }) => {
      const { options } = descriptors[route.key];
      const label =
        options.tabBarLabel !== undefined
          ? options.tabBarLabel as string
          : options.title !== undefined
          ? options.title
          : route.name

      return label;
    }}
  />
  )
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
      tabBar={MyTabBar}
      >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => <Icon source="home" size={24}></Icon>,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <Icon source="account" size={24}></Icon>
        }}
      />
    </Tabs>
  );
}
