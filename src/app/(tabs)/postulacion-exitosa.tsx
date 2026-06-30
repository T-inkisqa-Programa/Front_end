import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TopBar } from '@/components/top-bar';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function PostulacionExitosaScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();

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

        {/* Favorite button */}
        <View style={styles.favRow}>
          <Pressable style={styles.favBtn}>
            <Ionicons name="heart-outline" size={24} color="#615673" />
          </Pressable>
        </View>

        {/* Illustration */}
        <View style={styles.illustration}>
          <View style={styles.illusCircle}>
            <Ionicons name="checkmark-circle" size={80} color="#615673" />
          </View>
        </View>
        

        {/* Title & message */}
        <View style={styles.textSection}>
          <ThemedText type="title" style={styles.successTitle}>
            ¡Postulación Enviada!
          </ThemedText>
          <ThemedText type="small" style={styles.successMsg}>
            Tu postulación fue recibida correctamente. El equipo de T'inkisqa revisará tu perfil y se comunicará contigo en caso de avanzar a la siguiente etapa.
          </ThemedText>
        </View>

        {/* Buttons */}
        <Pressable style={styles.primaryBtn} onPress={() => router.push('/voluntarios')}>
          <ThemedText type="smallBold" style={{ color: '#FFFFFF' }}>
            Volver a Voluntariados
          </ThemedText>
        </Pressable>

        <Pressable style={styles.secondaryBtn} onPress={() => router.push('/inicio')}>
          <ThemedText type="smallBold" style={{ color: '#615673' }}>
            Ir al Inicio
          </ThemedText>
        </Pressable>

        {/* Info card */}
        <View style={styles.infoCard}>
          <Ionicons name="information-circle-outline" size={20} color="#615673" />
          <ThemedText type="small" style={styles.infoText}>
            Recibirás un correo de confirmación con los detalles de tu postulación.
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
    flexGrow: 1,
  },
  favRow: {
    alignItems: 'flex-end',
  },
  favBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    alignItems: 'center',
    paddingVertical: Spacing.four,
  },
  illusCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#F5F0FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSection: {
    gap: Spacing.two,
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 28,
    textAlign: 'center',
  },
  successMsg: {
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: Spacing.two,
  },
  primaryBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#615673',
    paddingVertical: Spacing.three + 2,
    borderRadius: 16,
  },
  secondaryBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: Spacing.three + 2,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
  },
  infoCard: {
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
});
