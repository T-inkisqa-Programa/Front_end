import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TopBar } from '@/components/top-bar';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAppStore } from '@/lib/app-store';

export default function ForosScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const { communities, deleteCommunity } = useAppStore();
  const [showAll, setShowAll] = useState(false);
  const [joined, setJoined] = useState<Record<string, boolean>>({});
  const [featuredJoined, setFeaturedJoined] = useState(false);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const visibleCommunities = showAll ? communities : communities.slice(0, 4);

  const toggleJoin = (comId: string) => {
    setJoined((prev) => ({ ...prev, [comId]: !prev[comId] }));
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
          Perteneces a: {communities.length + 1} grupos
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
          <Pressable onPress={() => setShowAll((prev) => !prev)}>
            <ThemedText type="small" style={{ color: '#615673' }}>
              {showAll ? 'Ver menos' : 'Ver todas'}
            </ThemedText>
          </Pressable>
        </View>

        {/* Community Cards */}
        <View style={styles.list}>
          {visibleCommunities.map((com) => {
            const isJoined = !!joined[com.id];
            return (
              <View key={com.id} style={styles.communityCard}>
                <Image source={com.image} style={styles.communityImage} contentFit="cover" />
                <View style={styles.communityBody}>
                  <View style={styles.communityHeaderRow}>
                    <ThemedText type="smallBold" style={styles.communityName}>
                      {com.name}
                    </ThemedText>
                    {com.isUserCreated && (
                      <View style={styles.menuWrapper}>
                        <Pressable
                          style={styles.menuBtn}
                          onPress={() => setMenuOpen(menuOpen === com.id ? null : com.id)}
                        >
                          <Ionicons name="ellipsis-horizontal" size={20} color={theme.textSecondary} />
                        </Pressable>
                        {menuOpen === com.id && (
                          <View style={[styles.actionMenu, { backgroundColor: theme.background, borderColor: theme.backgroundElement }]}>
                            <Pressable
                              style={styles.menuItem}
                              onPress={() => {
                                setMenuOpen(null);
                                router.push({ pathname: '/nueva-comunidad', params: { id: com.id } });
                              }}
                            >
                              <Ionicons name="create-outline" size={18} color={theme.text} />
                              <ThemedText type="small">Editar</ThemedText>
                            </Pressable>
                            <Pressable
                              style={styles.menuItem}
                              onPress={() => {
                                setMenuOpen(null);
                                deleteCommunity(com.id);
                              }}
                            >
                              <Ionicons name="trash-outline" size={18} color="#FF6B6B" />
                              <ThemedText type="small" style={{ color: '#FF6B6B' }}>Eliminar</ThemedText>
                            </Pressable>
                          </View>
                        )}
                      </View>
                    )}
                  </View>
                  <ThemedText type="small" themeColor="textSecondary" style={styles.communityDesc} numberOfLines={2}>
                    {com.description}
                  </ThemedText>
                  <View style={styles.communityActions}>
                    <Pressable style={styles.exploreBtn} onPress={() => router.push({ pathname: '/comunidad', params: { name: com.name } })}>
                      <ThemedText type="smallBold" style={{ color: '#615673' }}>
                        Explorar
                      </ThemedText>
                    </Pressable>
                    <Pressable
                      style={[styles.joinBtn, isJoined && styles.joinedBtn]}
                      onPress={() => toggleJoin(com.id)}
                    >
                      <ThemedText type="smallBold" style={{ color: isJoined ? '#615673' : '#FFFFFF' }}>
                        {isJoined ? 'Unido ✓' : 'Unirse'}
                      </ThemedText>
                    </Pressable>
                  </View>
                </View>
              </View>
            );
          })}
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
            <Pressable
              style={[styles.featuredBtn, featuredJoined && styles.joinedBtn]}
              onPress={() => setFeaturedJoined((prev) => !prev)}
            >
              <ThemedText type="smallBold" style={{ color: featuredJoined ? '#615673' : '#FFFFFF' }}>
                {featuredJoined ? 'Unido ✓' : 'Unirse Ahora'}
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
  communityHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuWrapper: {
    position: 'relative',
  },
  menuBtn: {
    padding: Spacing.half,
  },
  actionMenu: {
    position: 'absolute',
    right: 0,
    top: 30,
    borderRadius: 12,
    borderWidth: 1,
    padding: Spacing.one,
    minWidth: 130,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    zIndex: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.two,
    borderRadius: 8,
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
  joinedBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#615673',
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
