import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TopBar } from '@/components/top-bar';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const categories = [
  'Para ti', 'Amigos', 'Arte', 'Tips', 'Frases',
];

const posts = [
  {
    id: '1',
    user: 'Elena.Art',
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
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
    description: 'La fotografía es el arte de congelar momentos que el corazón nunca olvida. Cada imagen cuenta una historia única.',
    date: 'Hace 3 días',
    likes: 201,
    comments: 23,
    isFollowing: true,
  },
];

export default function InicioScreen() {
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

        {/* Search Bar */}
        <View style={[styles.searchBar, { backgroundColor: theme.backgroundElement }]}>
          <Ionicons name="search" size={20} color={theme.textSecondary} />
          <TextInput
            placeholder="Buscar en la comunidad..."
            placeholderTextColor={theme.textSecondary}
            style={[styles.searchInput, { color: theme.text }]}
          />
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesRow}
        >
          {categories.map((cat, index) => {
            const selected = index === 0;
            return (
              <Pressable
                key={cat}
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
          {posts.map((post) => (
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
                    post.isFollowing && styles.followingBtn,
                    pressed && styles.followPressed,
                  ]}
                >
                  <ThemedText
                    type="smallBold"
                    style={[styles.followText, post.isFollowing && { color: '#FFFFFF' }]}
                  >
                    {post.isFollowing ? 'Siguiendo' : 'Seguir'}
                  </ThemedText>
                </Pressable>
              </View>

              {/* Post Image */}
              <Image source={post.image} style={styles.postImage} contentFit="cover" />

              {/* Action Buttons */}
              <View style={styles.actionsRow}>
                <View style={styles.actionsLeft}>
                  <Pressable style={styles.actionBtn}>
                    <Ionicons name="heart-outline" size={24} color={theme.text} />
                  </Pressable>
                  <Pressable style={styles.actionBtn}>
                    <Ionicons name="chatbubble-outline" size={22} color={theme.text} />
                  </Pressable>
                  <Pressable style={styles.actionBtn}>
                    <Ionicons name="arrow-redo-outline" size={22} color={theme.text} />
                  </Pressable>
                </View>
                <Pressable style={styles.actionBtn}>
                  <Ionicons name="bookmark-outline" size={22} color={theme.text} />
                </Pressable>
              </View>

              {/* Likes */}
              <ThemedText type="smallBold" style={styles.likesText}>
                {post.likes} Me gusta
              </ThemedText>

              {/* Description */}
              <ThemedText style={styles.descriptionText}>
                <ThemedText type="smallBold">{post.user} </ThemedText>
                {post.description}
              </ThemedText>

              {/* Comments link */}
              <Pressable>
                <ThemedText type="small" themeColor="textSecondary">
                  Ver los {post.comments} comentarios
                </ThemedText>
              </Pressable>
            </View>
          ))}
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
});
