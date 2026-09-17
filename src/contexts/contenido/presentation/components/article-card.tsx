import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/shared/ui/themed-text';
import { Spacing } from '@/shared/theme/theme';
import { useTheme } from '@/shared/hooks/use-theme';

export type Article = {
  id: string;
  title: string;
  author: string;
  image: string;
  readTime: string;
  contentType: string;
  category: string;
  saved: boolean;
};

interface ArticleCardProps {
  article: Article;
  tall?: boolean;
  onToggleSave: (id: string) => void;
  onPress?: () => void;
}

export function ArticleCard({ article, tall, onToggleSave, onPress }: ArticleCardProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.backgroundElement },
        pressed && styles.cardPressed,
      ]}
    >
      <Image
        source={article.image}
        style={[styles.image, tall && styles.imageTall]}
        contentFit="cover"
        transition={150}
      />
      <View style={styles.info}>
        <View style={styles.topRow}>
          <ThemedText type="smallBold" style={styles.title} numberOfLines={2}>
            {article.title}
          </ThemedText>
          <Pressable
            hitSlop={8}
            style={({ pressed }) => [styles.saveBtn, pressed && styles.pressed]}
            onPress={() => onToggleSave(article.id)}
          >
            <Ionicons
              name={article.saved ? 'bookmark' : 'bookmark-outline'}
              size={20}
              color={article.saved ? '#615673' : theme.textSecondary}
            />
          </Pressable>
        </View>

        <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
          {article.author}
        </ThemedText>

        <View style={styles.metaRow}>
          <Ionicons name="time-outline" size={14} color={theme.textSecondary} />
          <ThemedText type="small" themeColor="textSecondary" style={styles.metaText}>
            {article.readTime} de lectura
          </ThemedText>
        </View>

        <View style={styles.tagsRow}>
          <View style={styles.tag}>
            <ThemedText type="small" style={styles.tagText}>
              {article.contentType}
            </ThemedText>
          </View>
          <View style={[styles.tag, styles.tagCategory]}>
            <ThemedText type="small" style={styles.tagText}>
              {article.category}
            </ThemedText>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: Spacing.three,
    gap: Spacing.three,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  cardPressed: {
    opacity: 0.9,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 14,
  },
  imageTall: {
    width: 116,
    height: 150,
  },
  info: {
    flex: 1,
    gap: Spacing.one,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.two,
  },
  title: {
    flex: 1,
    fontSize: 15,
    lineHeight: 20,
  },
  saveBtn: {
    padding: Spacing.half,
  },
  pressed: {
    opacity: 0.7,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  metaText: {
    fontSize: 12,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.one,
    marginTop: Spacing.half,
  },
  tag: {
    paddingHorizontal: Spacing.two,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: '#F5F0FF',
  },
  tagCategory: {
    backgroundColor: '#EDE7F6',
  },
  tagText: {
    color: '#615673',
    fontSize: 11,
  },
});
