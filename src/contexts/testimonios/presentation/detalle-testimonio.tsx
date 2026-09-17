import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/shared/ui/themed-text';
import { ThemedView } from '@/shared/ui/themed-view';
import { BottomTabInset, Spacing } from '@/shared/theme/theme';
import { useTheme } from '@/shared/hooks/use-theme';
import { useTestimoniosStore } from '@/contexts/testimonios/application/testimonios-store';
import type { TestimonioComment } from '@/contexts/testimonios/domain/testimonio';

export default function DetalleTestimonioScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { testimonios, getTestimonioById, toggleTestimonioSave, likeTestimonio, unlikeTestimonio } = useTestimoniosStore();

  const testimonio = getTestimonioById(id ?? '') ?? testimonios[0];

  useEffect(() => {
    if (id && !getTestimonioById(id)) {
      router.back();
    }
  }, [id, getTestimonioById, router]);

  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<TestimonioComment[]>(testimonio.comments);
  const [commentText, setCommentText] = useState('');
  const commentInputRef = useRef<TextInput>(null);

  const focusComment = () => {
    commentInputRef.current?.focus();
  };

  const toggleLike = () => {
    setLiked((prev) => {
      if (prev) {
        unlikeTestimonio(testimonio.id);
      } else {
        likeTestimonio(testimonio.id);
      }
      return !prev;
    });
  };

  const addComment = () => {
    const trimmed = commentText.trim();
    if (!trimmed) return;
    setComments((prev) => [
      ...prev,
      { id: `local-${Date.now()}`, age: 24, time: 'Ahora mismo', text: trimmed },
    ]);
    setCommentText('');
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
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </Pressable>
        <ThemedText type="smallBold" style={styles.headerTitle}>
          Testimonio
        </ThemedText>
        <Pressable
          hitSlop={8}
          style={({ pressed }) => [styles.headerBtn, pressed && styles.pressed]}
          onPress={() => toggleTestimonioSave(testimonio.id)}
        >
          <Ionicons
            name={testimonio.saved ? 'bookmark' : 'bookmark-outline'}
            size={22}
            color={testimonio.saved ? '#615673' : theme.textSecondary}
          />
        </Pressable>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: BottomTabInset + 24 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Testimonial card */}
        <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
          <View style={styles.authorRow}>
            <View style={styles.avatar}>
              <ThemedText type="smallBold" style={styles.avatarText}>
                {testimonio.age}
              </ThemedText>
            </View>
            <View style={styles.authorInfo}>
              <ThemedText type="smallBold" style={styles.authorName}>
                Anónima · {testimonio.age} años
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {testimonio.time}
              </ThemedText>
            </View>
            {testimonio.mood ? (
              <View
                style={[
                  styles.moodChip,
                  { backgroundColor: testimonio.mood.color + '18' },
                ]}
              >
                <ThemedText style={styles.moodEmoji}>{testimonio.mood.emoji}</ThemedText>
                <ThemedText type="smallBold" style={[styles.moodLabel, { color: testimonio.mood.color }]}>
                  {testimonio.mood.label}
                </ThemedText>
              </View>
            ) : null}
          </View>

          <ThemedText type="smallBold" style={styles.title}>
            {testimonio.title}
          </ThemedText>

          <ThemedText themeColor="textSecondary" style={styles.text}>
            {testimonio.text}
          </ThemedText>

          <View style={styles.divider} />

          {/* Actions */}
          <View style={styles.actions}>
            <Pressable
              style={({ pressed }) => [styles.action, pressed && styles.pressed]}
              onPress={toggleLike}
            >
              <Ionicons
                name={liked ? 'heart' : 'heart-outline'}
                size={22}
                color={liked ? '#FF6B8A' : theme.text}
              />
              <ThemedText type="small" style={liked ? { color: '#FF6B8A' } : undefined}>
                Agradecer · {testimonio.likes}
              </ThemedText>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.action, pressed && styles.pressed]}
              onPress={focusComment}
            >
              <Ionicons name="chatbubble-outline" size={20} color={theme.text} />
              <ThemedText type="small" themeColor="textSecondary">
                {comments.length} comentarios
              </ThemedText>
            </Pressable>
          </View>
        </View>

        {/* Comments */}
        <View style={styles.commentsSection}>
          <ThemedText type="smallBold" style={styles.commentsTitle}>
            Comentarios ({comments.length})
          </ThemedText>

          <View style={styles.commentsList}>
            {comments.map((comment) => (
              <View
                key={comment.id}
                style={[styles.commentCard, { backgroundColor: theme.backgroundElement }]}
              >
                <View style={styles.commentAvatar}>
                  <ThemedText type="smallBold" style={styles.commentAvatarText}>
                    {comment.age}
                  </ThemedText>
                </View>
                <View style={styles.commentBody}>
                  <View style={styles.commentMeta}>
                    <ThemedText type="smallBold" style={styles.commentName}>
                      Anónima · {comment.age} años
                    </ThemedText>
                    <ThemedText type="small" themeColor="textSecondary">
                      {comment.time}
                    </ThemedText>
                  </View>
                  <ThemedText type="small" themeColor="textSecondary" style={styles.commentText}>
                    {comment.text}
                  </ThemedText>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Comment input */}
      <View style={[styles.commentBar, { paddingBottom: insets.bottom + BottomTabInset + 8 }]}>
        <View style={[styles.commentInputWrap, { backgroundColor: theme.backgroundElement }]}>
          <TextInput
            ref={commentInputRef}
            placeholder="Deja un comentario..."
            placeholderTextColor={theme.textSecondary}
            value={commentText}
            onChangeText={setCommentText}
            style={[styles.commentInput, { color: theme.text }]}
          />
          <Pressable
            hitSlop={8}
            style={({ pressed }) => [styles.sendBtn, pressed && styles.pressed]}
            onPress={addComment}
          >
            <Ionicons name="send" size={20} color="#FFFFFF" />
          </Pressable>
        </View>
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
  card: {
    borderRadius: 20,
    padding: Spacing.three,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
    gap: Spacing.two,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F5F0FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#615673',
    fontSize: 16,
  },
  authorInfo: {
    flex: 1,
    gap: 2,
  },
  authorName: {
    fontSize: 14,
  },
  moodChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.two,
    borderRadius: 999,
  },
  moodEmoji: {
    fontSize: 14,
  },
  moodLabel: {
    fontSize: 12,
  },
  title: {
    fontSize: 19,
    lineHeight: 26,
  },
  text: {
    fontSize: 15,
    lineHeight: 24,
  },
  divider: {
    height: 1,
    backgroundColor: '#EEECF2',
    marginVertical: Spacing.one,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.five,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingVertical: Spacing.one,
  },
  commentsSection: {
    gap: Spacing.two,
  },
  commentsTitle: {
    fontSize: 17,
  },
  commentsList: {
    gap: Spacing.two,
  },
  commentCard: {
    flexDirection: 'row',
    gap: Spacing.two,
    borderRadius: 16,
    padding: Spacing.three,
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F0FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentAvatarText: {
    color: '#615673',
    fontSize: 13,
  },
  commentBody: {
    flex: 1,
    gap: 4,
  },
  commentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  commentName: {
    fontSize: 13,
  },
  commentText: {
    lineHeight: 18,
  },
  commentBar: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
  },
  commentInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    borderRadius: 999,
    paddingLeft: Spacing.three,
    paddingRight: Spacing.one,
    paddingVertical: Spacing.one,
  },
  commentInput: {
    flex: 1,
    fontSize: 15,
    paddingVertical: Spacing.one,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#615673',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
