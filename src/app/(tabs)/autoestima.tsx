import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ArticleCard } from '@/components/article-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TopBar } from '@/components/top-bar';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAppStore } from '@/lib/app-store';

const filters = ['Todos', 'Ejercicios', 'Meditaciones', 'Lecturas'];

const PAGE_SIZE = 4;

const GROUP_CATEGORIES = ['Amor propio', 'Confianza', 'Autoestima', 'Aceptación', 'Bienestar'];

export default function AutoestimaScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const { articles: allArticles, toggleArticleSave } = useAppStore();
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const selectFilter = (filter: string) => {
    setActiveFilter(filter);
    setVisibleCount(PAGE_SIZE);
  };

  const articles = allArticles.filter((a) => GROUP_CATEGORIES.includes(a.category));
  const filtered = articles.filter(
    (article) => activeFilter === 'Todos' || article.contentType === activeFilter
  );
  const visible = filtered.slice(0, visibleCount);

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
              Autoestima
            </ThemedText>
          </View>
          <ThemedText type="small" themeColor="textSecondary" style={styles.pageDesc}>
            Contenidos para cultivar la confianza en ti, fortalecer tu amor propio y recordar cuánto vales.
          </ThemedText>
        </View>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersRow}
        >
          {filters.map((filter) => {
            const selected = activeFilter === filter;
            return (
              <Pressable
                key={filter}
                onPress={() => selectFilter(filter)}
                style={[styles.filterChip, selected && styles.filterChipActive]}
              >
                <ThemedText
                  type="smallBold"
                  style={[styles.filterText, selected && styles.filterTextActive]}
                >
                  {filter}
                </ThemedText>
              </Pressable>
            );
          })}
        </ScrollView>

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
        {visibleCount < filtered.length && (
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
    gap: Spacing.three,
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
  filtersRow: {
    gap: Spacing.two,
    paddingVertical: Spacing.one,
  },
  filterChip: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: 999,
    backgroundColor: '#F0F0F3',
  },
  filterChipActive: {
    backgroundColor: '#615673',
  },
  filterText: {
    color: '#60646C',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  list: {
    gap: Spacing.three,
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
