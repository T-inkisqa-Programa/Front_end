import { DefaultTheme, Slot, ThemeProvider } from 'expo-router';

import { ForosProvider } from '@/contexts/foros/application/foros-store';
import { ComunidadProvider } from '@/contexts/comunidad/application/comunidad-store';
import { ArticulosProvider } from '@/contexts/contenido/application/articulos-store';
import { TestimoniosProvider } from '@/contexts/testimonios/application/testimonios-store';
import { AnimatedSplashOverlay } from '@/shared/ui/animated-icon';

export default function TabLayout() {
  return (
    <ArticulosProvider>
      <TestimoniosProvider>
        <ComunidadProvider>
          <ForosProvider>
            <ThemeProvider value={DefaultTheme}>
              <AnimatedSplashOverlay />
              <Slot />
            </ThemeProvider>
          </ForosProvider>
        </ComunidadProvider>
      </TestimoniosProvider>
    </ArticulosProvider>
  );
}
