import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, ScrollView, Share, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/shared/ui/themed-text';
import { ThemedView } from '@/shared/ui/themed-view';
import { TopBar } from '@/shared/ui/top-bar';
import { BottomTabInset, Spacing } from '@/shared/theme/theme';
import { useTheme } from '@/shared/hooks/use-theme';
import { useComunidadStore } from '@/contexts/comunidad/application/comunidad-store';

const categories = ['Para ti', 'Amigos', 'Arte', 'Tips', 'Frases'];

type Post = {
  id: string;
  user: string;
  category: string;
  tags: string[];
  avatar: string;
  image: string;
  description: string;
  date: string;
  likes: number;
  comments: number;
  isFollowing: boolean;
};

const posts: Post[] = [
  {
    id: '1',
    user: 'Elena.Art',
    category: 'Arte',
    tags: ['#arte', '#creatividad', '#inspiración'],
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80',
    description: 'Esta vez invertimos mil pasos entre pinceles y colores. El arte no es solo lo que ves, sino lo que nace dentro de ti.',
    date: 'Hace 2 horas',
    likes: 124,
    comments: 8,
    isFollowing: false,
  },
  {
    id: '2',
    user: 'Marta.Yoga',
    category: 'Frases',
    tags: ['#frases', '#bienestar', '#motivación'],
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80',
    description: 'Tu crecimiento personal no es una carrera, es un camino. Respira, agradece y observa cómo floreces.',
    date: 'Hace 5 horas',
    likes: 96,
    comments: 14,
    isFollowing: true,
  },
  {
    id: '3',
    user: 'Sofia.Mente',
    category: 'Tips',
    tags: ['#tips', '#autocuidado', '#hábitos'],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
    image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80',
    description: 'Pequeños pasos para grandes cambios. Hoy crea un ritual de autocuidado que te conecte con tu propósito.',
    date: 'Hace 1 día',
    likes: 58,
    comments: 5,
    isFollowing: false,
  },
  {
    id: '4',
    user: 'Carlos.Lens',
    category: 'Arte',
    tags: ['#arte', '#fotografía', '#momentos'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
    description: 'La fotografía es el arte de congelar momentos que el corazón nunca olvida. Cada imagen cuenta una historia única.',
    date: 'Hace 3 días',
    likes: 201,
    comments: 23,
    isFollowing: true,
  },
  {
    id: '5',
    user: 'Lucia.Risos',
    category: 'Amigos',
    tags: ['#amigas', '#amistad', '#buenaonda'],
    avatar: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=100&q=80',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
    description: 'Una tarde entre amigas, risas y recuerdos que se quedan para siempre. Gracias por tanto 💜',
    date: 'Hace 4 días',
    likes: 87,
    comments: 11,
    isFollowing: false,
  },
  {
    id: '6',
    user: 'Ana.Paz',
    category: 'Tips',
    tags: ['#tips', '#rutina', '#mindfulness'],
    avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=100&q=80',
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=900&q=80',
    description: 'Empieza tu mañana con 10 minutos de gratitud y journaling. Tu mente te lo agradecerá todo el día.',
    date: 'Hace 6 días',
    likes: 143,
    comments: 17,
    isFollowing: false,
  },
];

type PostComment = {
  id: string;
  user: string;
  text: string;
};

const postComments: Record<string, PostComment[]> = {
  '1': [
    { id: 'c1', user: 'Ana.Paz', text: 'Me encanta, el arte también me libera 💜' },
    { id: 'c2', user: 'Lucia.Risos', text: 'Qué talento, sigue así!' },
  ],
  '2': [
    { id: 'c1', user: 'Sofia.Mente', text: 'Justo lo que necesitaba leer hoy' },
    { id: 'c2', user: 'Carlos.Lens', text: 'Grandes palabras ✨' },
  ],
  '3': [
    { id: 'c1', user: 'Marta.Yoga', text: 'Gracias por los consejos de siempre' },
    { id: 'c2', user: 'Elena.Art', text: 'Lo pondré en práctica esta semana' },
  ],
  '4': [
    { id: 'c1', user: 'Ana.Paz', text: 'Cada foto tuya cuenta una historia' },
    { id: 'c2', user: 'Lucia.Risos', text: 'Hermosa captura 👏' },
  ],
  '5': [
    { id: 'c1', user: 'Elena.Art', text: 'Qué bonita amistad 💜' },
    { id: 'c2', user: 'Sofia.Mente', text: 'Se nota la buena energía' },
  ],
  '6': [
    { id: 'c1', user: 'Carlos.Lens', text: 'El journaling cambia vidas' },
    { id: 'c2', user: 'Marta.Yoga', text: 'Lo hago cada mañana, funciona' },
  ],
};

export default function InicioScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const { posts: communityPosts } = useComunidadStore();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Para ti');
  const [following, setFollowing] = useState<Record<string, boolean>>(
    Object.fromEntries(posts.map((p) => [p.id, p.isFollowing]))
  );
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [commentText, setCommentText] = useState<Record<string, string>>({});
  const [addedComments, setAddedComments] = useState<Record<string, PostComment[]>>({});

  const feedPosts: Post[] = [
    ...communityPosts
      .filter((p) => p.isMine)
      .map((p) => ({
        id: `feed-${p.id}`,
        user: p.author,
        category: p.tag || 'Tips',
        tags: ['#comunidad', '#valeria'],
        avatar: p.avatar,
        image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=80',
        description: p.content,
        date: p.date,
        likes: p.likes,
        comments: p.comments,
        isFollowing: false,
      })),
    ...posts,
  ];

  const filteredPosts = feedPosts.filter((post) => {
    const matchesCategory =
      activeCategory === 'Para ti' || post.category === activeCategory;
    const normalizedQuery = query.trim().toLowerCase();
    const matchesQuery =
      normalizedQuery === '' ||
      post.user.toLowerCase().includes(normalizedQuery) ||
      post.description.toLowerCase().includes(normalizedQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));
    return matchesCategory && matchesQuery;
  });

  const toggleFollow = (postId: string) => {
    setFollowing((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const onTagPress = (tag: string) => {
    setQuery(tag);
  };

  const toggleLike = (postId: string) => {
    setLiked((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const toggleSave = (postId: string) => {
    setSaved((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const sharePost = async (post: Post) => {
    try {
      await Share.share({
        message: `${post.description}\n— ${post.user} · T'inkisqa`,
      });
    } catch {
      // Compartir cancelado.
    }
  };

  const toggleComments = (postId: string) => {
    setExpanded((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const addComment = (postId: string) => {
    const text = commentText[postId]?.trim();
    if (!text) return;
    setAddedComments((prev) => ({
      ...prev,
      [postId]: [
        ...(prev[postId] ?? []),
        { id: `local-${Date.now()}`, user: 'Tú', text },
      ],
    }));
    setCommentText((prev) => ({ ...prev, [postId]: '' }));
  };

  const commentsFor = (postId: string): PostComment[] => [
    ...(postComments[postId] ?? []),
    ...(addedComments[postId] ?? []),
  ];

  return (
    <ThemedView style={[styles.screen, { backgroundColor: theme.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 16, paddingBottom: BottomTabInset + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Bar */}
        <TopBar />

        {/* Search Bar */}
        <View style={[styles.searchBar, { backgroundColor: theme.backgroundElement }]}>
          <Ionicons name="search" size={20} color={theme.textSecondary} />
          <TextInput
            placeholder="Buscar en la comunidad..."
            placeholderTextColor={theme.textSecondary}
            value={query}
            onChangeText={setQuery}
            style={[styles.searchInput, { color: theme.text }]}
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={20} color={theme.textSecondary} />
            </Pressable>
          )}
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesRow}
        >
          {categories.map((cat) => {
            const selected = activeCategory === cat;
            return (
              <Pressable
                key={cat}
                onPress={() => setActiveCategory(cat)}
                style={[
                  styles.categoryChip,
                  selected && { backgroundColor: '#615673' },
                ]}
              >
                <ThemedText
                  type="smallBold"
                  style={[styles.categoryText, selected && { color: '#FFFFFF' }]}
                >
                  {cat}
                </ThemedText>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Post Feed */}
        <View style={styles.feed}>
          {filteredPosts.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={40} color={theme.textSecondary} />
              <ThemedText type="small" themeColor="textSecondary" style={styles.emptyText}>
                No encontramos publicaciones para tu búsqueda.
              </ThemedText>
            </View>
          ) : (
            filteredPosts.map((post) => {
              const isFollowing = following[post.id];
              const isLiked = !!liked[post.id];
              const isSaved = !!saved[post.id];
              const isExpanded = !!expanded[post.id];
              const commentList = commentsFor(post.id);
              return (
                <View key={post.id} style={[styles.postCard, { backgroundColor: theme.backgroundElement }]}>
                  {/* Post Header */}
                  <View style={styles.postHeader}>
                    <Image source={post.avatar} style={styles.postAvatar} contentFit="cover" />
                    <View style={styles.postUserInfo}>
                      <ThemedText type="smallBold">{post.user}</ThemedText>
                      <ThemedText type="small" themeColor="textSecondary">
                        {post.date}
                      </ThemedText>
                    </View>
                    <Pressable
                      style={({ pressed }) => [
                        styles.followBtn,
                        isFollowing && styles.followingBtn,
                        pressed && styles.followPressed,
                      ]}
                      onPress={() => toggleFollow(post.id)}
                    >
                      <ThemedText
                        type="smallBold"
                        style={[styles.followText, isFollowing && { color: '#FFFFFF' }]}
                      >
                        {isFollowing ? 'Siguiendo' : 'Seguir'}
                      </ThemedText>
                    </Pressable>
                  </View>

                  {/* Post Image */}
                  <Image source={post.image} style={styles.postImage} contentFit="cover" />

                  {/* Action Buttons */}
                  <View style={styles.actionsRow}>
                    <View style={styles.actionsLeft}>
                      <Pressable style={styles.actionBtn} onPress={() => toggleLike(post.id)}>
                        <Ionicons
                          name={isLiked ? 'heart' : 'heart-outline'}
                          size={24}
                          color={isLiked ? '#FF6B8A' : theme.text}
                        />
                      </Pressable>
                      <Pressable style={styles.actionBtn} onPress={() => toggleComments(post.id)}>
                        <Ionicons name="chatbubble-outline" size={22} color={theme.text} />
                      </Pressable>
                      <Pressable style={styles.actionBtn} onPress={() => sharePost(post)}>
                        <Ionicons name="arrow-redo-outline" size={22} color={theme.text} />
                      </Pressable>
                    </View>
                    <Pressable style={styles.actionBtn} onPress={() => toggleSave(post.id)}>
                      <Ionicons
                        name={isSaved ? 'bookmark' : 'bookmark-outline'}
                        size={22}
                        color={isSaved ? '#615673' : theme.text}
                      />
                    </Pressable>
                  </View>

                  {/* Likes */}
                  <ThemedText type="smallBold" style={styles.likesText}>
                    {post.likes + (isLiked ? 1 : 0)} Me gusta
                  </ThemedText>

                  {/* Description */}
                  <ThemedText style={styles.descriptionText}>
                    <ThemedText type="smallBold">{post.user} </ThemedText>
                    {post.description}
                  </ThemedText>

                  {/* Hashtags */}
                  <View style={styles.tagsRow}>
                    {post.tags.map((tag) => (
                      <Pressable key={tag} onPress={() => onTagPress(tag)}>
                        <ThemedText type="smallBold" style={styles.tagText}>
                          {tag}
                        </ThemedText>
                      </Pressable>
                    ))}
                  </View>

                  {/* Comments link */}
                  <Pressable onPress={() => toggleComments(post.id)}>
                    <ThemedText type="small" themeColor="textSecondary">
                      {isExpanded
                        ? 'Ocultar comentarios'
                        : `Ver los ${post.comments + (addedComments[post.id]?.length ?? 0)} comentarios`}
                    </ThemedText>
                  </Pressable>

                  {/* Expanded comments */}
                  {isExpanded && (
                    <View style={styles.commentsSection}>
                      {commentList.map((comment) => (
                        <View key={comment.id} style={styles.commentRow}>
                          <View style={styles.commentAvatar}>
                            <ThemedText type="smallBold" style={styles.commentAvatarText}>
                              {comment.user.charAt(0)}
                            </ThemedText>
                          </View>
                          <View style={styles.commentBubble}>
                            <ThemedText type="smallBold" style={styles.commentUser}>
                              {comment.user}
                            </ThemedText>
                            <ThemedText type="small" themeColor="textSecondary">
                              {comment.text}
                            </ThemedText>
                          </View>
                        </View>
                      ))}
                      <View style={styles.commentInputRow}>
                        <TextInput
                          placeholder="Escribe un comentario..."
                          placeholderTextColor={theme.textSecondary}
                          value={commentText[post.id] ?? ''}
                          onChangeText={(text) =>
                            setCommentText((prev) => ({ ...prev, [post.id]: text }))
                          }
                          style={[styles.commentInput, { color: theme.text, backgroundColor: theme.backgroundElement }]}
                        />
                        <Pressable
                          style={({ pressed }) => [styles.commentSend, pressed && styles.commentSendPressed]}
                          onPress={() => addComment(post.id)}
                        >
                          <Ionicons name="send" size={18} color="#FFFFFF" />
                        </Pressable>
                      </View>
                    </View>
                  )}
                </View>
              );
            })
          )}
        </View>
      </ScrollView>

      {/* Floating "+" Button */}
      <Pressable style={styles.fab} onPress={() => router.push('/nueva-publicacion')}>
        <Ionicons name="add" size={30} color="#FFFFFF" />
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: Spacing.three,
    height: 48,
    gap: Spacing.two,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
  },
  categoriesRow: {
    gap: Spacing.two,
    paddingVertical: Spacing.one,
  },
  categoryChip: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: 999,
    backgroundColor: '#F0F0F3',
  },
  categoryText: {
    color: '#60646C',
  },
  feed: {
    gap: Spacing.four,
  },
  emptyState: {
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.five,
  },
  emptyText: {
    textAlign: 'center',
  },
  postCard: {
    borderRadius: 24,
    padding: Spacing.three,
    gap: Spacing.two,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  postAvatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
  },
  postUserInfo: {
    flex: 1,
    gap: 2,
  },
  followBtn: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one + 2,
    borderRadius: 999,
    backgroundColor: '#F5F0FF',
  },
  followingBtn: {
    backgroundColor: '#615673',
  },
  followPressed: {
    opacity: 0.8,
  },
  followText: {
    color: '#615673',
  },
  postImage: {
    width: '100%',
    aspectRatio: 16 / 10,
    borderRadius: 20,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  actionBtn: {
    padding: Spacing.half,
  },
  likesText: {
    marginTop: Spacing.half,
  },
  descriptionText: {
    lineHeight: 21,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  tagText: {
    color: '#615673',
  },
  commentsSection: {
    gap: Spacing.two,
  },
  commentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.two,
  },
  commentAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F5F0FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentAvatarText: {
    color: '#615673',
    fontSize: 12,
  },
  commentBubble: {
    flex: 1,
    gap: 2,
  },
  commentUser: {
    fontSize: 13,
  },
  commentInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    marginTop: Spacing.one,
  },
  commentInput: {
    flex: 1,
    borderRadius: 999,
    paddingHorizontal: Spacing.three,
    height: 40,
    fontSize: 14,
  },
  commentSend: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#615673',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentSendPressed: {
    opacity: 0.8,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: BottomTabInset + 24,
    width: 56,
    height: 56,
    borderRadius: 16,
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
