import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TopBar } from '@/components/top-bar';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const detailsData: Record<string, {
  image: string;
  tags: string[];
  schedule: string;
  duration: string;
  description: string;
  quote: string;
  requirements: string[];
}> = {
  '1': {
    image: 'https://images.unsplash.com/photo-1516307365426-bea591f07011?auto=format&fit=crop&w=900&q=80',
    tags: ['Impacto Social', 'Mentoría'],
    schedule: '4 horas semanales',
    duration: '3 meses mínimo',
    description: 'Buscamos voluntarias comprometidas para acompañar a adultos mayores en su día a día, brindando compañía, apoyo emocional y asistencia en actividades cotidianas. Esta oportunidad te permitirá generar un vínculo significativo con personas que necesitan sentir que no están solas. Creemos firmemente que el cariño y la atención son herramientas poderosas para mejorar la calidad de vida de quienes más lo necesitan.',
    quote: 'El amor y la compañía son el mejor regalo que podemos ofrecer a quienes más lo necesitan.',
    requirements: [
      'Disponibilidad mínima de 4 horas semanales',
      'Empatía y habilidades de escucha activa',
      'Paciencia y compromiso con el bienestar del adulto mayor',
      'Mayor de 18 años',
      'Disponibilidad para asistir a capacitaciones mensuales',
    ],
  },
  '2': {
    image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=900&q=80',
    tags: ['Educación', 'Niñez'],
    schedule: '3 horas semanales',
    duration: '6 meses mínimo',
    description: 'Apoya a niños y niñas en edad escolar con sus tareas académicas, reforzando sus conocimientos y fomentando el amor por el aprendizaje. Trabajarás de la mano con docentes y familias para crear un entorno educativo inclusivo y motivador.',
    quote: 'La educación es el arma más poderosa para cambiar el mundo. Cada niño que guiamos hoy es una líder del mañana.',
    requirements: [
      'Conocimientos en matemáticas, comunicación o ciencias a nivel escolar',
      'Paciencia y vocación de enseñanza',
      'Disponibilidad de 3 horas semanales',
      'Mayor de 18 años',
      'Facilidad para conectar con niños y adolescentes',
    ],
  },
};

export default function DetalleVoluntariadoScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const { id, title, organization } = useLocalSearchParams<{
    id: string;
    title: string;
    organization: string;
  }>();

  const data = detailsData[id || '1'] || detailsData['1'];

  return (
    <ThemedView style={[styles.screen, { backgroundColor: theme.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: BottomTabInset + 32 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* TopBar */}
        <View style={[styles.topBarSection, { paddingTop: insets.top + 16 }]}>
          <TopBar showClose onClose={() => router.back()} />
        </View>

        {/* Cover Image with Tags */}
        <View style={styles.coverSection}>
          <Image source={data.image} style={styles.coverImage} contentFit="cover" />
          <View style={styles.tagRow}>
            {data.tags.map((tag) => (
              <View key={tag} style={styles.tagBadge}>
                <ThemedText style={styles.tagText}>{tag}</ThemedText>
              </View>
            ))}
          </View>
        </View>

        {/* Main Info Card */}
        <View style={[styles.mainCard, { backgroundColor: '#FFFFFF' }]}>
          <ThemedText type="title" style={styles.mainTitle}>
            {title || 'Acompañamiento a adultos mayores'}
          </ThemedText>
          <ThemedText type="small" style={styles.orgText}>
            {organization || 'Fundación Alegría de Vivir'}
          </ThemedText>
          <View style={styles.refRow}>
            <ThemedText type="small" style={styles.refLabel}>
              Ref:
            </ThemedText>
            <ThemedText type="small" style={styles.refValue}>
              VOL-{id || '1'}-2026
            </ThemedText>
          </View>
        </View>

        {/* Info Cards */}
        <View style={styles.infoCards}>
          <View style={[styles.infoCard, { backgroundColor: '#FFFFFF' }]}>
            <View style={styles.infoIcon}>
              <Ionicons name="location-outline" size={20} color="#615673" />
            </View>
            <View style={styles.infoTextGroup}>
              <ThemedText type="smallBold" style={styles.infoLabel}>
                Ubicación
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                Presencial · Cercado de Lima
              </ThemedText>
            </View>
          </View>
          <View style={[styles.infoCard, { backgroundColor: '#FFFFFF' }]}>
            <View style={styles.infoIcon}>
              <Ionicons name="time-outline" size={20} color="#615673" />
            </View>
            <View style={styles.infoTextGroup}>
              <ThemedText type="smallBold" style={styles.infoLabel}>
                Compromiso semanal
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {data.schedule}
              </ThemedText>
            </View>
          </View>
          <View style={[styles.infoCard, { backgroundColor: '#FFFFFF' }]}>
            <View style={styles.infoIcon}>
              <Ionicons name="calendar-outline" size={20} color="#615673" />
            </View>
            <View style={styles.infoTextGroup}>
              <ThemedText type="smallBold" style={styles.infoLabel}>
                Duración mínima
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {data.duration}
              </ThemedText>
            </View>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <ThemedText type="title" style={styles.sectionTitle}>
            Acerca de la oportunidad
          </ThemedText>
          <ThemedText type="small" style={styles.sectionText}>
            {data.description}
          </ThemedText>
          <View style={styles.quoteBox}>
            <Ionicons name="chatbubble-ellipses" size={18} color="#615673" />
            <ThemedText style={styles.quoteText}>
              {data.quote}
            </ThemedText>
          </View>
        </View>

        {/* Requirements Section */}
        <View style={styles.section}>
          <ThemedText type="title" style={styles.sectionTitle}>
            Requisitos
          </ThemedText>
          <View style={styles.reqList}>
            {data.requirements.map((req, idx) => (
              <View key={idx} style={styles.reqItem}>
                <Ionicons name="checkmark-circle" size={20} color="#615673" />
                <ThemedText type="small" style={styles.reqText}>
                  {req}
                </ThemedText>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    gap: Spacing.three,
  },
  topBarSection: {
    paddingHorizontal: Spacing.four,
  },
  coverSection: {
    marginHorizontal: Spacing.four,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  tagRow: {
    position: 'absolute',
    bottom: Spacing.three,
    left: Spacing.three,
    flexDirection: 'row',
    gap: Spacing.two,
  },
  tagBadge: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: 999,
    backgroundColor: 'rgba(97,86,115,0.85)',
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  mainCard: {
    marginHorizontal: Spacing.four,
    borderRadius: 20,
    padding: Spacing.four,
    gap: Spacing.two,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  mainTitle: {
    fontSize: 22,
  },
  orgText: {
    color: '#6B6B6B',
  },
  refRow: {
    flexDirection: 'row',
    gap: Spacing.one,
  },
  refLabel: {
    color: '#6B6B6B',
  },
  refValue: {
    color: '#615673',
  },
  infoCards: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.two,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    borderRadius: 16,
    padding: Spacing.three,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  infoIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#F5F0FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoTextGroup: {
    gap: 2,
  },
  infoLabel: {
    fontSize: 14,
  },
  section: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
  sectionTitle: {
    fontSize: 20,
  },
  sectionText: {
    lineHeight: 24,
  },
  quoteBox: {
    flexDirection: 'row',
    gap: Spacing.two,
    padding: Spacing.three,
    borderRadius: 14,
    backgroundColor: '#F5F0FF',
    alignItems: 'flex-start',
  },
  quoteText: {
    flex: 1,
    fontStyle: 'italic',
    lineHeight: 22,
    color: '#615673',
  },
  reqList: {
    gap: Spacing.three,
    paddingBottom: Spacing.four,
  },
  reqItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  reqText: {
    flex: 1,
    lineHeight: 20,
  },
});
