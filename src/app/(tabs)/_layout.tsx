import { Stack, usePathname } from 'expo-router';

import { BottomTabBar } from '@/components/bottom-tab-bar';

const tabRoutes = ['/inicio', '/testimonios', '/contactos', '/foros', '/voluntarios', '/comunidad', '/perfil', '/postular', '/postulacion-exitosa', '/detalle-voluntariado', '/nueva-publicacion', '/seleccionar-foto', '/etiquetar-personas', '/sentimientos', '/agregar-ubicacion', '/autocuidado', '/equilibrio', '/autoestima', '/crear-articulo', '/detalle-articulo', '/crear-testimonio', '/detalle-testimonio', '/detalle-psicologa'];

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
        <Stack.Screen name="perfil" />
        <Stack.Screen name="nueva-comunidad" />
        <Stack.Screen name="postular" />
        <Stack.Screen name="postulacion-exitosa" />
        <Stack.Screen name="detalle-voluntariado" />
        <Stack.Screen name="nueva-publicacion" />
        <Stack.Screen name="seleccionar-foto" />
        <Stack.Screen name="etiquetar-personas" />
        <Stack.Screen name="sentimientos" />
        <Stack.Screen name="agregar-ubicacion" />
        <Stack.Screen name="autocuidado" />
        <Stack.Screen name="equilibrio" />
        <Stack.Screen name="autoestima" />
        <Stack.Screen name="crear-articulo" />
        <Stack.Screen name="detalle-articulo" />
        <Stack.Screen name="crear-testimonio" />
        <Stack.Screen name="detalle-testimonio" />
        <Stack.Screen name="detalle-psicologa" />
      </Stack>
      {showTabs && <BottomTabBar />}
    </>
  );
}
