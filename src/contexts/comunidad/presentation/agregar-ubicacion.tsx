import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { Alert, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/shared/ui/themed-text';
import { ThemedView } from '@/shared/ui/themed-view';
import { BottomTabInset, Spacing } from '@/shared/theme/theme';
import { useTheme } from '@/shared/hooks/use-theme';
import { publicacionDraft } from '@/contexts/comunidad/application/publicacion-draft';

const places = [
  { id: '1', name: 'Parque Central', address: 'Av. Principal 100', distance: '300 m', icon: 'leaf' as const },
  { id: '2', name: 'Café Volcán', address: 'Jr. Las Flores 245', distance: '1.2 km', icon: 'cafe' as const },
  { id: '3', name: 'Biblioteca Municipal', address: 'Calle Los Andes 58', distance: '2.5 km', icon: 'library' as const },
  { id: '4', name: 'Estudio de Arte Lila', address: 'Av. La Cultura 780', distance: '3.1 km', icon: 'brush' as const },
];

export default function AgregarUbicacionScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string | null>(publicacionDraft.location);
  const [locating, setLocating] = useState(false);
  const [usingGps, setUsingGps] = useState(false);

  const normalized = query.trim().toLowerCase();
  const filtered = places.filter(
    (p) =>
      p.name.toLowerCase().includes(normalized) || p.address.toLowerCase().includes(normalized)
  );

  const useCurrentLocation = async () => {
    setLocating(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso requerido', 'Necesitamos acceso a tu ubicación para etiquetar lugares.');
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      const [address] = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
      setSelected(
        address && (address.street || address.city)
          ? [address.street, address.city].filter(Boolean).join(', ')
          : `${loc.coords.latitude.toFixed(4)}, ${loc.coords.longitude.toFixed(4)}`
      );
      setUsingGps(true);
    } catch {
      Alert.alert('Error', 'No pudimos obtener tu ubicación. Inténtalo de nuevo.');
    } finally {
      setLocating(false);
    }
  };

  const done = () => {
    publicacionDraft.location = selected ?? '';
    router.back();
  };

  return (
    <ThemedView style={[styles.screen, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Pressable style={styles.headerSideBtn} onPress={() => router.back()}>
          <Ionicons name="close" size={26} color={theme.text} />
        </Pressable>
        <ThemedText type="smallBold" style={styles.headerTitle}>
          Agregar Ubicación
        </ThemedText>
        <Pressable style={styles.headerSideBtn} onPress={done}>
          <ThemedText type="smallBold" style={styles.doneText}>
            Listo
          </ThemedText>
        </Pressable>
      </View>

      {/* Search */}
      <View style={[styles.searchBar, { backgroundColor: theme.backgroundElement }]}>
        <Ionicons name="search" size={20} color={theme.textSecondary} />
        <TextInput
          placeholder="Buscar lugares..."
          placeholderTextColor={theme.textSecondary}
          value={query}
          onChangeText={setQuery}
          style={[styles.searchInput, { color: theme.text }]}
        />
        {query.length > 0 && (
          <Pressable onPress={() => setQuery('')}>
            <Ionicons name="close-circle" size={18} color={theme.textSecondary} />
          </Pressable>
        )}
      </View>

      {/* Current location */}
      <Pressable style={styles.currentCard} onPress={useCurrentLocation} disabled={locating}>
        <View style={styles.currentIconWrap}>
          {locating ? (
            <Ionicons name="sync" size={22} color="#615673" />
          ) : (
            <Ionicons name="navigate" size={22} color="#615673" />
          )}
        </View>
        <View style={styles.currentInfo}>
          <ThemedText type="smallBold" style={styles.currentTitle}>
            {locating ? 'Obteniendo ubicación...' : 'Usar mi ubicación actual'}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Se compartirá tu ubicación aproximada
          </ThemedText>
        </View>
        <Ionicons
          name={locating ? 'ellipsis-horizontal' : usingGps ? 'checkmark-circle' : 'chevron-forward'}
          size={22}
          color={locating || usingGps ? '#615673' : '#C7C9CE'}
        />
      </Pressable>

      {/* Nearby places */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.list, { paddingBottom: BottomTabInset + 32 }]}
        keyboardShouldPersistTaps="handled"
      >
        <ThemedText type="smallBold" style={styles.sectionTitle}>
          Lugares cercanos
        </ThemedText>
        {filtered.map((p) => {
          const active = selected === p.name;
          return (
            <Pressable
              key={p.id}
              style={[styles.placeCard, active && styles.placeCardActive]}
              onPress={() => {
                setSelected(p.name);
                setUsingGps(false);
              }}
            >
              <View style={styles.placeIconWrap}>
                <Ionicons name={p.icon} size={20} color="#615673" />
              </View>
              <View style={styles.placeInfo}>
                <ThemedText type="smallBold" style={styles.placeName}>
                  {p.name}
                </ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {p.address}
                </ThemedText>
              </View>
              <View style={styles.placeRight}>
                <ThemedText type="small" style={styles.distanceText}>
                  {p.distance}
                </ThemedText>
                <Ionicons
                  name={active ? 'checkmark-circle' : 'ellipse-outline'}
                  size={20}
                  color={active ? '#615673' : '#D1D5DB'}
                />
              </View>
            </Pressable>
          );
        })}
        {filtered.length === 0 && (
          <ThemedText type="small" themeColor="textSecondary" style={styles.emptyText}>
            No encontramos lugares para esa búsqueda.
          </ThemedText>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.three,
  },
  headerSideBtn: {
    minWidth: 60,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
  },
  doneText: {
    color: '#615673',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    marginHorizontal: Spacing.four,
    paddingHorizontal: Spacing.three,
    height: 46,
    gap: Spacing.two,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
  },
  currentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Spacing.three,
    marginHorizontal: Spacing.four,
    marginTop: Spacing.three,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  currentCardActive: {
    borderColor: '#615673',
  },
  currentIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EDE9FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentInfo: {
    flex: 1,
    gap: 2,
  },
  currentTitle: {
    fontSize: 15,
  },
  list: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
  },
  sectionTitle: {
    fontSize: 15,
    marginBottom: Spacing.two,
  },
  placeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Spacing.three,
    marginBottom: Spacing.two,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  placeCardActive: {
    borderColor: '#615673',
  },
  placeIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#EDE9FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeInfo: {
    flex: 1,
    gap: 2,
  },
  placeName: {
    fontSize: 15,
  },
  placeRight: {
    alignItems: 'flex-end',
    gap: Spacing.one,
  },
  distanceText: {
    fontSize: 12,
    color: '#615673',
  },
  emptyText: {
    textAlign: 'center',
    paddingVertical: Spacing.five,
  },
});
