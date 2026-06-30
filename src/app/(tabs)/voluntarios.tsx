import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, View, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TopBar } from '@/components/top-bar';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const opportunities = [
  {
    id: '1',
    title: 'Acompañamiento a adultos mayores',
    organization: 'Fundación Alegría de Vivir',
    location: 'Presencial · Cercado de Lima',
    timeAgo: 'Hace 2 días',
    saved: false,
  },
  {
    id: '2',
    title: 'Apoyo en tutoría escolar',
    organization: 'Asociación Educativa Semilla',
    location: 'Remoto',
    timeAgo: 'Hace 5 días',
    saved: true,
  },
  {
    id: '3',
    title: 'Voluntariado en salud comunitaria',
    organization: 'Red de Salud Solidaria',
    location: 'Presencial · San Juan de Lurigancho',
    timeAgo: 'Hace 1 semana',
    saved: false,
  },
  {
    id: '4',
    title: 'Refuerzo en habilidades digitales',
    organization: 'Tech para Todos',
    location: 'Remoto',
    timeAgo: 'Hace 3 días',
    saved: false,
  },
];

export default function VoluntariosScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

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
        {/* Top Bar */}
        <TopBar />

        {/* Title */}
        <View>
          <ThemedText type="title" style={styles.pageTitle}>
            Voluntariados
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Explora oportunidades y transforma tu comunidad.
          </ThemedText>
        </View>

        {/* Search + Filter + Location */}
        <View style={styles.searchRow}>
          <View style={[styles.searchBar, { backgroundColor: theme.backgroundElement }]}>
            <Ionicons name="search" size={20} color={theme.textSecondary} />
            <TextInput
              placeholder="Buscar por nombre o propósito..."
              placeholderTextColor={theme.textSecondary}
              style={[styles.searchInput, { color: theme.text }]}
            />
          </View>
          <Pressable style={[styles.filterBtn, { backgroundColor: '#615673' }]}>
            <Ionicons name="options-outline" size={22} color="#FFFFFF" />
          </Pressable>
        </View>

        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={16} color={theme.textSecondary} />
          <ThemedText type="small" themeColor="textSecondary">
            Lima, Perú
          </ThemedText>
        </View>

        {/* Cards */}
        <View style={styles.list}>
          {opportunities.map((opp) => (
            <View key={opp.id} style={[styles.card, { backgroundColor: '#FFFFFF' }]}>
              {/* Top: Title + Info link */}
              <View style={styles.cardTop}>
                <ThemedText type="smallBold" style={styles.cardTitle}>
                  {opp.title}
                </ThemedText>
                <Pressable>
                  <ThemedText type="small" style={{ color: '#615673' }}>
                    Información →
                  </ThemedText>
                </Pressable>
              </View>

              {/* Organization */}
              <ThemedText type="small" themeColor="textSecondary">
                {opp.organization}
              </ThemedText>

              {/* Meta row: location + time */}
              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Ionicons name="location-outline" size={15} color={theme.textSecondary} />
                  <ThemedText type="small" themeColor="textSecondary">
                    {opp.location}
                  </ThemedText>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="time-outline" size={15} color={theme.textSecondary} />
                  <ThemedText type="small" themeColor="textSecondary">
                    {opp.timeAgo}
                  </ThemedText>
                </View>
              </View>

              {/* Bottom: Apply button + bookmark */}
              <View style={styles.cardBottom}>
                <Pressable style={styles.applyBtn}>
                  <ThemedText type="smallBold" style={{ color: '#FFFFFF' }}>
                    Postularme
                  </ThemedText>
                </Pressable>
                <Pressable style={[styles.bookmarkBtn, { borderColor: theme.textSecondary }]}>
                  <Ionicons
                    name={opp.saved ? 'bookmark' : 'bookmark-outline'}
                    size={20}
                    color={opp.saved ? '#615673' : theme.textSecondary}
                  />
                </Pressable>
              </View>
            </View>
          ))}
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
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
  pageTitle: {
    fontSize: 28,
  },
  searchRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: Spacing.three,
    height: 48,
    gap: Spacing.two,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
  },
  filterBtn: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  list: {
    gap: Spacing.three,
  },
  card: {
    borderRadius: 20,
    padding: Spacing.three,
    gap: Spacing.two,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    lineHeight: 22,
    flex: 1,
    marginRight: Spacing.two,
  },
  metaRow: {
    flexDirection: 'row',
    gap: Spacing.four,
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  cardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    marginTop: Spacing.one,
  },
  applyBtn: {
    flex: 1,
    backgroundColor: '#615673',
    paddingVertical: Spacing.two + 4,
    borderRadius: 999,
    alignItems: 'center',
  },
  bookmarkBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
