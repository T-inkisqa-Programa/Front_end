import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Modal, Pressable, ScrollView, StyleSheet, View, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TopBar } from '@/components/top-bar';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const categories = ['Adolescentes', 'Familia completa', 'Autoestima', 'Carreras', 'Bienestar', 'Arte'];

export default function NuevaComunidadScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [privacy, setPrivacy] = useState<'publica' | 'privada'>('publica');
  const [categoryOpen, setCategoryOpen] = useState(false);

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
        {/* Top Bar with close button */}
        <TopBar showClose onClose={() => router.back()} />

        {/* Title */}
        <View style={styles.titleSection}>
          <ThemedText type="title" style={styles.pageTitle}>
            Nueva Comunidad
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.pageDesc}>
            Crea un espacio seguro para que más mujeres puedan conectar, aprender y crecer juntas.
          </ThemedText>
        </View>

        {/* Cover Image Upload */}
        <View style={[styles.uploadBox, { borderColor: theme.textSecondary }]}>
          <Ionicons name="camera-outline" size={32} color={theme.textSecondary} />
          <ThemedText type="small" themeColor="textSecondary" style={styles.uploadText}>
            Subir imagen sugerida
          </ThemedText>
        </View>

        {/* Community Name */}
        <View style={styles.fieldGroup}>
          <ThemedText type="smallBold" style={styles.fieldLabel}>
            Nombre de la comunidad
          </ThemedText>
          <View style={[styles.inputWrapper, { backgroundColor: theme.backgroundElement, borderColor: theme.backgroundSelected }]}>
            <TextInput
              placeholder="Ej: Mujeres en Acción"
              placeholderTextColor={theme.textSecondary}
              style={[styles.input, { color: theme.text }]}
            />
          </View>
        </View>

        {/* Category Selector */}
        <View style={styles.fieldGroup}>
          <ThemedText type="smallBold" style={styles.fieldLabel}>
            Categoría
          </ThemedText>
          <Pressable
            style={[styles.selector, { backgroundColor: theme.backgroundElement, borderColor: theme.backgroundSelected }]}
            onPress={() => setCategoryOpen(true)}
          >
            <ThemedText style={[styles.selectorText, !selectedCategory && { color: theme.textSecondary }]}>
              {selectedCategory || 'Selecciona una categoría'}
            </ThemedText>
            <Ionicons name="chevron-down" size={20} color={theme.textSecondary} />
          </Pressable>
        </View>

        {/* Description */}
        <View style={styles.fieldGroup}>
          <ThemedText type="smallBold" style={styles.fieldLabel}>
            Descripción
          </ThemedText>
          <View style={[styles.textAreaWrapper, { backgroundColor: theme.backgroundElement, borderColor: theme.backgroundSelected }]}>
            <TextInput
              placeholder="Describe el propósito de tu comunidad..."
              placeholderTextColor={theme.textSecondary}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              style={[styles.textArea, { color: theme.text }]}
            />
          </View>
          <ThemedText type="small" themeColor="textSecondary" style={styles.helpText}>
            Explica de qué trata tu comunidad y a quién está dirigida.
          </ThemedText>
        </View>

        {/* Privacy Selection */}
        <View style={styles.fieldGroup}>
          <ThemedText type="smallBold" style={styles.fieldLabel}>
            Privacidad
          </ThemedText>
          <View style={styles.privacyRow}>
            {/* Pública */}
            <Pressable
              onPress={() => setPrivacy('publica')}
              style={[
                styles.privacyCard,
                privacy === 'publica' && styles.privacyCardActive,
              ]}
            >
              <View style={[styles.privacyIcon, privacy === 'publica' && styles.privacyIconActive]}>
                <Ionicons
                  name="globe-outline"
                  size={22}
                  color={privacy === 'publica' ? '#615673' : theme.textSecondary}
                />
              </View>
              <ThemedText type="smallBold" style={[styles.privacyTitle, privacy === 'publica' && { color: '#615673' }]}>
                Pública
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary" style={styles.privacyDesc}>
                Cualquier persona puede ver y unirse a la comunidad.
              </ThemedText>
            </Pressable>

            {/* Privada */}
            <Pressable
              onPress={() => setPrivacy('privada')}
              style={[
                styles.privacyCard,
                privacy === 'privada' && styles.privacyCardActive,
              ]}
            >
              <View style={[styles.privacyIcon, privacy === 'privada' && styles.privacyIconActive]}>
                <Ionicons
                  name="lock-closed-outline"
                  size={22}
                  color={privacy === 'privada' ? '#615673' : theme.textSecondary}
                />
              </View>
              <ThemedText type="smallBold" style={[styles.privacyTitle, privacy === 'privada' && { color: '#615673' }]}>
                Privada
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary" style={styles.privacyDesc}>
                Solo se puede unir con invitación o aprobación.
              </ThemedText>
            </Pressable>
          </View>
        </View>

        {/* Create Button */}
        <Pressable style={styles.createBtn}>
          <ThemedText type="smallBold" style={{ color: '#FFFFFF' }}>
            Crear Comunidad
          </ThemedText>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        </Pressable>

        {/* Footer note */}
        <ThemedText type="small" themeColor="textSecondary" style={styles.footerNote}>
          Al crear una comunidad aceptas las Guías de Convivencia y Seguridad de T'inkisqa.
        </ThemedText>
      </ScrollView>

      {/* Category Modal */}
      <Modal visible={categoryOpen} transparent animationType="fade" onRequestClose={() => setCategoryOpen(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setCategoryOpen(false)}>
          <Pressable style={[styles.modalContent, { backgroundColor: theme.background }]}>
            <View style={styles.modalHeader}>
              <ThemedText type="title" style={styles.modalTitle}>
                Categoría
              </ThemedText>
              <Pressable onPress={() => setCategoryOpen(false)}>
                <Ionicons name="close" size={24} color={theme.text} />
              </Pressable>
            </View>
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <Pressable
                  key={cat}
                  style={[styles.modalOption, active && { backgroundColor: '#F5F0FF' }]}
                  onPress={() => {
                    setSelectedCategory(cat);
                    setCategoryOpen(false);
                  }}
                >
                  <ThemedText style={[styles.modalOptionText, active && { color: '#615673' }]}>
                    {cat}
                  </ThemedText>
                  {active && <Ionicons name="checkmark" size={20} color="#615673" />}
                </Pressable>
              );
            })}
          </Pressable>
        </Pressable>
      </Modal>
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
  titleSection: {
    gap: Spacing.one,
  },
  pageTitle: {
    fontSize: 28,
  },
  pageDesc: {
    lineHeight: 20,
  },
  uploadBox: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 20,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.two,
  },
  uploadText: {
    fontSize: 14,
  },
  fieldGroup: {
    gap: Spacing.two,
  },
  fieldLabel: {
    fontSize: 15,
  },
  inputWrapper: {
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: Spacing.three,
    height: 50,
    justifyContent: 'center',
  },
  input: {
    fontSize: 16,
    fontFamily: 'system-ui',
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: Spacing.three,
    height: 50,
  },
  selectorText: {
    fontSize: 16,
    fontFamily: 'system-ui',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: Spacing.four,
    gap: Spacing.two,
    paddingBottom: BottomTabInset + 32,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.two,
  },
  modalTitle: {
    fontSize: 20,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.three,
    borderRadius: 14,
  },
  modalOptionText: {
    fontSize: 16,
    fontFamily: 'system-ui',
  },
  textAreaWrapper: {
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  textArea: {
    fontSize: 16,
    fontFamily: 'system-ui',
    minHeight: 100,
  },
  helpText: {
    marginTop: -Spacing.one,
  },
  privacyRow: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  privacyCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    backgroundColor: '#FFFFFF',
    padding: Spacing.three,
    gap: Spacing.two,
  },
  privacyCardActive: {
    borderColor: '#615673',
    backgroundColor: '#F5F0FF',
  },
  privacyIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#F0F0F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  privacyIconActive: {
    backgroundColor: '#E8E3F5',
  },
  privacyTitle: {
    fontSize: 15,
  },
  privacyDesc: {
    fontSize: 12,
    lineHeight: 16,
  },
  createBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    backgroundColor: '#615673',
    paddingVertical: Spacing.three + 2,
    borderRadius: 16,
    marginTop: Spacing.one,
  },
  footerNote: {
    textAlign: 'center',
    lineHeight: 18,
  },
});
