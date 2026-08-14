import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TopBar } from '@/components/top-bar';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { psicologas } from '@/lib/psicologas';

const specialties = [...new Set(psicologas.map((p) => p.specialty))];

const benefits = [
  { icon: 'shield-checkmark', text: 'Profesionales verificadas' },
  { icon: 'people', text: 'Atención con enfoque humanista' },
  { icon: 'calendar', text: 'Agenda tu cita en línea' },
];

export default function ContactosScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (specialty: string) => {
    setActiveFilters((prev) =>
      prev.includes(specialty) ? prev.filter((s) => s !== specialty) : [...prev, specialty]
    );
  };

  const visiblePsychologists = psicologas.filter((psy) => {
    const normalizedQuery = query.trim().toLowerCase();
    const matchesQuery =
      normalizedQuery === '' ||
      psy.name.toLowerCase().includes(normalizedQuery) ||
      psy.specialty.toLowerCase().includes(normalizedQuery) ||
      psy.approach.toLowerCase().includes(normalizedQuery);
    const matchesFilter =
      activeFilters.length === 0 || activeFilters.includes(psy.specialty);
    return matchesQuery && matchesFilter;
  });

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

        {/* Title Section */}
        <View>
          <ThemedText type="title" style={styles.pageTitle}>
            Psicólogas
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.pageDesc}>
            Encuentra apoyo profesional en un entorno seguro y empoderador diseñado para tu bienestar.
          </ThemedText>
        </View>

        {/* Search + Filter */}
        <View style={styles.searchRow}>
          <View style={[styles.searchBar, { backgroundColor: theme.backgroundElement }]}>
            <Ionicons name="search" size={20} color={theme.textSecondary} />
            <TextInput
              placeholder="Buscar por nombre o especialidad..."
              placeholderTextColor={theme.textSecondary}
              value={query}
              onChangeText={setQuery}
              style={[styles.searchInput, { color: theme.text }]}
            />
            {query.length > 0 && (
              <Pressable onPress={() => setQuery('')}>
                <Ionicons name="close-circle" size={20} color={theme.textSecondary} />
              </Pressable>
            )}
          </View>
          <Pressable
            style={[styles.filterBtn, { backgroundColor: '#615673' }]}
            onPress={() => setFilterOpen((prev) => !prev)}
          >
            <Ionicons name="options-outline" size={22} color="#FFFFFF" />
          </Pressable>
        </View>

        {/* Filter panel */}
        {filterOpen && (
          <View style={[styles.filterPanel, { backgroundColor: theme.backgroundElement }]}>
            <ThemedText type="smallBold" style={styles.filterPanelTitle}>
              Filtrar por especialidad
            </ThemedText>
            <View style={styles.filterChips}>
              {specialties.map((specialty) => {
                const active = activeFilters.includes(specialty);
                return (
                  <Pressable
                    key={specialty}
                    style={[styles.filterChip, active && styles.filterChipActive]}
                    onPress={() => toggleFilter(specialty)}
                  >
                    <ThemedText
                      type="small"
                      style={[styles.filterChipText, active && { color: '#FFFFFF' }]}
                    >
                      {specialty}
                    </ThemedText>
                  </Pressable>
                );
              })}
            </View>
            {activeFilters.length > 0 && (
              <Pressable onPress={() => setActiveFilters([])}>
                <ThemedText type="small" style={{ color: '#615673' }}>
                  Limpiar filtros
                </ThemedText>
              </Pressable>
            )}
          </View>
        )}

        {/* Psychologist Grid */}
        <View style={styles.grid}>
          {visiblePsychologists.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={40} color={theme.textSecondary} />
              <ThemedText type="small" themeColor="textSecondary" style={styles.emptyText}>
                No encontramos profesionales para tu búsqueda.
              </ThemedText>
            </View>
          ) : (
            visiblePsychologists.map((psy) => (
              <View key={psy.id} style={[styles.psyCard, { backgroundColor: theme.backgroundElement }]}>
                <Image source={psy.photo} style={styles.psyPhoto} contentFit="cover" />
                <ThemedText type="smallBold" style={styles.psyName} numberOfLines={2}>
                  {psy.name}
                </ThemedText>
                <ThemedText type="small" themeColor="textSecondary" style={styles.psySpecialty} numberOfLines={2}>
                  {psy.specialty}
                </ThemedText>
                <Pressable
                  style={({ pressed }) => [
                    styles.profileBtn,
                    { backgroundColor: '#F5F0FF' },
                    pressed && styles.profileBtnPressed,
                  ]}
                  onPress={() => router.push({ pathname: '/detalle-psicologa', params: { id: psy.id } })}
                >
                  <ThemedText type="smallBold" style={{ color: '#615673' }}>
                    Perfil
                  </ThemedText>
                </Pressable>
              </View>
            ))
          )}
        </View>

        {/* Why T'inkisqa */}
        <View style={[styles.benefitsSection, { backgroundColor: '#F3F0FF' }]}>
          <ThemedText type="smallBold" style={styles.benefitsTitle}>
            ¿Por qué T&apos;inkisqa?
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.pageDesc}>
            Nuestra red de profesionales está cuidadosamente seleccionada para garantizar que recibas el apoyo más empático y capacitado.
          </ThemedText>
          <View style={styles.benefitsList}>
            {benefits.map((b) => (
              <View key={b.text} style={styles.benefitItem}>
                <View style={styles.benefitIcon}>
                  <Ionicons name={b.icon as any} size={22} color="#615673" />
                </View>
                <ThemedText type="small" style={styles.benefitText}>
                  {b.text}
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
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
  pageTitle: {
    fontSize: 28,
  },
  pageDesc: {
    lineHeight: 20,
    marginTop: Spacing.one,
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
  filterPanel: {
    borderRadius: 20,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  filterPanelTitle: {
    fontSize: 14,
  },
  filterChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  filterChip: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: 999,
    backgroundColor: '#F0F0F3',
  },
  filterChipActive: {
    backgroundColor: '#615673',
  },
  filterChipText: {
    color: '#60646C',
  },
  emptyState: {
    width: '100%',
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.five,
  },
  emptyText: {
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
  },
  psyCard: {
    width: '47%',
    borderRadius: 20,
    padding: Spacing.three,
    alignItems: 'center',
    gap: Spacing.two,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  psyPhoto: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
  },
  psyName: {
    textAlign: 'center',
    fontSize: 14,
  },
  psySpecialty: {
    textAlign: 'center',
    fontSize: 12,
  },
  profileBtn: {
    width: '100%',
    paddingVertical: Spacing.two,
    borderRadius: 999,
    alignItems: 'center',
  },
  profileBtnPressed: {
    opacity: 0.8,
  },
  benefitsSection: {
    borderRadius: 24,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  benefitsTitle: {
    fontSize: 18,
  },
  benefitsList: {
    gap: Spacing.three,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  benefitIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#E8E3F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  benefitText: {
    flex: 1,
  },
});
