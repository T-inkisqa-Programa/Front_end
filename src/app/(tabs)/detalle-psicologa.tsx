import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { getPsicologaById, psicologas } from '@/lib/psicologas';

export default function DetallePsicologaScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();

  const psicologa = getPsicologaById(id ?? '') ?? psicologas[0];

  const contactWhatsApp = () => {
    const message = `Hola ${psicologa.name}, me gustaría agendar una cita contigo.`;
    Linking.openURL(`https://wa.me/${psicologa.whatsapp}?text=${encodeURIComponent(message)}`);
  };

  return (
    <ThemedView style={[styles.screen, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Pressable
          hitSlop={8}
          style={({ pressed }) => [styles.headerBtn, pressed && styles.pressed]}
          onPress={() => router.back()}
        >
          <Ionicons name="close" size={24} color={theme.text} />
        </Pressable>
        <ThemedText type="smallBold" style={styles.headerTitle}>
          Perfil de psicóloga
        </ThemedText>
        <View style={styles.headerBtn} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: BottomTabInset + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.avatarWrap}>
            <Image source={psicologa.photo} style={styles.avatar} contentFit="cover" />
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark" size={14} color="#FFFFFF" />
            </View>
          </View>

          <ThemedText type="smallBold" style={styles.name}>
            {psicologa.name}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.specialty}>
            {psicologa.specialty}
          </ThemedText>

          <View style={styles.approachRow}>
            <Ionicons name="briefcase-outline" size={16} color="#615673" />
            <ThemedText type="small" style={{ color: '#615673' }}>
              {psicologa.approach}
            </ThemedText>
          </View>

          <View style={styles.verifiedTag}>
            <Ionicons name="shield-checkmark" size={16} color="#615673" />
            <ThemedText type="smallBold" style={styles.verifiedText}>
              Perfil verificado
            </ThemedText>
          </View>
        </View>

        {/* Highlights */}
        <View style={[styles.statsCard, { backgroundColor: theme.backgroundElement }]}>
          <View style={styles.stat}>
            <ThemedText type="smallBold" style={styles.statValue}>
              {psicologa.experienceYears}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary" style={styles.statLabel}>
              Años de experiencia
            </ThemedText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <ThemedText type="smallBold" style={styles.statValue}>
              {psicologa.location}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary" style={styles.statLabel}>
              Ubicación
            </ThemedText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={18} color="#F5A623" />
              <ThemedText type="smallBold" style={styles.statValue}>
                {psicologa.rating.toFixed(1)}
              </ThemedText>
            </View>
            <ThemedText type="small" themeColor="textSecondary" style={styles.statLabel}>
              Valoración
            </ThemedText>
          </View>
        </View>

        {/* About */}
        <View style={[styles.sectionCard, { backgroundColor: theme.backgroundElement }]}>
          <ThemedText type="smallBold" style={styles.sectionTitle}>
            Sobre mí
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.aboutText}>
            {psicologa.about}
          </ThemedText>
        </View>

        {/* Specialties */}
        <View style={styles.section}>
          <ThemedText type="smallBold" style={styles.sectionTitle}>
            Especialidades
          </ThemedText>
          <View style={styles.tagsWrap}>
            {psicologa.specialties.map((tag) => (
              <View key={tag} style={styles.tag}>
                <ThemedText type="smallBold" style={styles.tagText}>
                  {tag}
                </ThemedText>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* WhatsApp CTA */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + BottomTabInset + 16 }]}>
        <Pressable
          style={({ pressed }) => [styles.whatsappBtn, pressed && styles.pressed]}
          onPress={contactWhatsApp}
        >
          <Ionicons name="logo-whatsapp" size={22} color="#FFFFFF" />
          <ThemedText type="smallBold" style={styles.whatsappText}>
            Contactar por WhatsApp
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
  headerBtn: {
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
  hero: {
    alignItems: 'center',
    gap: Spacing.two,
  },
  avatarWrap: {
    position: 'relative',
    padding: 4,
    borderRadius: 999,
    backgroundColor: '#F5F0FF',
  },
  avatar: {
    width: 116,
    height: 116,
    borderRadius: 58,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#615673',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  name: {
    fontSize: 20,
    marginTop: Spacing.one,
  },
  specialty: {
    fontSize: 14,
  },
  approachRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  verifiedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: 999,
    backgroundColor: '#F5F0FF',
  },
  verifiedText: {
    color: '#615673',
    fontSize: 13,
  },
  statsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: Spacing.three,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: '#EEECF2',
  },
  statValue: {
    fontSize: 16,
  },
  statLabel: {
    fontSize: 11,
    textAlign: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  sectionCard: {
    borderRadius: 20,
    padding: Spacing.four,
    gap: Spacing.two,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 17,
  },
  aboutText: {
    lineHeight: 22,
  },
  section: {
    gap: Spacing.two,
  },
  tagsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  tag: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: 999,
    backgroundColor: '#F5F0FF',
  },
  tagText: {
    color: '#615673',
    fontSize: 13,
  },
  footer: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
  },
  whatsappBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    backgroundColor: '#25D366',
    borderRadius: 999,
    paddingVertical: Spacing.three + 2,
  },
  whatsappText: {
    color: '#FFFFFF',
    fontSize: 15,
  },
});
