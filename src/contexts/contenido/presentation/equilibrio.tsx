import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ArticleCard } from '@/contexts/contenido/presentation/components/article-card';
import { ThemedText } from '@/shared/ui/themed-text';
import { ThemedView } from '@/shared/ui/themed-view';
import { TopBar } from '@/shared/ui/top-bar';
import { BottomTabInset, Spacing } from '@/shared/theme/theme';
import { useTheme } from '@/shared/hooks/use-theme';
import { useArticulosStore } from '@/contexts/contenido/application/articulos-store';

const PAGE_SIZE = 4;

const GROUP_CATEGORIES = ['Trabajo-Vida', 'Meditación', 'Nutrición', 'Desconexión', 'Organización', 'Hábitos', 'Equilibrio'];

export default function EquilibrioScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const { articles: allArticles, toggleArticleSave } = useArticulosStore();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const articles = allArticles.filter((a) => GROUP_CATEGORIES.includes(a.category));
  const visible = articles.slice(0, visibleCount);

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
          <View style={styles.titleRow}>
            <Pressable
              hitSlop={8}
              style={({ pressed }) => [styles.backBtn, pressed && styles.backPressed]}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color={theme.text} />
            </Pressable>
            <ThemedText type="title" style={styles.pageTitle}>
              Equilibrio
            </ThemedText>
          </View>
          <ThemedText type="small" themeColor="textSecondary" style={styles.pageDesc}>
            Ideas y herramientas para organizar y armonizar tu vida diaria, entre el trabajo, tu bienestar y el tiempo para ti.
          </ThemedText>
        </View>

        {/* Articles */}
        <View style={styles.list}>
          {visible.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onToggleSave={toggleArticleSave}
              onPress={() => router.push({ pathname: '/detalle-articulo', params: { id: article.id } })}
            />
          ))}
        </View>

        {/* Load more */}
        {visibleCount < articles.length && (
          <Pressable
            style={({ pressed }) => [styles.loadMoreBtn, pressed && styles.loadMorePressed]}
            onPress={() => setVisibleCount((count) => count + PAGE_SIZE)}
          >
            <Ionicons name="add" size={20} color="#615673" />
            <ThemedText type="smallBold" style={styles.loadMoreText}>
              Cargar más artículos
            </ThemedText>
          </Pressable>
        )}
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
  titleSection: {
    gap: Spacing.one,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
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
  pageTitle: {
    fontSize: 28,
  },
  pageDesc: {
    lineHeight: 20,
  },
  list: {
    gap: Spacing.four,
  },
  loadMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    marginTop: Spacing.two,
    paddingVertical: Spacing.three,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: '#615673',
    backgroundColor: '#FFFFFF',
  },
  loadMorePressed: {
    opacity: 0.8,
  },
  loadMoreText: {
    color: '#615673',
  },
});
