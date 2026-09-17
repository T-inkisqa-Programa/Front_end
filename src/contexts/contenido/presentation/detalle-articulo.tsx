import { useCallback, useEffect, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/shared/ui/themed-text';
import { ThemedView } from '@/shared/ui/themed-view';
import { BottomTabInset, Spacing } from '@/shared/theme/theme';
import { useTheme } from '@/shared/hooks/use-theme';
import { useArticulosStore } from '@/contexts/contenido/application/articulos-store';

export default function DetalleArticuloScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { articles, getArticleById, toggleArticleSave } = useArticulosStore();

  const article = getArticleById(id ?? '') ?? articles[0];
  const audioTotal = article.audioMinutes * 60;

  useEffect(() => {
    if (id && !getArticleById(id)) {
      router.back();
    }
  }, [id, getArticleById, router]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);

  const seek = useCallback(
    (target: number) => {
      const bounded = Math.min(Math.max(target, 0), audioTotal);
      currentRef.current = bounded;
      setCurrent(bounded);
    },
    [audioTotal]
  );

  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => {
      if (currentRef.current >= audioTotal) {
        setIsPlaying(false);
        return;
      }
      seek(currentRef.current + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [isPlaying, audioTotal, seek]);

  const togglePlay = () => {
    if (current >= audioTotal) {
      seek(0);
      setIsPlaying(true);
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = `${(current / audioTotal) * 100}%` as `${number}%`;

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
        {/* Top Row */}
        <View style={styles.topRow}>
          <Pressable
            hitSlop={8}
            style={({ pressed }) => [styles.backBtn, pressed && styles.backPressed]}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={theme.text} />
          </Pressable>
          <Pressable style={styles.topRightBtn} onPress={() => toggleArticleSave(article.id)}>
            <Ionicons
              name={article.saved ? 'bookmark' : 'bookmark-outline'}
              size={22}
              color={article.saved ? '#615673' : theme.text}
            />
          </Pressable>
        </View>

        {/* Category + Author */}
        <View style={styles.categoryChip}>
          <Ionicons name="heart-outline" size={14} color="#EC4899" />
          <ThemedText type="smallBold" style={styles.categoryText}>
            {article.category}
          </ThemedText>
        </View>

        <View style={styles.authorRow}>
          <Image
            source={article.authorPhoto}
            style={styles.authorPhoto}
            contentFit="cover"
          />
          <View style={styles.authorInfo}>
            <ThemedText type="smallBold" style={styles.authorName}>
              {article.author}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {article.authorRole} · {article.readTime} de lectura
            </ThemedText>
          </View>
        </View>

        {/* Main Title */}
        <ThemedText type="title" style={styles.mainTitle}>
          {article.title}
        </ThemedText>

        {/* Content Blocks */}
        <View style={styles.body}>
          {article.blocks.map((block, idx) => {
            if (block.type === 'heading') {
              return (
                <ThemedText key={idx} type="smallBold" style={styles.blockHeading}>
                  {block.text}
                </ThemedText>
              );
            }
            if (block.type === 'image') {
              return (
                <Image
                  key={idx}
                  source={block.uri}
                  style={styles.blockImage}
                  contentFit="cover"
                />
              );
            }
            if (block.type === 'quote') {
              return (
                <View key={idx} style={styles.blockQuote}>
                  <Ionicons name="chatbubble-ellipses" size={18} color="#615673" />
                  <ThemedText style={styles.blockQuoteText}>
                    {block.text}
                  </ThemedText>
                </View>
              );
            }
            return (
              <ThemedText key={idx} type="small" style={styles.blockParagraph}>
                {block.text}
              </ThemedText>
            );
          })}
        </View>

        {/* Audio Player */}
        <View style={styles.playerCard}>
          <View style={styles.playerHeader}>
            <View style={styles.playerIconWrap}>
              <Ionicons name="musical-notes" size={22} color="#615673" />
            </View>
            <View style={styles.playerTitleGroup}>
              <ThemedText type="smallBold">Escucha este artículo</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                Narrado por {article.author} · {article.audioMinutes} min
              </ThemedText>
            </View>
          </View>

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: progress }]} />
          </View>
          <View style={styles.progressLabels}>
            <ThemedText type="small" themeColor="textSecondary" style={styles.timeText}>
              {formatTime(current)}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary" style={styles.timeText}>
              {formatTime(audioTotal)}
            </ThemedText>
          </View>

          <View style={styles.controls}>
            <Pressable style={styles.controlBtn} onPress={() => seek(currentRef.current - 15)}>
              <Ionicons name="play-back-outline" size={26} color="#615673" />
            </Pressable>
            <Pressable style={styles.playBtn} onPress={togglePlay}>
              <Ionicons
                name={isPlaying ? 'pause' : 'play'}
                size={30}
                color="#FFFFFF"
                style={isPlaying ? undefined : styles.playIconOffset}
              />
            </Pressable>
            <Pressable style={styles.controlBtn} onPress={() => seek(currentRef.current + 15)}>
              <Ionicons name="play-forward-outline" size={26} color="#615673" />
            </Pressable>
          </View>
          <ThemedText type="small" themeColor="textSecondary" style={styles.skipHint}>
            Retroceder y avanzar 15 segundos
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
  },
  topRow: {
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
  backPressed: {
    opacity: 0.7,
  },
  topRightBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: Spacing.one,
    backgroundColor: '#FCE7F3',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: 999,
  },
  categoryText: {
    color: '#EC4899',
    fontSize: 12,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  authorPhoto: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  authorInfo: {
    gap: 2,
  },
  authorName: {
    fontSize: 16,
  },
  mainTitle: {
    fontSize: 26,
    lineHeight: 34,
  },
  body: {
    gap: Spacing.three,
  },
  blockHeading: {
    fontSize: 18,
    marginTop: Spacing.two,
  },
  blockParagraph: {
    lineHeight: 24,
  },
  blockImage: {
    width: '100%',
    height: 200,
    borderRadius: 20,
  },
  blockQuote: {
    flexDirection: 'row',
    gap: Spacing.two,
    padding: Spacing.three,
    borderRadius: 14,
    backgroundColor: '#F5F0FF',
    alignItems: 'flex-start',
  },
  blockQuoteText: {
    flex: 1,
    fontStyle: 'italic',
    lineHeight: 22,
    color: '#615673',
  },
  playerCard: {
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    padding: Spacing.four,
    gap: Spacing.three,
    marginTop: Spacing.two,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  playerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  playerIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#F5F0FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerTitleGroup: {
    gap: 2,
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F0F0F3',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#615673',
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: 12,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.five,
  },
  controlBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F0FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#615673',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#615673',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  playIconOffset: {
    marginLeft: 3,
  },
  skipHint: {
    textAlign: 'center',
    fontSize: 12,
  },
});
