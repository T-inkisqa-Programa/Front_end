import { Stack } from 'expo-router';

import { BottomTabBar } from '@/components/bottom-tab-bar';

export default function TabsLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="inicio" />
        <Stack.Screen name="testimonios" />
        <Stack.Screen name="contactos" />
        <Stack.Screen name="foros" />
        <Stack.Screen name="voluntarios" />
      </Stack>
      <BottomTabBar />
    </>
  );
}
