import { useCallback, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';

import { ThemedText } from '@/shared/ui/themed-text';
import { ThemedView } from '@/shared/ui/themed-view';
import { BottomTabInset, Spacing } from '@/shared/theme/theme';
import { useTheme } from '@/shared/hooks/use-theme';
import { publicacionDraft } from '@/contexts/comunidad/application/publicacion-draft';
import { useComunidadStore } from '@/contexts/comunidad/application/comunidad-store';

const optionRows = [
  { id: 'media', label: 'Foto/Video', icon: 'image-outline' as const, route: '/seleccionar-foto' as const },
  { id: 'people', label: 'Etiquetar personas', icon: 'person-add-outline' as const, route: '/etiquetar-personas' as const },
  { id: 'activity', label: 'Sentimiento/Actividad', icon: 'happy-outline' as const, route: '/sentimientos' as const },
  { id: 'location', label: 'Ubicación', icon: 'location-outline' as const, route: '/agregar-ubicacion' as const },
];

export default function NuevaPublicacionScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { posts, addPost, updatePost } = useComunidadStore();
  const editing = !!id;
  const existing = id ? posts.find((p) => p.id === id) : undefined;

  const [privacy, setPrivacy] = useState<'Público' | 'Privado'>('Público');
  const [content, setContent] = useState(existing?.content ?? publicacionDraft.text);

  const [media, setMedia] = useState<string | null>(publicacionDraft.media);
  const [people, setPeople] = useState<string[]>(publicacionDraft.people);
  const [feeling, setFeeling] = useState(publicacionDraft.feeling);
  const [activity, setActivity] = useState(publicacionDraft.activity);
  const [location, setLocation] = useState(publicacionDraft.location);

  useFocusEffect(
    useCallback(() => {
      setMedia(publicacionDraft.media);
      setPeople(publicacionDraft.people);
      setFeeling(publicacionDraft.feeling);
      setActivity(publicacionDraft.activity);
      setLocation(publicacionDraft.location);
    }, [])
  );

  const saveDraft = () => {
    publicacionDraft.text = content;
    publicacionDraft.media = media;
    publicacionDraft.people = people;
    publicacionDraft.feeling = feeling;
    publicacionDraft.activity = activity;
    publicacionDraft.location = location;
  };

  const publish = () => {
    const tag = feeling || activity ? 'Idea Compartida' : '';
    if (editing && existing) {
      updatePost(existing.id, { content: content.trim(), tag: tag || existing.tag });
    } else {
      addPost({ content: content.trim(), tag });
      publicacionDraft.media = null;
      publicacionDraft.people = [];
      publicacionDraft.feeling = '';
      publicacionDraft.activity = '';
      publicacionDraft.location = '';
      publicacionDraft.text = '';
    }
    router.back();
  };

  const getRowValue = (id: string) => {
    if (id === 'media' && media) return '1 foto adjunta';
    if (id === 'people' && people.length > 0) return people.join(', ');
    if (id === 'activity') {
      if (feeling && activity) return `${feeling} · ${activity}`;
      if (feeling) return feeling;
      if (activity) return activity;
      return '';
    }
    if (id === 'location' && location) return location;
    return '';
  };

  return (
    <ThemedView style={[styles.screen, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Pressable style={styles.headerSideBtn} onPress={() => router.back()}>
          <Ionicons name="close" size={26} color={theme.text} />
        </Pressable>
        <ThemedText type="smallBold" style={styles.headerTitle}>
          {editing ? 'Editar Publicación' : 'Nueva Publicación'}
        </ThemedText>
        <Pressable style={styles.headerSideBtn} onPress={() => { saveDraft(); router.back(); }}>
          <ThemedText type="smallBold" style={styles.saveText}>
            Guardar
          </ThemedText>
        </Pressable>
      </View>

      {/* User Info */}
      <View style={styles.userRow}>
        <Image
          source="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
          style={styles.avatar}
          contentFit="cover"
        />
        <View style={styles.userInfo}>
          <ThemedText type="smallBold" style={styles.userName}>
            Valeria M.
          </ThemedText>
          <Pressable
            style={styles.privacyChip}
            onPress={() => setPrivacy((prev) => (prev === 'Público' ? 'Privado' : 'Público'))}
          >
            <Ionicons
              name={privacy === 'Público' ? 'globe-outline' : 'lock-closed-outline'}
              size={13}
              color="#615673"
            />
            <ThemedText type="small" style={styles.privacyText}>
              {privacy}
            </ThemedText>
            <Ionicons name="chevron-down" size={13} color="#615673" />
          </Pressable>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <TextInput
          placeholder="¿Qué quieres compartir hoy?"
          placeholderTextColor={theme.textSecondary}
          value={content}
          onChangeText={(text) => {
            setContent(text);
            publicacionDraft.text = text;
          }}
          multiline
          textAlignVertical="top"
          style={[styles.textArea, { color: theme.text }]}
        />

        {/* Media Preview */}
        {media ? (
          <View style={styles.mediaPreviewWrap}>
            <Image source={media} style={styles.mediaPreview} contentFit="cover" />
            <Pressable
              style={styles.mediaRemoveBtn}
              onPress={() => {
                setMedia(null);
                publicacionDraft.media = null;
              }}
            >
              <Ionicons name="close" size={18} color="#FFFFFF" />
            </Pressable>
          </View>
        ) : null}

        {/* Options */}
        <View style={styles.optionsList}>
          {optionRows.map((row) => {
            const value = getRowValue(row.id);
            return (
              <Pressable
                key={row.id}
                style={styles.optionRow}
                onPress={() => router.push(row.route)}
              >
                <View style={styles.optionIcon}>
                  <Ionicons name={row.icon} size={20} color="#615673" />
                </View>
                <View style={styles.optionTextGroup}>
                  <ThemedText type="small" style={styles.optionLabel}>
                    {row.label}
                  </ThemedText>
                  {value ? (
                    <ThemedText type="small" style={styles.optionValue} numberOfLines={1}>
                      {value}
                    </ThemedText>
                  ) : null}
                </View>
                <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* Publish Button */}
      <View style={[styles.footer, { paddingBottom: BottomTabInset + 24 }]}>
        <Pressable style={styles.publishBtn} onPress={publish}>
          <ThemedText type="smallBold" style={{ color: '#FFFFFF' }}>
            {editing ? 'Guardar Cambios' : 'Publicar'}
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
    paddingBottom: Spacing.three,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F3',
  },
  headerSideBtn: {
    minWidth: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 16,
  },
  saveText: {
    color: '#615673',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
  },
  userInfo: {
    gap: Spacing.one,
  },
  userName: {
    fontSize: 15,
  },
  privacyChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F5F0FF',
    paddingHorizontal: Spacing.two,
    paddingVertical: 4,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  privacyText: {
    color: '#615673',
    fontSize: 12,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    gap: Spacing.three,
  },
  textArea: {
    fontSize: 16,
    fontFamily: 'system-ui',
    minHeight: 120,
    lineHeight: 24,
  },
  mediaPreviewWrap: {
    position: 'relative',
  },
  mediaPreview: {
    width: '100%',
    height: 220,
    borderRadius: 16,
  },
  mediaRemoveBtn: {
    position: 'absolute',
    top: Spacing.two,
    right: Spacing.two,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsList: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F3',
    paddingTop: Spacing.two,
    gap: Spacing.two,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.two,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F5F0FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionTextGroup: {
    flex: 1,
    gap: 2,
  },
  optionLabel: {
    fontSize: 15,
  },
  optionValue: {
    color: '#615673',
    fontSize: 13,
  },
  footer: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
  },
  publishBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#615673',
    paddingVertical: Spacing.three + 2,
    borderRadius: 999,
  },
});
