import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const availabilityOptions = [
  'Lunes a viernes (mañana)',
  'Lunes a viernes (tarde)',
  'Lunes a viernes (noche)',
  'Fines de semana',
  'Horario flexible',
];

export default function PostularScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const { title, organization, location } = useLocalSearchParams<{
    title: string;
    organization: string;
    location: string;
  }>();

  const [availabilityOpen, setAvailabilityOpen] = useState(false);
  const [selectedAvailability, setSelectedAvailability] = useState('');

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
        {/* Top row: back, title, close */}
        <View style={styles.headerRow}>
          <Pressable style={styles.headerSideBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={theme.text} />
          </Pressable>
          <ThemedText type="smallBold" style={styles.headerTitle}>
            Postular a Voluntariado
          </ThemedText>
          <Pressable style={styles.headerSideBtn} onPress={() => router.back()}>
            <Ionicons name="close" size={24} color={theme.text} />
          </Pressable>
        </View>


        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryIcon}>
            <Ionicons name="heart" size={24} color="#615673" />
          </View>
          <View style={styles.summaryInfo}>
            <ThemedText type="smallBold" style={styles.summaryTitle}>
              {title || 'Acompañamiento a adultos mayores'}
            </ThemedText>
            <ThemedText type="small" style={styles.summaryOrg}>
              {organization || 'Fundación Alegría de Vivir'}
            </ThemedText>
            <View style={styles.summaryTags}>
              <View style={styles.summaryTag}>
                <ThemedText type="small" style={{ color: '#615673', fontSize: 12 }}>
                  {location || 'Presencial · Cercado de Lima'}
                </ThemedText>
              </View>
            </View>
          </View>
        </View>

        {/* Mensaje de motivación */}
        <View style={styles.fieldGroup}>
          <ThemedText type="smallBold" style={styles.fieldLabel}>
            Mensaje de motivación
          </ThemedText>
          <View style={[styles.textAreaWrapper, { backgroundColor: theme.backgroundElement, borderColor: theme.backgroundSelected }]}>
            <TextInput
              placeholder="Cuéntanos por qué te gustaría ser parte de este voluntariado..."
              placeholderTextColor={theme.textSecondary}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              style={[styles.textArea, { color: theme.text }]}
            />
          </View>
        </View>

        {/* Correo electrónico */}
        <View style={styles.fieldGroup}>
          <ThemedText type="smallBold" style={styles.fieldLabel}>
            Correo electrónico
          </ThemedText>
          <View style={[styles.inputWrapper, { backgroundColor: theme.backgroundElement, borderColor: theme.backgroundSelected }]}>
            <TextInput
              placeholder="tucorreo@ejemplo.com"
              placeholderTextColor={theme.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
              style={[styles.input, { color: theme.text }]}
            />
          </View>
        </View>

        {/* Número de celular */}
        <View style={styles.fieldGroup}>
          <ThemedText type="smallBold" style={styles.fieldLabel}>
            Número de celular
          </ThemedText>
          <View style={[styles.inputWrapper, { backgroundColor: theme.backgroundElement, borderColor: theme.backgroundSelected }]}>
            <TextInput
              placeholder="+51 999 999 999"
              placeholderTextColor={theme.textSecondary}
              keyboardType="phone-pad"
              style={[styles.input, { color: theme.text }]}
            />
          </View>
        </View>

        {/* Disponibilidad horaria */}
        <View style={styles.fieldGroup}>
          <ThemedText type="smallBold" style={styles.fieldLabel}>
            Disponibilidad horaria
          </ThemedText>
          <Pressable
            style={[styles.selector, { backgroundColor: theme.backgroundElement, borderColor: theme.backgroundSelected }]}
            onPress={() => setAvailabilityOpen(true)}
          >
            <ThemedText style={[styles.selectorText, !selectedAvailability && { color: theme.textSecondary }]}>
              {selectedAvailability || 'Selecciona disponibilidad'}
            </ThemedText>
            <Ionicons name="chevron-down" size={20} color={theme.textSecondary} />
          </Pressable>
        </View>

        {/* Adjuntar CV */}
        <View style={styles.fieldGroup}>
          <ThemedText type="smallBold" style={styles.fieldLabel}>
            Adjuntar CV o Perfil
          </ThemedText>
          <View style={[styles.uploadBox, { borderColor: theme.textSecondary }]}>
            <Ionicons name="document-outline" size={36} color={theme.textSecondary} />
            <ThemedText type="small" themeColor="textSecondary" style={styles.uploadText}>
              Subir documento (PDF, DOC)
            </ThemedText>
          </View>
        </View>

        {/* Info note */}
        <View style={styles.infoNote}>
          <Ionicons name="information-circle-outline" size={20} color="#615673" />
          <ThemedText type="small" style={styles.infoText}>
            Al postular, el equipo revisará tu perfil y te notificaremos el resultado en un plazo aproximado de 3 a 5 días hábiles.
          </ThemedText>
        </View>

        {/* Submit Button */}
        <Pressable style={styles.submitBtn} onPress={() => router.push('/postulacion-exitosa')}>
          <ThemedText type="smallBold" style={{ color: '#FFFFFF' }}>
            Enviar Postulación
          </ThemedText>
        </Pressable>
      </ScrollView>

      {/* Availability Modal */}
      <Modal visible={availabilityOpen} transparent animationType="fade" onRequestClose={() => setAvailabilityOpen(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setAvailabilityOpen(false)}>
          <Pressable style={[styles.modalContent, { backgroundColor: theme.background }]}>
            <View style={styles.modalHeader}>
              <ThemedText type="title" style={styles.modalTitle}>
                Disponibilidad horaria
              </ThemedText>
              <Pressable onPress={() => setAvailabilityOpen(false)}>
                <Ionicons name="close" size={24} color={theme.text} />
              </Pressable>
            </View>
            {availabilityOptions.map((opt) => {
              const active = selectedAvailability === opt;
              return (
                <Pressable
                  key={opt}
                  style={[styles.modalOption, active && { backgroundColor: '#F5F0FF' }]}
                  onPress={() => {
                    setSelectedAvailability(opt);
                    setAvailabilityOpen(false);
                  }}
                >
                  <ThemedText style={[styles.modalOptionText, active && { color: '#615673' }]}>
                    {opt}
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerSideBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
  },
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: '#F5F0FF',
    borderRadius: 20,
    padding: Spacing.three,
    gap: Spacing.three,
  },
  summaryIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: '#E8E3F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryInfo: {
    flex: 1,
    gap: Spacing.one,
  },
  summaryTitle: {
    fontSize: 16,
  },
  summaryOrg: {
    color: '#6B6B6B',
  },
  summaryTags: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginTop: Spacing.half,
  },
  summaryTag: {
    paddingHorizontal: Spacing.two,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
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
  textAreaWrapper: {
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  textArea: {
    fontSize: 16,
    fontFamily: 'system-ui',
    minHeight: 120,
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
  uploadBox: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 20,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.two,
  },
  uploadText: {
    fontSize: 14,
  },
  infoNote: {
    flexDirection: 'row',
    gap: Spacing.two,
    padding: Spacing.three,
    borderRadius: 14,
    backgroundColor: '#F5F0FF',
    alignItems: 'flex-start',
  },
  infoText: {
    flex: 1,
    lineHeight: 18,
    color: '#615673',
  },
  submitBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#615673',
    paddingVertical: Spacing.three + 2,
    borderRadius: 16,
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
});
