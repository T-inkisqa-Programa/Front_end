import { DefaultTheme, Slot, ThemeProvider } from 'expo-router';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { AppStoreProvider } from '@/lib/app-store';

export default function TabLayout() {
  return (
    <AppStoreProvider>
      <ThemeProvider value={DefaultTheme}>
        <AnimatedSplashOverlay />
        <Slot />
      </ThemeProvider>
    </AppStoreProvider>
  );
}
