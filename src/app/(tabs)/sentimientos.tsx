import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { publicacionDraft } from '@/lib/publicacion-store';

const moods = [
  { id: 'Feliz', emoji: '😊', color: '#F59E0B', bg: '#FEF3C7' },
  { id: 'Agradecida', emoji: '🥰', color: '#EC4899', bg: '#FCE7F3' },
  { id: 'Motivada', emoji: '🔥', color: '#F97316', bg: '#FFEDD5' },
  { id: 'Serena', emoji: '😌', color: '#38BDF8', bg: '#E0F2FE' },
  { id: 'Cansada', emoji: '😴', color: '#8B5CF6', bg: '#EDE9FE' },
  { id: 'Ansiosa', emoji: '😟', color: '#EF4444', bg: '#FEE2E2' },
];

const activities = [
  { id: 'Amigos', icon: 'people' as const, color: '#EC4899', caption: 'Conectando con tu círculo' },
  { id: 'Arte', icon: 'color-palette' as const, color: '#F97316', caption: 'Expresión creativa' },
  { id: 'Tips', icon: 'bulb' as const, color: '#F59E0B', caption: 'Consejos y bienestar' },
  { id: 'Frases', icon: 'chatbubble-ellipses' as const, color: '#8B5CF6', caption: 'Inspiración diaria' },
];

export default function SentimientosScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const [feeling, setFeeling] = useState(publicacionDraft.feeling);
  const [activity, setActivity] = useState(publicacionDraft.activity);

  const done = () => {
    publicacionDraft.feeling = feeling;
    publicacionDraft.activity = activity;
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
          ¿Cómo te sientes?
        </ThemedText>
        <Pressable style={styles.headerSideBtn} onPress={done}>
          <ThemedText type="smallBold" style={styles.doneText}>
            Listo
          </ThemedText>
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.content, { paddingBottom: BottomTabInset + 24 }]}
      >
        <ThemedText type="small" themeColor="textSecondary" style={styles.subtitle}>
          Elige un estado de ánimo para personalizar tu publicación.
        </ThemedText>

        {/* Moods grid */}
        <View style={styles.moodGrid}>
          {moods.map((m) => {
            const active = feeling === m.id;
            return (
              <Pressable
                key={m.id}
                style={[styles.moodCard, active && styles.moodCardActive]}
                onPress={() => setFeeling(active ? '' : m.id)}
              >
                <View style={[styles.moodIconWrap, { backgroundColor: m.bg }]}>
                  <ThemedText style={styles.moodEmoji}>{m.emoji}</ThemedText>
                </View>
                <ThemedText type="small" style={styles.moodLabel}>
                  {m.id}
                </ThemedText>
                <Ionicons
                  name={active ? 'checkmark-circle' : 'ellipse-outline'}
                  size={18}
                  color={active ? '#615673' : '#D1D5DB'}
                />
              </Pressable>
            );
          })}
        </View>

        {/* Activities */}
        <ThemedText type="smallBold" style={styles.sectionTitle}>
          ¿Qué has estado haciendo?
        </ThemedText>
        {activities.map((a) => {
          const active = activity === a.id;
          return (
            <Pressable
              key={a.id}
              style={[styles.activityCard, active && styles.activityCardActive]}
              onPress={() => setActivity(active ? '' : a.id)}
            >
              <View style={[styles.activityIconWrap, { backgroundColor: `${a.color}1A` }]}>
                <Ionicons name={a.icon} size={20} color={a.color} />
              </View>
              <View style={styles.activityTextGroup}>
                <ThemedText type="smallBold" style={styles.activityLabel}>
                  {a.id}
                </ThemedText>
                <ThemedText type="small" themeColor="textSecondary" style={styles.activityCaption}>
                  {a.caption}
                </ThemedText>
              </View>
              <Ionicons
                name={active ? 'checkmark-circle' : 'ellipse-outline'}
                size={22}
                color={active ? '#615673' : '#D1D5DB'}
              />
            </Pressable>
          );
        })}
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
  content: {
    paddingHorizontal: Spacing.four,
  },
  subtitle: {
    marginTop: Spacing.two,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    marginTop: Spacing.four,
  },
  moodCard: {
    width: '31.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: Spacing.three,
    alignItems: 'center',
    gap: Spacing.one,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  moodCardActive: {
    borderWidth: 2,
    borderColor: '#615673',
  },
  moodIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moodEmoji: {
    fontSize: 22,
  },
  moodLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 15,
    marginTop: Spacing.five,
    marginBottom: Spacing.two,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Spacing.three,
    marginBottom: Spacing.two,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  activityCardActive: {
    borderWidth: 2,
    borderColor: '#615673',
  },
  activityIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityLabel: {
    fontSize: 15,
  },
  activityTextGroup: {
    flex: 1,
    gap: 2,
  },
  activityCaption: {
    fontSize: 12,
  },
});
