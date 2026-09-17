import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/shared/ui/themed-text';
import { ThemedView } from '@/shared/ui/themed-view';
import { TopBar } from '@/shared/ui/top-bar';
import { BottomTabInset, Spacing } from '@/shared/theme/theme';
import { useTheme } from '@/shared/hooks/use-theme';
import { useArticulosStore } from '@/contexts/contenido/application/articulos-store';

const categories = ['Autoestima', 'Autocuidado', 'Equilibrio'];

type FormatId = 'bold' | 'italic' | 'underline' | 'list' | 'quote' | 'link';

const formatTools: { id: FormatId; label?: string; icon?: string; bold?: boolean; italic?: boolean; underline?: boolean }[] = [
  { id: 'bold', label: 'B', bold: true },
  { id: 'italic', label: 'I', italic: true },
  { id: 'underline', label: 'U', underline: true },
  { id: 'list', icon: 'list-outline' },
  { id: 'quote', icon: 'chatbubble-ellipses-outline' },
  { id: 'link', icon: 'link-outline' },
];

export default function CrearArticuloScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { articles, addArticle, updateArticle } = useArticulosStore();
  const editing = !!id;
  const existing = id ? articles.find((a) => a.id === id) : undefined;

  const [coverImage, setCoverImage] = useState<string | null>(existing?.image ?? null);
  const [title, setTitle] = useState(existing?.title ?? '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    existing ? [existing.category] : []
  );
  const [content, setContent] = useState(() =>
    existing
      ? existing.blocks
          .filter((b) => b.type === 'paragraph' || b.type === 'quote')
          .map((b) => b.text)
          .join('\n')
      : ''
  );
  const [activeFormats, setActiveFormats] = useState<FormatId[]>([]);
  const [tags, setTags] = useState('');
  const [fileUri, setFileUri] = useState<string | null>(null);
  const [hasAudio, setHasAudio] = useState(existing ? existing.audioMinutes > 0 : false);
  const [selection, setSelection] = useState({ start: 0, end: 0 });

  const pickCover = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });
      if (!result.canceled) {
        setCoverImage(result.assets[0].uri);
      }
    } catch {
      // Permisos denegados o galería no disponible.
    }
  };

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

  const applyFormat = (id: FormatId) => {
    const { start, end } = selection;
    let prefix = '';
    let suffix = '';
    switch (id) {
      case 'bold':
        prefix = '**';
        suffix = '**';
        break;
      case 'italic':
        prefix = '*';
        suffix = '*';
        break;
      case 'underline':
        prefix = '__';
        suffix = '__';
        break;
      case 'quote':
        prefix = '\n> ';
        break;
      case 'list':
        prefix = '\n- ';
        break;
      case 'link':
        prefix = '[';
        suffix = '](https://)';
        break;
    }
    const selected = content.slice(start, end);
    const newContent = content.slice(0, start) + prefix + selected + suffix + content.slice(end);
    setContent(newContent);
    setActiveFormats((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const buildBlocks = () => {
    const paragraphs = content
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    if (paragraphs.length === 0) {
      return [{ type: 'paragraph' as const, text: 'Este artículo aún no tiene contenido.' }];
    }
    return paragraphs.map((text) => ({ type: 'paragraph' as const, text }));
  };

  const publish = () => {
    const category = selectedCategories[0] ?? existing?.category ?? 'Autocuidado';
    if (editing && existing) {
      updateArticle(existing.id, {
        title: title.trim() || existing.title,
        image: coverImage ?? existing.image,
        category,
        blocks: buildBlocks(),
        audioMinutes: hasAudio ? 5 : 0,
        readTime: `${Math.max(1, Math.ceil(content.trim().split(/\s+/).filter(Boolean).length / 180))} min`,
      });
    } else {
      addArticle({
        title: title.trim(),
        image: coverImage,
        category,
        content,
        hasAudio,
      });
    }
    router.back();
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const toggleFormat = (id: FormatId) => {
    applyFormat(id);
  };

  return (
    <ThemedView style={[styles.screen, { backgroundColor: theme.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 16, paddingBottom: BottomTabInset + 32 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Top Bar */}
        <TopBar />

        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.headerTitleGroup}>
            <Pressable
              hitSlop={8}
              style={({ pressed }) => [styles.backBtn, pressed && styles.backPressed]}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color={theme.text} />
            </Pressable>
            <ThemedText type="title" style={styles.pageTitle}>
              {editing ? 'Editar Publicación' : 'Nueva Publicación'}
            </ThemedText>
          </View>
          <Pressable style={styles.publishBtn} onPress={publish}>
            <ThemedText type="smallBold" style={styles.publishText}>
              {editing ? 'Guardar' : 'Publicar'}
            </ThemedText>
          </Pressable>
        </View>

        {/* Cover Image */}
        {coverImage ? (
          <View style={styles.coverPreviewWrap}>
            <Image source={coverImage} style={styles.coverPreview} contentFit="cover" />
            <Pressable
              style={styles.coverRemoveBtn}
              onPress={() => setCoverImage(null)}
            >
              <Ionicons name="close" size={18} color="#FFFFFF" />
            </Pressable>
          </View>
        ) : (
          <Pressable
            style={({ pressed }) => [styles.uploadBox, pressed && styles.uploadPressed]}
            onPress={pickCover}
          >
            <View style={styles.uploadIcon}>
              <Ionicons name="image-outline" size={28} color="#615673" />
            </View>
            <ThemedText type="smallBold" style={styles.uploadTitle}>
              Subir imagen destacada
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary" style={styles.uploadHint}>
              Toca para elegir una foto desde tu galería
            </ThemedText>
          </Pressable>
        )}

        {/* Title */}
        <TextInput
          placeholder="Título del artículo"
          placeholderTextColor={theme.textSecondary}
          value={title}
          onChangeText={setTitle}
          style={[styles.titleInput, { color: theme.text, backgroundColor: theme.backgroundElement }]}
        />

        {/* Categories */}
        <View style={styles.categoriesRow}>
          {categories.map((category) => {
            const selected = selectedCategories.includes(category);
            return (
              <Pressable
                key={category}
                style={[styles.categoryChip, selected && styles.categoryChipActive]}
                onPress={() => toggleCategory(category)}
              >
                <ThemedText
                  type="smallBold"
                  style={[styles.categoryText, selected && styles.categoryTextActive]}
                >
                  {category}
                </ThemedText>
              </Pressable>
            );
          })}
        </View>

        {/* Editor */}
        <View style={styles.editorCard}>
          <ThemedText type="smallBold" style={styles.editorLabel}>
            Contenido
          </ThemedText>
          <View style={styles.toolbar}>
            {formatTools.map((tool) => {
              const active = activeFormats.includes(tool.id);
              return (
                <Pressable
                  key={tool.id}
                  style={[styles.toolBtn, active && styles.toolBtnActive]}
                  onPress={() => toggleFormat(tool.id)}
                >
                  {tool.icon ? (
                    <Ionicons
                      name={tool.icon as any}
                      size={20}
                      color={active ? '#FFFFFF' : theme.text}
                    />
                  ) : (
                    <ThemedText
                      type="smallBold"
                      style={[
                        styles.toolLetter,
                        active && styles.toolLetterActive,
                        tool.bold && styles.toolBold,
                        tool.italic && styles.toolItalic,
                        tool.underline && styles.toolUnderline,
                      ]}
                    >
                      {tool.label}
                    </ThemedText>
                  )}
                </Pressable>
              );
            })}
          </View>
          <TextInput
            placeholder="Escribe el contenido de tu artículo..."
            placeholderTextColor={theme.textSecondary}
            value={content}
            onChangeText={setContent}
            onSelectionChange={(e) => setSelection(e.nativeEvent.selection)}
            multiline
            textAlignVertical="top"
            style={[styles.contentInput, { color: theme.text }]}
          />
        </View>

        {/* Options */}
        <View style={styles.optionsList}>
          <Pressable
            style={styles.optionRow}
            onPress={pickFile}
          >
            <View style={styles.optionIcon}>
              <Ionicons name="attach-outline" size={20} color="#615673" />
            </View>
            <View style={styles.optionTextGroup}>
              <ThemedText type="small" style={styles.optionLabel}>
                Subir archivo opcional
              </ThemedText>
              {fileUri ? (
                <ThemedText type="small" style={styles.optionValue}>
                  1 archivo adjunto
                </ThemedText>
              ) : (
                <ThemedText type="small" style={styles.optionValue}>
                  Toca para seleccionar una imagen
                </ThemedText>
              )}
            </View>
            {fileUri ? (
              <Pressable
                hitSlop={8}
                style={styles.fileRemoveBtn}
                onPress={() => setFileUri(null)}
              >
                <Ionicons name="close-circle" size={22} color="#FF6B6B" />
              </Pressable>
            ) : (
              <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
            )}
          </Pressable>

          <Pressable
            style={styles.optionRow}
            onPress={() => setHasAudio((prev) => !prev)}
          >
            <View style={styles.optionIcon}>
              <Ionicons name="musical-notes-outline" size={20} color="#615673" />
            </View>
            <View style={styles.optionTextGroup}>
              <ThemedText type="small" style={styles.optionLabel}>
                Añadir audio
              </ThemedText>
              {hasAudio ? (
                <ThemedText type="small" style={styles.optionValue}>
                  Audio adjuntado
                </ThemedText>
              ) : null}
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
          </Pressable>

          <View style={styles.optionRow}>
            <View style={styles.optionIcon}>
              <Ionicons name="pricetags-outline" size={20} color="#615673" />
            </View>
            <TextInput
              placeholder="Agregar etiquetas (separadas por coma)"
              placeholderTextColor={theme.textSecondary}
              value={tags}
              onChangeText={setTags}
              style={[styles.tagsInput, { color: theme.text }]}
            />
          </View>
        </View>

        {/* Auto-save status */}
        <View style={styles.saveStatus}>
          <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
          <ThemedText type="small" themeColor="textSecondary">
            Guardado automáticamente · hace un momento
          </ThemedText>
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  headerTitleGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backPressed: {
    opacity: 0.7,
  },
  pageTitle: {
    fontSize: 28,
    flexShrink: 1,
  },
  publishBtn: {
    backgroundColor: '#615673',
    paddingVertical: Spacing.two + 2,
    paddingHorizontal: Spacing.four,
    borderRadius: 999,
  },
  publishText: {
    color: '#FFFFFF',
  },
  coverPreviewWrap: {
    position: 'relative',
  },
  coverPreview: {
    width: '100%',
    height: 200,
    borderRadius: 20,
  },
  coverRemoveBtn: {
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
  uploadBox: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#B9A8DC',
    borderRadius: 20,
    paddingVertical: Spacing.five,
    alignItems: 'center',
    gap: Spacing.two,
    backgroundColor: '#FCFAFF',
  },
  uploadPressed: {
    opacity: 0.8,
  },
  uploadIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F5F0FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadTitle: {
    color: '#615673',
    fontSize: 15,
  },
  uploadHint: {
    fontSize: 12,
  },
  titleInput: {
    fontSize: 17,
    fontWeight: '700',
    borderRadius: 16,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
  },
  categoriesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  categoryChip: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: 999,
    backgroundColor: '#F0F0F3',
  },
  categoryChipActive: {
    backgroundColor: '#615673',
  },
  categoryText: {
    color: '#60646C',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  editorCard: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    padding: Spacing.three,
    gap: Spacing.two,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  editorLabel: {
    fontSize: 15,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.one,
    borderRadius: 14,
    backgroundColor: '#F5F5F7',
  },
  toolBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolBtnActive: {
    backgroundColor: '#615673',
  },
  toolLetter: {
    fontSize: 16,
  },
  toolLetterActive: {
    color: '#FFFFFF',
  },
  toolBold: {
    fontWeight: '800',
  },
  toolItalic: {
    fontStyle: 'italic',
  },
  toolUnderline: {
    textDecorationLine: 'underline',
  },
  contentInput: {
    fontSize: 15,
    lineHeight: 22,
    minHeight: 160,
    fontFamily: 'system-ui',
  },
  optionsList: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: Spacing.three,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
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
  fileRemoveBtn: {
    padding: 2,
  },
  tagsInput: {
    flex: 1,
    fontSize: 15,
  },
  saveStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.one,
    paddingVertical: Spacing.one,
  },
});
