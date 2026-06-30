import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TopBar } from '@/components/top-bar';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const communities = [
  {
    id: '1',
    name: 'Mujeres en Acción',
    description: 'Espacio para compartir experiencias y apoyarnos mutuamente en el crecimiento profesional y personal.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
    members: '2.4k',
  },
  {
    id: '2',
    name: 'Arte y Creatividad',
    description: 'Comunidad dedicada a explorar el arte como herramienta de expresión y sanación emocional.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80',
    members: '1.8k',
  },
  {
    id: '3',
    name: 'Bienestar y Mindfulness',
    description: 'Comparte prácticas de meditación, autocuidado y bienestar integral para una vida más plena.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80',
    members: '3.1k',
  },
];

const featured = {
  name: 'Empoderamiento Digital',
  description: 'Aprende herramientas digitales y conecta con mujeres que están transformando la tecnología.',
  image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
  members: '5.2k',
};

export default function ForosScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

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

        {/* Title + Subtitle */}
        <View style={styles.titleRow}>
          <View style={styles.titleInfo}>
            <ThemedText type="title" style={styles.pageTitle}>
              Foro de Comunidades
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {communities.length + 1} comunidades disponibles
            </ThemedText>
          </View>
          <Pressable style={[styles.createBtn, { backgroundColor: '#615673' }]}>
            <Ionicons name="add" size={20} color="#FFFFFF" />
            <ThemedText type="smallBold" style={{ color: '#FFFFFF', fontSize: 13 }}>
              Crear
            </ThemedText>
          </Pressable>
        </View>

        {/* Community Cards */}
        <View style={styles.list}>
          {communities.map((com) => (
            <View key={com.id} style={[styles.communityCard, { backgroundColor: theme.backgroundElement }]}>
              <Image source={com.image} style={styles.communityImage} contentFit="cover" />
              <View style={styles.communityBody}>
                <ThemedText type="smallBold" style={styles.communityName}>
                  {com.name}
                </ThemedText>
                <ThemedText type="small" themeColor="textSecondary" style={styles.communityDesc} numberOfLines={2}>
                  {com.description}
                </ThemedText>
                <View style={styles.communityMeta}>
                  <Ionicons name="people-outline" size={14} color={theme.textSecondary} />
                  <ThemedText type="small" themeColor="textSecondary">
                    {com.members} miembros
                  </ThemedText>
                </View>
                <View style={styles.communityActions}>
                  <Pressable style={[styles.exploreBtn, { borderColor: '#615673' }]}>
                    <ThemedText type="smallBold" style={{ color: '#615673' }}>
                      Explorar
                    </ThemedText>
                  </Pressable>
                  <Pressable style={[styles.joinBtn, { backgroundColor: '#615673' }]}>
                    <ThemedText type="smallBold" style={{ color: '#FFFFFF' }}>
                      Unirse
                    </ThemedText>
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Featured Community */}
        <View style={[styles.featuredCard, { backgroundColor: '#F3F0FF' }]}>
          <View style={styles.featuredLabel}>
            <Ionicons name="star" size={16} color="#615673" />
            <ThemedText type="smallBold" style={{ color: '#615673', fontSize: 12 }}>
              Comunidad Destacada
            </ThemedText>
          </View>
          <Image source={featured.image} style={styles.featuredImage} contentFit="cover" />
          <ThemedText type="smallBold" style={styles.featuredName}>
            {featured.name}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.featuredDesc} numberOfLines={2}>
            {featured.description}
          </ThemedText>
          <View style={styles.featuredMeta}>
            <Ionicons name="people-outline" size={14} color={theme.textSecondary} />
            <ThemedText type="small" themeColor="textSecondary">
              {featured.members} miembros
            </ThemedText>
          </View>
          <Pressable style={[styles.featuredJoinBtn, { backgroundColor: '#615673' }]}>
            <ThemedText type="smallBold" style={{ color: '#FFFFFF' }}>
              Unirme a esta comunidad
            </ThemedText>
          </Pressable>
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
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleInfo: {
    flex: 1,
    gap: Spacing.one,
  },
  pageTitle: {
    fontSize: 26,
  },
  createBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: 999,
  },
  list: {
    gap: Spacing.three,
  },
  communityCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  communityImage: {
    width: '100%',
    height: 140,
  },
  communityBody: {
    padding: Spacing.three,
    gap: Spacing.two,
  },
  communityName: {
    fontSize: 16,
  },
  communityDesc: {
    lineHeight: 20,
  },
  communityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  communityActions: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginTop: Spacing.one,
  },
  exploreBtn: {
    flex: 1,
    paddingVertical: Spacing.two,
    borderRadius: 999,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  joinBtn: {
    flex: 1,
    paddingVertical: Spacing.two,
    borderRadius: 999,
    alignItems: 'center',
  },
  featuredCard: {
    borderRadius: 24,
    padding: Spacing.four,
    gap: Spacing.two,
  },
  featuredLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  featuredImage: {
    width: '100%',
    height: 160,
    borderRadius: 16,
  },
  featuredName: {
    fontSize: 18,
  },
  featuredDesc: {
    lineHeight: 20,
  },
  featuredMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  featuredJoinBtn: {
    paddingVertical: Spacing.two + 2,
    borderRadius: 999,
    alignItems: 'center',
    marginTop: Spacing.one,
  },
});
