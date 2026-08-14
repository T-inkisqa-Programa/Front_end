import { useState } from 'react';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAppStore } from '@/lib/app-store';

const filterTabs = ['Populares', 'Recientes', 'Mis Ideas'];

export default function ComunidadScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const { name } = useLocalSearchParams<{ name: string }>();
  const { posts, deletePost, togglePostLike, unlikePost, togglePostSave } = useAppStore();
  const [activeFilter, setActiveFilter] = useState('Populares');
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const toggleLike = (postId: string) => {
    const next = !liked[postId];
    setLiked((prev) => ({ ...prev, [postId]: next }));
    if (next) {
      togglePostLike(postId);
    } else {
      unlikePost(postId);
    }
  };

  const communityName = name || 'Adolescentes';

  const visiblePosts = [...posts]
    .sort((a, b) => {
      if (activeFilter === 'Populares') return b.likes - a.likes;
      if (activeFilter === 'Recientes') return a.minutesAgo - b.minutesAgo;
      return 0;
    })
    .filter((p) => activeFilter !== 'Mis Ideas' || p.isMine);

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
        <View style={styles.topBar}>
          <Pressable style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={theme.text} />
          </Pressable>
          <ThemedText type="smallBold" style={styles.topTitle}>
            {communityName}
          </ThemedText>
          <View style={{ width: 40 }} />
        </View>

        {/* Header */}
        <View style={styles.headerSection}>
          <ThemedText type="title" style={styles.communityTitle}>
            {communityName}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.communityDesc}>
            Un espacio seguro para compartir dudas, sueños y experiencias entre chicas. Aquí todas tenemos una voz que merece ser escuchada.
          </ThemedText>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterRow}>
          {filterTabs.map((tab) => {
            const active = activeFilter === tab;
            return (
              <Pressable
                key={tab}
                onPress={() => setActiveFilter(tab)}
                style={[styles.filterTab, active && styles.filterTabActive]}
              >
                <ThemedText
                  type="small"
                  style={[styles.filterTabText, active && { color: '#FFFFFF' }]}
                >
                  {tab}
                </ThemedText>
              </Pressable>
            );
          })}
        </View>

        {/* Posts */}
        <View style={styles.postList}>
          {visiblePosts.map((post) => {
            const isLiked = !!liked[post.id];
            const isSaved = post.saved;
            return (
              <View key={post.id} style={styles.postCard}>
                {/* Post Header */}
                <View style={styles.postHeader}>
                  <Image source={post.avatar} style={styles.postAvatar} contentFit="cover" />
                  <View style={styles.postHeaderInfo}>
                    <View style={styles.postHeaderTop}>
                      <ThemedText type="smallBold">{post.author}</ThemedText>
                      {post.tag ? (
                        <View style={styles.tagBadge}>
                          <ThemedText type="small" style={{ color: '#615673', fontSize: 11 }}>
                            {post.tag}
                          </ThemedText>
                        </View>
                      ) : null}
                    </View>
                    <ThemedText type="small" themeColor="textSecondary">
                      {post.date}
                    </ThemedText>
                  </View>
                  {post.isMine && (
                    <View style={styles.menuWrapper}>
                      <Pressable
                        style={styles.menuBtn}
                        onPress={() => setMenuOpen(menuOpen === post.id ? null : post.id)}
                      >
                        <Ionicons name="ellipsis-horizontal" size={20} color={theme.textSecondary} />
                      </Pressable>
                      {menuOpen === post.id && (
                        <View style={[styles.actionMenu, { backgroundColor: theme.background, borderColor: theme.backgroundElement }]}>
                          <Pressable
                            style={styles.menuItem}
                            onPress={() => {
                              setMenuOpen(null);
                              router.push({ pathname: '/nueva-publicacion', params: { id: post.id } });
                            }}
                          >
                            <Ionicons name="create-outline" size={18} color={theme.text} />
                            <ThemedText type="small">Editar</ThemedText>
                          </Pressable>
                          <Pressable
                            style={styles.menuItem}
                            onPress={() => {
                              setMenuOpen(null);
                              deletePost(post.id);
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

                {/* Post Content */}
                {post.isQuote ? (
                  <View style={[styles.quoteBox, { backgroundColor: theme.backgroundElement }]}>
                    <ThemedText style={styles.quoteText}>
                      {post.content}
                    </ThemedText>
                  </View>
                ) : (
                  <ThemedText style={styles.postContent}>
                    {post.content}
                  </ThemedText>
                )}

                {/* Post Actions */}
                <View style={styles.postActions}>
                  <View style={styles.postActionsLeft}>
                    <Pressable style={styles.actionItem} onPress={() => toggleLike(post.id)}>
                      <Ionicons
                        name={isLiked ? 'heart' : 'heart-outline'}
                        size={18}
                        color={isLiked ? '#FF6B8A' : theme.textSecondary}
                      />
                      <ThemedText type="small" style={isLiked ? { color: '#FF6B8A' } : undefined}>
                        {post.likes}
                      </ThemedText>
                    </Pressable>
                    <View style={styles.actionItem}>
                      <Ionicons name="chatbubble-outline" size={18} color={theme.textSecondary} />
                      <ThemedText type="small" themeColor="textSecondary">
                        {post.comments}
                      </ThemedText>
                    </View>
                  </View>
                  <Pressable onPress={() => togglePostSave(post.id)}>
                    <Ionicons
                      name={isSaved ? 'bookmark' : 'bookmark-outline'}
                      size={20}
                      color={isSaved ? '#615673' : theme.textSecondary}
                    />
                  </Pressable>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* FAB */}
      <Pressable style={styles.fab} onPress={() => router.push('/nueva-publicacion')}>
        <Ionicons name="pencil" size={24} color="#FFFFFF" />
      </Pressable>
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
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topTitle: {
    fontSize: 16,
  },
  headerSection: {
    gap: Spacing.one,
  },
  communityTitle: {
    fontSize: 28,
  },
  communityDesc: {
    lineHeight: 20,
  },
  filterRow: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F3',
    borderRadius: 14,
    padding: 4,
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
  filterTabText: {
    color: '#60646C',
  },
  postList: {
    gap: Spacing.three,
  },
  postCard: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    padding: Spacing.three,
    gap: Spacing.three,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  postAvatar: {
    width: 42,
    height: 42,
    borderRadius: 14,
  },
  postHeaderInfo: {
    flex: 1,
    gap: 2,
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
    top: 28,
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
  postHeaderTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  tagBadge: {
    paddingHorizontal: Spacing.two,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: '#F5F0FF',
  },
  postContent: {
    lineHeight: 22,
  },
  quoteBox: {
    borderRadius: 14,
    padding: Spacing.three,
    borderLeftWidth: 3,
    borderLeftColor: '#615673',
  },
  quoteText: {
    lineHeight: 22,
    fontStyle: 'italic',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postActionsLeft: {
    flexDirection: 'row',
    gap: Spacing.four,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: BottomTabInset + 100,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#615673',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#615673',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
});
