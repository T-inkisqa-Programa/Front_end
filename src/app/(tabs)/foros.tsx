import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
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
    name: 'Adolescentes',
    description: 'Un espacio seguro para compartir dudas, sueños y experiencias entre chicas.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: '2',
    name: 'Familia completa',
    description: 'Conecta con otras mujeres que buscan armonía y bienestar en sus hogares.',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: '3',
    name: 'Autoestima',
    description: 'Fortalece tu amor propio y comparte herramientas para brillar desde dentro.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: '4',
    name: 'Carreras',
    description: 'Inspírate con historias de mujeres profesionales y construye tu camino laboral.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80',
  },
];

export default function ForosScreen() {
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

        {/* Title Section */}
        <View style={styles.titleSection}>
          <ThemedText type="title" style={styles.pageTitle}>
            Foro de Comunidades
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.pageDesc}>
            Encuentra tu espacio seguro, comparteexperiencias y crece junto a otras mujeres en nuestras comunidades temáticas.
          </ThemedText>
        </View>

        {/* Groups count + Create button */}
        <ThemedText type="small" themeColor="textSecondary" style={styles.groupsText}>
          Perteneces a: 7 grupos
        </ThemedText>

        <Pressable style={styles.createBtn} onPress={() => router.push('/nueva-comunidad')}>
          <Ionicons name="add" size={22} color="#FFFFFF" />
          <ThemedText type="smallBold" style={{ color: '#FFFFFF' }}>
            Crear nueva comunidad
          </ThemedText>
        </Pressable>

        {/* Explore Categories */}
        <View style={styles.categoriesHeader}>
          <ThemedText type="smallBold" style={styles.sectionTitle}>
            Explorar Categorías
          </ThemedText>
          <Pressable>
            <ThemedText type="small" style={{ color: '#615673' }}>
              Ver todas
            </ThemedText>
          </Pressable>
        </View>

        {/* Community Cards */}
        <View style={styles.list}>
          {communities.map((com) => (
            <View key={com.id} style={styles.communityCard}>
              <Image source={com.image} style={styles.communityImage} contentFit="cover" />
              <View style={styles.communityBody}>
                <ThemedText type="smallBold" style={styles.communityName}>
                  {com.name}
                </ThemedText>
                <ThemedText type="small" themeColor="textSecondary" style={styles.communityDesc} numberOfLines={2}>
                  {com.description}
                </ThemedText>
                <View style={styles.communityActions}>
                  <Pressable style={styles.exploreBtn} onPress={() => router.push({ pathname: '/comunidad', params: { name: com.name } })}>
                    <ThemedText type="smallBold" style={{ color: '#615673' }}>
                      Explorar
                    </ThemedText>
                  </Pressable>
                  <Pressable style={styles.joinBtn}>
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
        <View style={styles.featuredCard}>
          <View style={styles.featuredContent}>
            <ThemedText type="smallBold" style={styles.featuredLabel}>
              Comunidad Destacada
            </ThemedText>
            <ThemedText type="smallBold" style={styles.featuredName}>
              Mujeres en Acción
            </ThemedText>
            <ThemedText type="small" style={styles.featuredDesc}>
              Un espacio donde miles de mujeres se reúnen para impulsar sus proyectos, compartir recursos y crear redes de apoyo sólidas.
            </ThemedText>
            <Pressable style={styles.featuredBtn}>
              <ThemedText type="smallBold" style={{ color: '#FFFFFF' }}>
                Unirse Ahora
              </ThemedText>
            </Pressable>
          </View>
          <View style={styles.featuredDeco}>
            <Ionicons name="sparkles" size={48} color="#FFB6C1" />
          </View>
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
  titleSection: {
    gap: Spacing.one,
  },
  pageTitle: {
    fontSize: 28,
  },
  pageDesc: {
    lineHeight: 20,
  },
  groupsText: {
    marginTop: Spacing.half,
  },
  createBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    backgroundColor: '#615673',
    paddingVertical: Spacing.three,
    borderRadius: 16,
  },
  categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.one,
  },
  sectionTitle: {
    fontSize: 18,
  },
  list: {
    gap: Spacing.three,
  },
  communityCard: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
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
    borderColor: '#615673',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  joinBtn: {
    flex: 1,
    paddingVertical: Spacing.two,
    borderRadius: 999,
    backgroundColor: '#615673',
    alignItems: 'center',
  },
  featuredCard: {
    borderRadius: 24,
    backgroundColor: '#FFE4EC',
    padding: Spacing.four,
    flexDirection: 'row',
    overflow: 'hidden',
    minHeight: 180,
  },
  featuredContent: {
    flex: 1,
    gap: Spacing.two,
  },
  featuredLabel: {
    fontSize: 13,
    color: '#615673',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  featuredName: {
    fontSize: 20,
  },
  featuredDesc: {
    lineHeight: 20,
    color: '#6B6B6B',
  },
  featuredBtn: {
    backgroundColor: '#615673',
    paddingVertical: Spacing.two + 2,
    paddingHorizontal: Spacing.four,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  featuredDeco: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});
