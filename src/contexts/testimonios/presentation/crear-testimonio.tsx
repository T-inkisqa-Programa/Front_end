import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/shared/ui/themed-text';
import { ThemedView } from '@/shared/ui/themed-view';
import { BottomTabInset, Spacing } from '@/shared/theme/theme';
import { useTheme } from '@/shared/hooks/use-theme';
import { useTestimoniosStore } from '@/contexts/testimonios/application/testimonios-store';

const MAX_CHARS = 500;

const moods = [
  { id: 'Ansiosa', emoji: '😟', color: '#EF4444', bg: '#FEE2E2' },
  { id: 'Enojada', emoji: '😤', color: '#F97316', bg: '#FFEDD5' },
  { id: 'Feliz', emoji: '😊', color: '#F59E0B', bg: '#FEF3C7' },
  { id: 'Fuerte', emoji: '💪', color: '#8B5CF6', bg: '#EDE9FE' },
];

export default function CrearTestimonioScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { testimonios, addTestimonio, updateTestimonio } = useTestimoniosStore();
  const editing = !!id;
  const existing = id ? testimonios.find((t) => t.id === id) : undefined;

  const [title, setTitle] = useState(existing?.title ?? '');
  const [text, setText] = useState(existing?.text ?? '');
  const [fileUri, setFileUri] = useState<string | null>(null);
  const [mood, setMood] = useState(existing?.mood?.label ?? '');

  const pickFile = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.8,
      });
      if (!result.canceled) {
        setFileUri(result.assets[0].uri);
      }
    } catch {
      // Permisos denegados o galería no disponible.
    }
  };

  const publish = () => {
    const selectedMood = moods.find((m) => m.id === mood);
    const moodData = selectedMood
      ? { label: selectedMood.id, emoji: selectedMood.emoji, color: selectedMood.color }
      : undefined;
    if (editing && existing) {
      updateTestimonio(existing.id, {
        title: title.trim(),
        text: text.trim(),
        mood: moodData,
      });
    } else {
      addTestimonio({ title: title.trim(), text: text.trim(), mood: moodData });
    }
    router.back();
  };

  return (
    <ThemedView style={[styles.screen, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <View style={styles.headerLeft}>
          <Pressable
            hitSlop={8}
            style={({ pressed }) => [styles.closeBtn, pressed && styles.pressed]}
            onPress={() => router.back()}
          >
            <Ionicons name="close" size={24} color={theme.text} />
          </Pressable>
        </View>
        <ThemedText type="smallBold" style={styles.headerTitle}>
          {editing ? 'Editar Testimonio' : 'Nuevo Testimonio'}
        </ThemedText>
        <View style={styles.headerLeft} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: BottomTabInset + 32 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Anonymous label */}
        <View style={[styles.card, styles.anonRow]}>
          <View style={styles.anonIcon}>
            <Ionicons name="eye-off-outline" size={20} color="#615673" />
          </View>
          <View style={styles.anonInfo}>
            <ThemedText type="smallBold" style={styles.anonLabel}>
              Publicar como anónimo
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Tu nombre no aparecerá en la comunidad
            </ThemedText>
          </View>
          <View style={styles.anonBadge}>
            <ThemedText type="smallBold" style={styles.anonBadgeText}>
              Anónimo
            </ThemedText>
          </View>
        </View>

        {/* Title */}
        <View style={[styles.card, styles.textCard]}>
          <ThemedText type="smallBold" style={styles.cardLabel}>
            Título
          </ThemedText>
          <TextInput
            placeholder="Un título breve para tu testimonio..."
            placeholderTextColor={theme.textSecondary}
            value={title}
            onChangeText={setTitle}
            maxLength={80}
            style={[styles.titleInput, { color: theme.text }]}
          />
        </View>

        {/* Text area with counter */}
        <View style={[styles.card, styles.textCard]}>
          <ThemedText type="smallBold" style={styles.cardLabel}>
            Comparte tu experiencia
          </ThemedText>
          <TextInput
            placeholder="Cuéntanos qué viviste, qué te ayudó o qué estás aprendiendo..."
            placeholderTextColor={theme.textSecondary}
            value={text}
            onChangeText={setText}
            multiline
            textAlignVertical="top"
            maxLength={MAX_CHARS}
            style={[styles.textInput, { color: theme.text }]}
          />
          <ThemedText type="small" themeColor="textSecondary" style={styles.counter}>
            {text.length}/{MAX_CHARS}
          </ThemedText>
        </View>

        {/* Upload proofs / files */}
        <Pressable
          style={({ pressed }) => [styles.uploadBox, pressed && styles.pressed]}
          onPress={pickFile}
        >
          {fileUri ? (
            <View style={styles.uploadThumbWrap}>
              <Image source={fileUri} style={styles.uploadThumb} contentFit="cover" />
              <Pressable
                style={styles.uploadRemove}
                hitSlop={6}
                onPress={() => setFileUri(null)}
              >
                <Ionicons name="close" size={14} color="#FFFFFF" />
              </Pressable>
            </View>
          ) : (
            <View style={styles.uploadIcon}>
              <Ionicons name="cloud-upload-outline" size={22} color="#615673" />
            </View>
          )}
          <View style={styles.uploadInfo}>
            <ThemedText type="smallBold" style={styles.uploadTitle}>
              {fileUri ? 'Archivo adjunto' : 'Subir pruebas o archivos'}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary" style={styles.uploadHint}>
              {fileUri ? '1 foto · toca para cambiar' : 'Opcional · fotos, PDF o documentos'}
            </ThemedText>
          </View>
          <Ionicons name="chevron-forward" size={18} color={theme.textSecondary} />
        </Pressable>

        {/* Emotional state */}
        <View style={styles.moodSection}>
          <ThemedText type="smallBold" style={styles.cardLabel}>
            ¿Cómo te sientes hoy?
          </ThemedText>
          <View style={styles.moodRow}>
            {moods.map((m) => {
              const active = mood === m.id;
              return (
                <Pressable
                  key={m.id}
                  style={[
                    styles.moodChip,
                    { backgroundColor: active ? m.bg : theme.backgroundElement },
                    active && { borderColor: m.color },
                  ]}
                  onPress={() => setMood(active ? '' : m.id)}
                >
                  <ThemedText style={styles.moodEmoji}>{m.emoji}</ThemedText>
                  <ThemedText
                    type="smallBold"
                    style={[styles.moodLabel, active && { color: m.color }]}
                  >
                    {m.id}
                  </ThemedText>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Publish button */}
      <View style={[styles.footer, { paddingBottom: BottomTabInset + 16 }]}>
        <Pressable
          style={({ pressed }) => [styles.publishBtn, pressed && styles.pressed]}
          onPress={publish}
        >
          <Ionicons name="heart" size={18} color="#FFFFFF" />
          <ThemedText type="smallBold" style={styles.publishText}>
            {editing ? 'Guardar Cambios' : 'Publicar Testimonio'}
          </ThemedText>
        </Pressable>
      </View>
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
    paddingBottom: Spacing.two,
  },
  headerLeft: {
    width: 40,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    color: '#615673',
  },
  pressed: {
    opacity: 0.8,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
  card: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    padding: Spacing.three,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  anonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  anonIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F5F0FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  anonInfo: {
    flex: 1,
    gap: 2,
  },
  anonLabel: {
    fontSize: 15,
  },
  anonBadge: {
    paddingHorizontal: Spacing.two,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#F5F0FF',
  },
  anonBadgeText: {
    color: '#615673',
    fontSize: 12,
  },
  textCard: {
    gap: Spacing.two,
  },
  titleInput: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'system-ui',
    paddingVertical: Spacing.one,
  },
  cardLabel: {
    fontSize: 15,
  },
  textInput: {
    fontSize: 15,
    lineHeight: 22,
    minHeight: 160,
    fontFamily: 'system-ui',
  },
  counter: {
    alignSelf: 'flex-end',
    fontSize: 12,
  },
  uploadBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#B9A8DC',
    borderRadius: 20,
    padding: Spacing.three,
    backgroundColor: '#FCFAFF',
  },
  uploadIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#F5F0FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadThumbWrap: {
    position: 'relative',
  },
  uploadThumb: {
    width: 44,
    height: 44,
    borderRadius: 14,
  },
  uploadRemove: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadInfo: {
    flex: 1,
    gap: 2,
  },
  uploadTitle: {
    color: '#615673',
    fontSize: 15,
  },
  uploadHint: {
    fontSize: 12,
  },
  moodSection: {
    gap: Spacing.two,
  },
  moodRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  moodChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  moodEmoji: {
    fontSize: 16,
  },
  moodLabel: {
    fontSize: 13,
    color: '#60646C',
  },
  footer: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
  },
  publishBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    backgroundColor: '#615673',
    borderRadius: 999,
    paddingVertical: Spacing.three + 2,
  },
  publishText: {
    color: '#FFFFFF',
    fontSize: 15,
  },
});
