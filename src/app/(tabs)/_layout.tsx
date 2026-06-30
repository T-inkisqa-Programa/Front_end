import { Stack, usePathname } from 'expo-router';

import { BottomTabBar } from '@/components/bottom-tab-bar';

const tabRoutes = ['/inicio', '/testimonios', '/contactos', '/foros', '/voluntarios', '/comunidad', '/postular', '/postulacion-exitosa', '/detalle-voluntariado'];

export default function TabsLayout() {
  const pathname = usePathname();
  const showTabs = tabRoutes.includes(pathname);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="inicio" />
        <Stack.Screen name="testimonios" />
        <Stack.Screen name="contactos" />
        <Stack.Screen name="foros" />
        <Stack.Screen name="voluntarios" />
        <Stack.Screen name="comunidad" />
        <Stack.Screen name="nueva-comunidad" />
        <Stack.Screen name="postular" />
        <Stack.Screen name="postulacion-exitosa" />
        <Stack.Screen name="detalle-voluntariado" />
      </Stack>
      {showTabs && <BottomTabBar />}
    </>
  );
}
