import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { getRacha } from '../infrastructure/racha.repository';
import { ThemedText } from '@/shared/ui/themed-text';
import { ThemedView } from '@/shared/ui/themed-view';
import { TopBar } from '@/shared/ui/top-bar';
import { BottomTabInset, Spacing } from '@/shared/theme/theme';
import { useTheme } from '@/shared/hooks/use-theme';

export default function RachaScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const racha = getRacha();

  return (
    <ThemedView style={[styles.screen, { backgroundColor: theme.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 16, paddingBottom: BottomTabInset + 32 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <TopBar />

        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.heroCircle}>
            <Ionicons name="flame" size={56} color="#F97316" />
          </View>
          <ThemedText type="title" style={styles.heroTitle}>
            Tu racha: {racha.current} días
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.heroSubtitle}>
            {racha.message}
          </ThemedText>
        </View>

        {/* Semana */}
        <View style={[styles.weekCard, { backgroundColor: theme.backgroundElement }]}>
          <ThemedText type="smallBold" style={styles.sectionTitle}>
            Esta semana
          </ThemedText>
          <View style={styles.weekRow}>
            {racha.days.map((day) => (
              <View key={day.id} style={styles.dayItem}>
                <View
                  style={[
                    styles.dayCircle,
                    day.active && styles.dayActive,
                    day.isToday && styles.dayToday,
                  ]}
                >
                  {day.active ? (
                    <Ionicons name="checkmark" size={18} color="#FFFFFF" />
                  ) : (
                    <Ionicons name="remove" size={18} color={theme.textSecondary} />
                  )}
                </View>
                <ThemedText
                  type="small"
                  themeColor={day.isToday ? 'text' : 'textSecondary'}
                  style={styles.dayLabel}
                >
                  {day.label}
                </ThemedText>
              </View>
            ))}
          </View>
        </View>

        {/* Estadísticas */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: theme.backgroundElement }]}>
            <Ionicons name="trophy-outline" size={22} color="#F59E0B" />
            <ThemedText type="smallBold" style={styles.statNumber}>
              {racha.best}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary" style={styles.statLabel}>
              Mejor racha
            </ThemedText>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.backgroundElement }]}>
            <Ionicons name="calendar-outline" size={22} color="#615673" />
            <ThemedText type="smallBold" style={styles.statNumber}>
              {racha.totalDays}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary" style={styles.statLabel}>
              Días compartidos
            </ThemedText>
          </View>
        </View>

        {/* Consejo */}
        <View style={styles.tipCard}>
          <Ionicons name="bulb-outline" size={20} color="#615673" />
          <ThemedText type="small" style={styles.tipText}>
            Comparte una publicación hoy para no romper tu racha y seguir inspirando a tu comunidad.
          </ThemedText>
        </View>

        {/* CTA */}
        <Pressable
          style={({ pressed }) => [styles.primaryBtn, pressed && styles.pressed]}
          onPress={() => router.push('/nueva-publicacion')}
        >
          <ThemedText type="smallBold" style={{ color: '#FFFFFF' }}>
            Compartir una publicación
          </ThemedText>
        </Pressable>
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
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
    flexGrow: 1,
  },
  pressed: {
    opacity: 0.7,
  },
  hero: {
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.four,
  },
  heroCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 26,
    textAlign: 'center',
  },
  heroSubtitle: {
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: Spacing.two,
  },
  weekCard: {
    borderRadius: 18,
    padding: Spacing.three,
    gap: Spacing.three,
  },
  sectionTitle: {
    fontSize: 14,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayItem: {
    alignItems: 'center',
    gap: Spacing.one,
  },
  dayCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
  },
  dayActive: {
    backgroundColor: '#F97316',
    borderColor: '#F97316',
  },
  dayToday: {
    borderWidth: 2,
    borderColor: '#615673',
  },
  dayLabel: {
    fontSize: 11,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.one,
    borderRadius: 18,
    paddingVertical: Spacing.four,
  },
  statNumber: {
    fontSize: 22,
  },
  statLabel: {
    fontSize: 11,
    textAlign: 'center',
  },
  tipCard: {
    flexDirection: 'row',
    gap: Spacing.two,
    alignItems: 'flex-start',
    padding: Spacing.three,
    borderRadius: 14,
    backgroundColor: '#F5F0FF',
  },
  tipText: {
    flex: 1,
    color: '#615673',
    lineHeight: 18,
  },
  primaryBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#615673',
    paddingVertical: Spacing.three + 2,
    borderRadius: 16,
    marginTop: Spacing.one,
  },
});