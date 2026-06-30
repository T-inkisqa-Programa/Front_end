import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TopBar } from '@/components/top-bar';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const psychologists = [
  {
    id: '1',
    name: 'María Fernanda López',
    specialty: 'Terapia Cognitivo-Conductual',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '2',
    name: 'Ana Lucía Castillo',
    specialty: 'Psicología Humanista',
    photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '3',
    name: 'Valeria Mendoza Rivas',
    specialty: 'Terapia Familiar y de Pareja',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '4',
    name: 'Carolina Jiménez Vega',
    specialty: 'Psicología Infantil',
    photo: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=200&q=80',
  },
];

const benefits = [
  { icon: 'shield-checkmark', text: 'Profesionales verificadas' },
  { icon: 'people', text: 'Atención con enfoque humanista' },
  { icon: 'calendar', text: 'Agenda tu cita en línea' },
];

export default function ContactosScreen() {
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
              style={[styles.searchInput, { color: theme.text }]}
            />
          </View>
          <Pressable style={[styles.filterBtn, { backgroundColor: '#615673' }]}>
            <Ionicons name="options-outline" size={22} color="#FFFFFF" />
          </Pressable>
        </View>

        {/* Psychologist Grid */}
        <View style={styles.grid}>
          {psychologists.map((psy) => (
            <View key={psy.id} style={[styles.psyCard, { backgroundColor: theme.backgroundElement }]}>
              <Image source={psy.photo} style={styles.psyPhoto} contentFit="cover" />
              <ThemedText type="smallBold" style={styles.psyName} numberOfLines={2}>
                {psy.name}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary" style={styles.psySpecialty} numberOfLines={2}>
                {psy.specialty}
              </ThemedText>
              <Pressable style={[styles.profileBtn, { backgroundColor: '#F5F0FF' }]}>
                <ThemedText type="smallBold" style={{ color: '#615673' }}>
                  Perfil
                </ThemedText>
              </Pressable>
            </View>
          ))}
        </View>

        {/* Why T'inkisqa */}
        <View style={[styles.benefitsSection, { backgroundColor: '#F3F0FF' }]}>
          <ThemedText type="smallBold" style={styles.benefitsTitle}>
            ¿Por qué T'inkisqa?
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
