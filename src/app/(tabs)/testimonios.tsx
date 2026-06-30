import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TopBar } from '@/components/top-bar';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const tabs = ['Espacios de Crecimiento', 'Testimonio'];

const categoryCards = [
  { name: 'Autoestima', icon: 'heart-circle', color: '#FF6B8A' },
  { name: 'Autocuidado', icon: 'leaf', color: '#4CAF50' },
  { name: 'Equilibrio', icon: 'balance-scale', color: '#FF9800' },
];

const articles = [
  {
    id: '1',
    title: 'Cómo construir una rutina de autocuidado sostenible',
    author: 'Sofía Gutiérrez',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80',
    tags: ['Autoestima', 'Rutinas'],
    readTime: '8 min',
    saved: false,
  },
  {
    id: '2',
    title: 'Mindfulness para principiantes: guía paso a paso',
    author: 'Mariana López',
    image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=900&q=80',
    tags: ['Mindfulness', 'Meditación'],
    readTime: '10 min',
    saved: true,
  },
  {
    id: '3',
    title: 'El poder de la gratitud en tu desarrollo personal',
    author: 'Camila Torres',
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=900&q=80',
    tags: ['Motivación', 'Crecimiento'],
    readTime: '7 min',
    saved: false,
  },
];

export default function TestimoniosScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

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
        <View>
          <ThemedText type="title" style={styles.sectionMainTitle}>
            Crecimiento Personal
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.sectionDesc}>
            Un santuario digital para nutrir tu bienestar, crecimiento profesional y conexión comunitaria.
          </ThemedText>
        </View>

        {/* Tabs */}
        <View style={styles.tabsRow}>
          {tabs.map((tab, index) => {
            const active = index === 0;
            return (
              <Pressable
                key={tab}
                style={[styles.tab, active && styles.tabActive]}
              >
                <ThemedText
                  type="smallBold"
                  style={[styles.tabText, active && { color: '#615673' }]}
                >
                  {tab}
                </ThemedText>
              </Pressable>
            );
          })}
        </View>

        {/* Categories */}
        <View style={styles.categoriesHeader}>
          <ThemedText type="smallBold" style={styles.categoriesTitle}>
            Categorías
          </ThemedText>
          <Pressable>
            <ThemedText type="small" style={{ color: '#615673' }}>
              Ver todas
            </ThemedText>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesRow}
        >
          {categoryCards.map((cat) => (
            <Pressable key={cat.name} style={[styles.categoryCard, { backgroundColor: theme.backgroundElement }]}>
              <View style={[styles.categoryIcon, { backgroundColor: cat.color + '20' }]}>
                <Ionicons name={cat.icon as any} size={28} color={cat.color} />
              </View>
              <ThemedText type="smallBold" style={styles.categoryName}>
                {cat.name}
              </ThemedText>
            </Pressable>
          ))}
        </ScrollView>

        {/* Recommended Articles */}
        <View style={styles.sectionHeader}>
          <ThemedText type="smallBold" style={styles.sectionTitle}>
            Recomendado para ti
          </ThemedText>
        </View>

        <View style={styles.articlesList}>
          {articles.map((article) => (
            <View key={article.id} style={[styles.articleCard, { backgroundColor: theme.backgroundElement }]}>
              <View style={styles.articleRow}>
                <Image source={article.image} style={styles.articleThumb} contentFit="cover" />
                <View style={styles.articleInfo}>
                  <View style={styles.articleTags}>
                    {article.tags.map((tag) => (
                      <View key={tag} style={styles.tag}>
                        <ThemedText type="small" style={{ color: '#615673', fontSize: 11 }}>
                          {tag}
                        </ThemedText>
                      </View>
                    ))}
                  </View>
                  <ThemedText type="smallBold" style={styles.articleTitle} numberOfLines={2}>
                    {article.title}
                  </ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    {article.author} · {article.readTime}
                  </ThemedText>
                </View>
              </View>
              <View style={styles.articleFooter}>
                <Pressable style={styles.saveBtn}>
                  <Ionicons
                    name={article.saved ? 'bookmark' : 'bookmark-outline'}
                    size={20}
                    color={article.saved ? '#615673' : theme.textSecondary}
                  />
                </Pressable>
                <View style={styles.articleActionsWrapper}>
                  <Pressable
                    style={styles.menuBtn}
                    onPress={() => setMenuOpen(menuOpen === article.id ? null : article.id)}
                  >
                    <Ionicons name="ellipsis-horizontal" size={20} color={theme.textSecondary} />
                  </Pressable>
                  {menuOpen === article.id && (
                    <View style={[styles.actionMenu, { backgroundColor: theme.background, borderColor: theme.backgroundElement }]}>
                      <Pressable style={styles.menuItem}>
                        <Ionicons name="create-outline" size={18} color={theme.text} />
                        <ThemedText type="small">Editar</ThemedText>
                      </Pressable>
                      <Pressable style={styles.menuItem}>
                        <Ionicons name="trash-outline" size={18} color="#FF6B6B" />
                        <ThemedText type="small" style={{ color: '#FF6B6B' }}>Eliminar</ThemedText>
                      </Pressable>
                    </View>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <Pressable style={styles.fab}>
        <Ionicons name="add" size={28} color="#FFFFFF" />
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
  sectionMainTitle: {
    fontSize: 28,
  },
  sectionDesc: {
    lineHeight: 20,
    marginTop: Spacing.one,
  },
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F3',
    borderRadius: 14,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.two + 2,
    borderRadius: 11,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  tabText: {
    color: '#60646C',
  },
  categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoriesTitle: {
    fontSize: 18,
  },
  categoriesRow: {
    gap: Spacing.three,
    paddingBottom: Spacing.half,
  },
  categoryCard: {
    width: 130,
    borderRadius: 20,
    padding: Spacing.three,
    alignItems: 'center',
    gap: Spacing.two,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  categoryIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryName: {
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
  },
  articlesList: {
    gap: Spacing.three,
  },
  articleCard: {
    borderRadius: 20,
    padding: Spacing.three,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  articleRow: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  articleThumb: {
    width: 90,
    height: 90,
    borderRadius: 14,
  },
  articleInfo: {
    flex: 1,
    gap: Spacing.one,
  },
  articleTags: {
    flexDirection: 'row',
    gap: Spacing.one,
    flexWrap: 'wrap',
  },
  tag: {
    paddingHorizontal: Spacing.two,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: '#F5F0FF',
  },
  articleTitle: {
    fontSize: 15,
    lineHeight: 20,
  },
  articleFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: Spacing.two,
    gap: Spacing.two,
  },
  saveBtn: {
    padding: Spacing.half,
  },
  articleActionsWrapper: {
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
