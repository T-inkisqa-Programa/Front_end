import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { publicacionDraft } from '@/lib/publicacion-store';

type Contact = {
  name: string;
  handle: string;
  avatar: string;
  suggestion?: boolean;
};

const contacts: Contact[] = [
  { name: 'Elena.Art', handle: '@elena.art', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', suggestion: true },
  { name: 'Marta.Yoga', handle: '@marta.yoga', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80', suggestion: true },
  { name: 'Sofia.Mente', handle: '@sofia.mente', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80', suggestion: true },
  { name: 'Carlos.Lens', handle: '@carlos.lens', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' },
  { name: 'Lucia.Risos', handle: '@lucia.risos', avatar: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=100&q=80' },
  { name: 'Ana.Paz', handle: '@ana.paz', avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=100&q=80' },
  { name: 'Valeria.M', handle: '@valeria.m', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80' },
];

export default function EtiquetarPersonasScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string[]>(publicacionDraft.people);

  const normalized = query.trim().toLowerCase();
  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(normalized) || c.handle.toLowerCase().includes(normalized)
  );
  const suggestions = filtered.filter((c) => c.suggestion);
  const others = filtered.filter((c) => !c.suggestion);

  const toggle = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
    );
  };

  const done = () => {
    publicacionDraft.people = selected;
    router.back();
  };

  const renderPerson = (person: Contact) => {
    const active = selected.includes(person.name);
    return (
      <View key={person.name} style={styles.personCard}>
        <Image source={person.avatar} style={styles.personAvatar} contentFit="cover" />
        <View style={styles.personInfo}>
          <ThemedText type="smallBold" style={styles.personName}>
            {person.name}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {person.handle}
          </ThemedText>
        </View>
        <Pressable
          style={[styles.selectBtn, active && styles.selectBtnActive]}
          onPress={() => toggle(person.name)}
        >
          {active ? (
            <Ionicons name="checkmark" size={16} color="#FFFFFF" />
          ) : (
            <Ionicons name="add" size={18} color="#615673" />
          )}
        </Pressable>
      </View>
    );
  };

  return (
    <ThemedView style={[styles.screen, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Pressable style={styles.headerSideBtn} onPress={() => router.back()}>
          <Ionicons name="close" size={26} color={theme.text} />
        </Pressable>
        <ThemedText type="smallBold" style={styles.headerTitle}>
          Etiquetar Personas
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
          placeholder="Buscar usuarios..."
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

      {/* List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.list, { paddingBottom: BottomTabInset + 32 }]}
        keyboardShouldPersistTaps="handled"
      >
        {suggestions.length > 0 && (
          <>
            <ThemedText type="smallBold" style={styles.sectionTitle}>
              Sugerencias
            </ThemedText>
            {suggestions.map(renderPerson)}
          </>
        )}

        {others.length > 0 && (
          <>
            <ThemedText type="smallBold" style={styles.sectionTitle}>
              Contactos
            </ThemedText>
            {others.map(renderPerson)}
          </>
        )}

        {filtered.length === 0 && (
          <ThemedText type="small" themeColor="textSecondary" style={styles.emptyText}>
            No encontramos usuarios para esa búsqueda.
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
  list: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    gap: Spacing.two,
  },
  sectionTitle: {
    fontSize: 14,
    marginTop: Spacing.two,
    marginBottom: Spacing.one,
  },
  personCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Spacing.three,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  personAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  personInfo: {
    flex: 1,
    gap: 2,
  },
  personName: {
    fontSize: 15,
  },
  selectBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectBtnActive: {
    backgroundColor: '#615673',
    borderColor: '#615673',
  },
  emptyText: {
    textAlign: 'center',
    paddingVertical: Spacing.five,
  },
});
