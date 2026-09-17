import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library/legacy';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { Modal, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/shared/ui/themed-text';
import { ThemedView } from '@/shared/ui/themed-view';
import { BottomTabInset, Spacing } from '@/shared/theme/theme';
import { useTheme } from '@/shared/hooks/use-theme';
import { publicacionDraft } from '@/contexts/comunidad/application/publicacion-draft';

const filters = ['Recientes', 'Favoritas'];

const previewFilters = [
  { label: 'Original', overlay: null },
  { label: 'Rosa', overlay: 'rgba(255,107,138,0.25)' },
  { label: 'Violeta', overlay: 'rgba(97,86,115,0.30)' },
  { label: 'Cálido', overlay: 'rgba(222,184,135,0.35)' },
];

export default function SeleccionarFotoScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const [photos, setPhotos] = useState<{ id: string; uri: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUri, setSelectedUri] = useState<string | null>(publicacionDraft.media);
  const [activeFilter, setActiveFilter] = useState('Recientes');
  const [previewFilterIndex, setPreviewFilterIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const loadPhotos = async () => {
    if (Platform.OS === 'web') {
      setLoading(false);
      return;
    }
    try {
      const permission = await MediaLibrary.requestPermissionsAsync();
      if (!permission.granted) {
        setLoading(false);
        return;
      }
      const { assets } = await MediaLibrary.getAssetsAsync({
        first: 30,
        mediaType: 'photo',
        sortBy: [['creationTime', false]],
      });
      setPhotos(assets.map((a) => ({ id: a.id, uri: a.uri })));
    } catch {
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  };

  const pickFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.8,
      });
      if (!result.canceled) {
        setSelectedUri(result.assets[0].uri);
      }
    } catch {
      // Permisos denegados o galería no disponible.
    }
  };

  useEffect(() => {
    const t = setTimeout(loadPhotos, 0);
    return () => clearTimeout(t);
  }, []);

  const done = () => {
    publicacionDraft.media = selectedUri;
    router.back();
  };

  const galleryPhotos =
    activeFilter === 'Favoritas'
      ? photos.filter((photo) => photo.uri === selectedUri)
      : photos;
  const currentFilter = previewFilters[previewFilterIndex];

  return (
    <ThemedView style={[styles.screen, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Pressable style={styles.headerSideBtn} onPress={() => router.back()}>
          <Ionicons name="close" size={26} color={theme.text} />
        </Pressable>
        <ThemedText type="smallBold" style={styles.headerTitle}>
          Seleccionar foto
        </ThemedText>
        <Pressable style={styles.headerSideBtn} onPress={done}>
          <ThemedText type="smallBold" style={styles.doneText}>
            Listo
          </ThemedText>
        </Pressable>
      </View>

      {/* Preview */}
      <View style={styles.previewWrap}>
        {selectedUri ? (
          <View style={styles.preview}>
            <Image source={selectedUri} style={styles.previewImg} contentFit="cover" />
            {currentFilter.overlay && (
              <View style={[styles.previewFilterOverlay, { backgroundColor: currentFilter.overlay }]} />
            )}
          </View>
        ) : (
          <View style={[styles.preview, styles.previewEmpty, { backgroundColor: theme.backgroundElement }]}>
            <Ionicons name="image-outline" size={40} color={theme.textSecondary} />
            <ThemedText type="small" themeColor="textSecondary">
              Selecciona una foto
            </ThemedText>
          </View>
        )}
        {selectedUri && (
          <View style={styles.previewControls}>
            <Pressable style={styles.previewControlBtn} onPress={() => setExpanded(true)}>
              <Ionicons name="expand-outline" size={20} color="#FFFFFF" />
            </Pressable>
            <Pressable
              style={styles.previewControlBtn}
              onPress={() => setPreviewFilterIndex((prev) => (prev + 1) % previewFilters.length)}
            >
              <Ionicons name="filter-outline" size={20} color="#FFFFFF" />
            </Pressable>
          </View>
        )}
      </View>

      {/* Filter */}
      <View style={styles.filterRow}>
        {filters.map((f) => {
          const active = activeFilter === f;
          return (
            <Pressable
              key={f}
              style={[styles.filterTab, active && styles.filterTabActive]}
              onPress={() => setActiveFilter(f)}
            >
              <ThemedText type="small" style={[styles.filterText, active && { color: '#FFFFFF' }]}>
                {f}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>

      {/* Gallery */}
      {loading ? (
        <View style={styles.loadingBox}>
          <Ionicons name="sync" size={24} color="#615673" />
          <ThemedText type="small" themeColor="textSecondary">
            Cargando fotos...
          </ThemedText>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.gallery, { paddingBottom: BottomTabInset + 32 }]}
        >
          {galleryPhotos.length === 0 ? (
            <View style={styles.emptyBox}>
              <Ionicons name="images-outline" size={32} color={theme.textSecondary} />
              <ThemedText type="small" themeColor="textSecondary" style={styles.emptyText}>
                {activeFilter === 'Favoritas'
                  ? 'Aún no tienes fotos favoritas. Selecciona una foto para verla aquí.'
                  : 'No pudimos cargar tus fotos recientes.'}
              </ThemedText>
            </View>
          ) : (
            galleryPhotos.map((photo) => {
              const active = selectedUri === photo.uri;
              return (
                <Pressable
                  key={photo.id}
                  style={[styles.photoCell, active && styles.photoCellActive]}
                  onPress={() => setSelectedUri(photo.uri)}
                >
                  <Image source={photo.uri} style={styles.photoThumb} contentFit="cover" />
                  {active && (
                    <View style={styles.photoCheck}>
                      <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                    </View>
                  )}
                </Pressable>
              );
            })
          )}
          <Pressable style={styles.galleryBtn} onPress={pickFromGallery}>
            <Ionicons name="albums-outline" size={20} color="#615673" />
            <ThemedText type="smallBold" style={styles.galleryBtnText}>
              Abrir galería completa
            </ThemedText>
          </Pressable>
        </ScrollView>
      )}

      {/* Fullscreen preview */}
      <Modal visible={expanded} transparent animationType="fade" onRequestClose={() => setExpanded(false)}>
        <Pressable style={styles.fullscreenOverlay} onPress={() => setExpanded(false)}>
          {selectedUri && (
            <Image source={selectedUri} style={styles.fullscreenImage} contentFit="contain" />
          )}
        </Pressable>
      </Modal>
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
  previewWrap: {
    marginHorizontal: Spacing.four,
    position: 'relative',
  },
  preview: {
    width: '100%',
    height: 260,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  previewImg: {
    width: '100%',
    height: '100%',
  },
  previewFilterOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  fullscreenOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    width: '100%',
    height: '100%',
  },
  previewEmpty: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.two,
  },
  previewControls: {
    position: 'absolute',
    bottom: Spacing.three,
    right: Spacing.three,
    flexDirection: 'row',
    gap: Spacing.two,
  },
  previewControlBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterRow: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F3',
    borderRadius: 14,
    padding: 4,
    marginHorizontal: Spacing.four,
    marginTop: Spacing.three,
  },
  filterTab: {
    flex: 1,
    paddingVertical: Spacing.two,
    borderRadius: 11,
    alignItems: 'center',
  },
  filterTabActive: {
    backgroundColor: '#615673',
  },
  filterText: {
    color: '#60646C',
  },
  loadingBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.two,
  },
  gallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
  },
  emptyText: {
    textAlign: 'center',
    paddingVertical: Spacing.five,
  },
  emptyBox: {
    alignItems: 'center',
    gap: Spacing.two,
    width: '100%',
    paddingVertical: Spacing.four,
  },
  galleryBtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.three,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    backgroundColor: '#FFFFFF',
  },
  galleryBtnText: {
    color: '#615673',
  },
  photoCell: {
    width: '31.5%',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  photoCellActive: {
    borderWidth: 2.5,
    borderColor: '#615673',
  },
  photoThumb: {
    width: '100%',
    height: '100%',
  },
  photoCheck: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#615673',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
