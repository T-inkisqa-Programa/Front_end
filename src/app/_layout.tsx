import { DefaultTheme, Slot, ThemeProvider } from 'expo-router';

import { AnimatedSplashOverlay } from '@/components/animated-icon';

export default function TabLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <AnimatedSplashOverlay />
      <Slot />
    </ThemeProvider>
  );
}
