import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/shared/ui/themed-text';
import { ThemedView } from '@/shared/ui/themed-view';
import { TopBar } from '@/shared/ui/top-bar';
import { BottomTabInset, Spacing } from '@/shared/theme/theme';
import { useTheme } from '@/shared/hooks/use-theme';
import { useForosStore } from '@/contexts/foros/application/foros-store';
import { useComunidadStore } from '@/contexts/comunidad/application/comunidad-store';
import { useArticulosStore } from '@/contexts/contenido/application/articulos-store';
import { useTestimoniosStore } from '@/contexts/testimonios/application/testimonios-store';

type PublicationRow = {
  id: string;
  kind: 'testimonio' | 'articulo' | 'publicacion' | 'comunidad';
  title: string;
  subtitle: string;
};

export default function PerfilScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const { articles, deleteArticle } = useArticulosStore();
  const { testimonios, deleteTestimonio } = useTestimoniosStore();
  const { communities, deleteCommunity } = useForosStore();
  const { posts, deletePost } = useComunidadStore();

  const mineTestimonios = testimonios.filter((t) => t.id.startsWith('user-'));
  const mineArticles = articles.filter((a) => a.id.startsWith('user-'));
  const minePosts = posts.filter((p) => p.id.startsWith('user-'));
  const mineCommunities = communities.filter((c) => c.isUserCreated);

  const myPublications: PublicationRow[] = [
    ...mineArticles.map((a) => ({ id: a.id, kind: 'articulo' as const, title: a.title, subtitle: `Artículo · ${a.category}` })),
    ...mineTestimonios.map((t) => ({ id: t.id, kind: 'testimonio' as const, title: t.title, subtitle: 'Testimonio anónimo' })),
    ...minePosts.map((p) => ({ id: p.id, kind: 'publicacion' as const, title: p.content.slice(0, 60), subtitle: 'Publicación en comunidad' })),
    ...mineCommunities.map((c) => ({ id: c.id, kind: 'comunidad' as const, title: c.name, subtitle: 'Comunidad' })),
  ];

  const savedCount =
    articles.filter((a) => a.saved).length +
    testimonios.filter((t) => t.saved).length +
    posts.filter((p) => p.saved).length;

  const editPublication = (row: PublicationRow) => {
    if (row.kind === 'articulo') {
      router.push({ pathname: '/crear-articulo', params: { id: row.id } });
    } else if (row.kind === 'testimonio') {
      router.push({ pathname: '/crear-testimonio', params: { id: row.id } });
    } else if (row.kind === 'publicacion') {
      router.push({ pathname: '/nueva-publicacion', params: { id: row.id } });
    } else {
      router.push({ pathname: '/nueva-comunidad', params: { id: row.id } });
    }
  };

  const deletePublication = (row: PublicationRow) => {
    if (row.kind === 'articulo') deleteArticle(row.id);
    else if (row.kind === 'testimonio') deleteTestimonio(row.id);
    else if (row.kind === 'publicacion') deletePost(row.id);
    else deleteCommunity(row.id);
  };

  const openPublication = (row: PublicationRow) => {
    if (row.kind === 'articulo') {
      router.push({ pathname: '/detalle-articulo', params: { id: row.id } });
    } else if (row.kind === 'testimonio') {
      router.push({ pathname: '/detalle-testimonio', params: { id: row.id } });
    } else if (row.kind === 'comunidad') {
      router.push({ pathname: '/comunidad', params: { name: row.title } });
    }
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
        <TopBar />

        {/* Profile header */}
        <View style={styles.profileHeader}>
          <Image
            source="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
            style={styles.avatar}
            contentFit="cover"
          />
          <ThemedText type="title" style={styles.name}>
            Valeria M.
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            @valeria.m · Miembro de la comunidad
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.bio}>
            Comparto experiencias, aprendo de otras mujeres y me sumo a iniciativas que me hacen crecer.
          </ThemedText>
        </View>

        {/* Stats */}
        <View style={[styles.statsRow, { backgroundColor: theme.backgroundElement }]}>
          <View style={styles.statItem}>
            <ThemedText type="smallBold" style={styles.statNumber}>
              {myPublications.length}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Publicaciones
            </ThemedText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <ThemedText type="smallBold" style={styles.statNumber}>
              {savedCount}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Guardados
            </ThemedText>
          </View>
          <View style={styles.statDivider} />
          <Pressable style={styles.statItem} onPress={() => router.push('/racha')}>
            <ThemedText type="smallBold" style={styles.statNumber}>
              7
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Racha (días)
            </ThemedText>
          </Pressable>
        </View>

        {/* My publications */}
        <View style={styles.section}>
          <ThemedText type="smallBold" style={styles.sectionTitle}>
            Mis publicaciones
          </ThemedText>
          {myPublications.length === 0 ? (
            <View style={[styles.emptyBox, { backgroundColor: theme.backgroundElement }]}>
              <Ionicons name="create-outline" size={28} color={theme.textSecondary} />
              <ThemedText type="small" themeColor="textSecondary" style={styles.emptyText}>
                Aún no has publicado nada. Crea un testimonio, artículo o publicación para verlo aquí.
              </ThemedText>
            </View>
          ) : (
            <View style={styles.list}>
              {myPublications.map((row) => (
                <Pressable
                  key={row.id}
                  style={[styles.publicationCard, { backgroundColor: theme.backgroundElement }]}
                  onPress={() => openPublication(row)}
                >
                  <View style={styles.publicationInfo}>
                    <ThemedText type="smallBold" numberOfLines={1}>
                      {row.title}
                    </ThemedText>
                    <ThemedText type="small" themeColor="textSecondary">
                      {row.subtitle}
                    </ThemedText>
                  </View>
                  <Pressable hitSlop={8} style={styles.rowAction} onPress={() => editPublication(row)}>
                    <Ionicons name="create-outline" size={20} color="#615673" />
                  </Pressable>
                  <Pressable hitSlop={8} style={styles.rowAction} onPress={() => deletePublication(row)}>
                    <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
                  </Pressable>
                </Pressable>
              ))}
            </View>
          )}
        </View>

        {/* Saved */}
        <View style={styles.section}>
          <ThemedText type="smallBold" style={styles.sectionTitle}>
            Guardados
          </ThemedText>
          {savedCount === 0 ? (
            <View style={[styles.emptyBox, { backgroundColor: theme.backgroundElement }]}>
              <Ionicons name="bookmark-outline" size={28} color={theme.textSecondary} />
              <ThemedText type="small" themeColor="textSecondary" style={styles.emptyText}>
                Los artículos, testimonios y publicaciones que guardes aparecerán aquí.
              </ThemedText>
            </View>
          ) : (
            <View style={styles.list}>
              {articles
                .filter((a) => a.saved)
                .map((a) => (
                  <Pressable
                    key={a.id}
                    style={[styles.publicationCard, { backgroundColor: theme.backgroundElement }]}
                    onPress={() => router.push({ pathname: '/detalle-articulo', params: { id: a.id } })}
                  >
                    <View style={styles.publicationInfo}>
                      <ThemedText type="smallBold" numberOfLines={1}>
                        {a.title}
                      </ThemedText>
                      <ThemedText type="small" themeColor="textSecondary">
                        Artículo · {a.category}
                      </ThemedText>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={theme.textSecondary} />
                  </Pressable>
                ))}
              {testimonios
                .filter((t) => t.saved)
                .map((t) => (
                  <Pressable
                    key={t.id}
                    style={[styles.publicationCard, { backgroundColor: theme.backgroundElement }]}
                    onPress={() => router.push({ pathname: '/detalle-testimonio', params: { id: t.id } })}
                  >
                    <View style={styles.publicationInfo}>
                      <ThemedText type="smallBold" numberOfLines={1}>
                        {t.title}
                      </ThemedText>
                      <ThemedText type="small" themeColor="textSecondary">
                        Testimonio anónimo
                      </ThemedText>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={theme.textSecondary} />
                  </Pressable>
                ))}
              {posts
                .filter((p) => p.saved)
                .map((p) => (
                  <View key={p.id} style={[styles.publicationCard, { backgroundColor: theme.backgroundElement }]}>
                    <View style={styles.publicationInfo}>
                      <ThemedText type="smallBold" numberOfLines={1}>
                        {p.content.slice(0, 60)}
                      </ThemedText>
                      <ThemedText type="small" themeColor="textSecondary">
                        Publicación en comunidad
                      </ThemedText>
                    </View>
                  </View>
                ))}
            </View>
          )}
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
    gap: Spacing.four,
  },
  profileHeader: {
    alignItems: 'center',
    gap: Spacing.one,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    marginBottom: Spacing.one,
  },
  name: {
    fontSize: 22,
  },
  bio: {
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: Spacing.four,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: Spacing.three,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  statNumber: {
    fontSize: 18,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: '#E5E5EA',
  },
  section: {
    gap: Spacing.two,
  },
  sectionTitle: {
    fontSize: 16,
  },
  list: {
    gap: Spacing.two,
  },
  publicationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    borderRadius: 16,
    padding: Spacing.three,
  },
  publicationInfo: {
    flex: 1,
    gap: 2,
  },
  rowAction: {
    padding: Spacing.half,
  },
  emptyBox: {
    alignItems: 'center',
    gap: Spacing.two,
    borderRadius: 20,
    padding: Spacing.four,
  },
  emptyText: {
    textAlign: 'center',
    lineHeight: 18,
  },
});
