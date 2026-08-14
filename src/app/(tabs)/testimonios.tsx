import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter, type Href } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TopBar } from '@/components/top-bar';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAppStore } from '@/lib/app-store';

const tabs = ['Espacios de Crecimiento', 'Testimonios'];

const categoryCards: { name: string; icon: string; color: string; route: Href; description: string }[] = [
  { name: 'Autoestima', icon: 'heart-circle', color: '#FF6B8A', route: '/autoestima', description: 'Fortalece tu amor propio con lecturas y ejercicios.' },
  { name: 'Autocuidado', icon: 'leaf', color: '#4CAF50', route: '/autocuidado', description: 'Rutinas y prácticas para tu bienestar diario.' },
  { name: 'Equilibrio', icon: 'balance-scale', color: '#FF9800', route: '/equilibrio', description: 'Armonía entre tu mente, cuerpo y emociones.' },
];

const recommendedIds = ['ac-2', 'ac-3', 'ac-4'];

export default function TestimoniosScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const { articles, testimonios, deleteArticle, toggleArticleSave, deleteTestimonio, toggleTestimonioSave } = useAppStore();
  const [activeTab, setActiveTab] = useState(0);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [tMenuOpen, setTMenuOpen] = useState<string | null>(null);
  const [showAllCats, setShowAllCats] = useState(false);

  const recommended = articles.filter(
    (a) => a.id.startsWith('user-article') || recommendedIds.includes(a.id)
  );

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
            const active = activeTab === index;
            return (
              <Pressable
                key={tab}
                style={[styles.tab, active && styles.tabActive]}
                onPress={() => setActiveTab(index)}
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

        {activeTab === 0 ? (
          <>
            {/* Categories */}
            <View style={styles.categoriesHeader}>
              <ThemedText type="smallBold" style={styles.categoriesTitle}>
                Categorías
              </ThemedText>
              <Pressable onPress={() => setShowAllCats((prev) => !prev)}>
                <ThemedText type="small" style={{ color: '#615673' }}>
                  {showAllCats ? 'Ver menos' : 'Ver todas'}
                </ThemedText>
              </Pressable>
            </View>

            {showAllCats ? (
              <View style={styles.categoriesGrid}>
                {categoryCards.map((cat) => (
                  <Pressable
                    key={cat.name}
                    style={[styles.categoryCardFull, { backgroundColor: theme.backgroundElement }]}
                    onPress={() => router.push(cat.route)}
                  >
                    <View style={[styles.categoryIcon, { backgroundColor: cat.color + '20' }]}>
                      <Ionicons name={cat.icon as any} size={28} color={cat.color} />
                    </View>
                    <ThemedText type="smallBold" style={styles.categoryName}>
                      {cat.name}
                    </ThemedText>
                    <ThemedText type="small" themeColor="textSecondary" numberOfLines={2} style={styles.categoryDesc}>
                      {cat.description}
                    </ThemedText>
                  </Pressable>
                ))}
              </View>
            ) : (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesRow}
              >
                {categoryCards.map((cat) => (
                  <Pressable
                    key={cat.name}
                    style={[styles.categoryCard, { backgroundColor: theme.backgroundElement }]}
                    onPress={() => router.push(cat.route)}
                  >
                    <View style={[styles.categoryIcon, { backgroundColor: cat.color + '20' }]}>
                      <Ionicons name={cat.icon as any} size={28} color={cat.color} />
                    </View>
                    <ThemedText type="smallBold" style={styles.categoryName}>
                      {cat.name}
                    </ThemedText>
                  </Pressable>
                ))}
              </ScrollView>
            )}

            {/* Recommended Articles */}
            <View style={styles.sectionHeader}>
              <ThemedText type="smallBold" style={styles.sectionTitle}>
                Recomendado para ti
              </ThemedText>
            </View>

            <View style={styles.articlesList}>
              {recommended.map((article) => {
                const isSaved = !!article.saved;
                return (
                <Pressable
                  key={article.id}
                  style={({ pressed }) => [
                    styles.articleCard,
                    { backgroundColor: theme.backgroundElement },
                    pressed && styles.cardPressed,
                  ]}
                  onPress={() => router.push({ pathname: '/detalle-articulo', params: { id: article.id } })}
                >
                  <View style={styles.articleRow}>
                    <Image source={article.image} style={styles.articleThumb} contentFit="cover" />
                    <View style={styles.articleInfo}>
                      <View style={styles.articleTags}>
                        {[article.contentType, article.category].map((tag) => (
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
                    <Pressable style={styles.saveBtn} onPress={() => toggleArticleSave(article.id)}>
                      <Ionicons
                        name={isSaved ? 'bookmark' : 'bookmark-outline'}
                        size={20}
                        color={isSaved ? '#615673' : theme.textSecondary}
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
                          <Pressable
                            style={styles.menuItem}
                            onPress={() => {
                              setMenuOpen(null);
                              router.push({ pathname: '/crear-articulo', params: { id: article.id } });
                            }}
                          >
                            <Ionicons name="create-outline" size={18} color={theme.text} />
                            <ThemedText type="small">Editar</ThemedText>
                          </Pressable>
                          <Pressable
                            style={styles.menuItem}
                            onPress={() => {
                              setMenuOpen(null);
                              deleteArticle(article.id);
                            }}
                          >
                            <Ionicons name="trash-outline" size={18} color="#FF6B6B" />
                            <ThemedText type="small" style={{ color: '#FF6B6B' }}>Eliminar</ThemedText>
                          </Pressable>
                        </View>
                      )}
                    </View>
                  </View>
                </Pressable>
                );
              })}
            </View>
          </>
        ) : (
          <>
            {/* Testimonials header */}
            <View style={styles.sectionHeader}>
              <ThemedText type="smallBold" style={styles.sectionTitle}>
                Testimonios
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {testimonios.length} experiencias
              </ThemedText>
            </View>

            <ThemedText type="small" themeColor="textSecondary" style={styles.sectionDesc}>
              Experiencias compartidas de forma anónima por mujeres de nuestra comunidad.
            </ThemedText>

            {/* Testimonial cards */}
            <View style={styles.articlesList}>
              {testimonios.map((t) => (
                <Pressable
                  key={t.id}
                  style={({ pressed }) => [
                    styles.tCard,
                    { backgroundColor: theme.backgroundElement },
                    pressed && styles.cardPressed,
                  ]}
                  onPress={() => router.push({ pathname: '/detalle-testimonio', params: { id: t.id } })}
                >
                  <View style={styles.tHeader}>
                    <View style={styles.tAvatar}>
                      <ThemedText type="smallBold" style={styles.tAvatarText}>
                        {t.age}
                      </ThemedText>
                    </View>
                    <View style={styles.tUserInfo}>
                      <ThemedText type="small" style={styles.tUserName}>
                        Anónima · {t.age} años
                      </ThemedText>
                      <ThemedText type="small" themeColor="textSecondary">
                        {t.time}
                      </ThemedText>
                    </View>
                    <View style={styles.tHeaderRight}>
                      {t.mood ? (
                        <View style={[styles.tMoodChip, { backgroundColor: t.mood.color + '18' }]}>
                          <ThemedText style={styles.tMoodEmoji}>{t.mood.emoji}</ThemedText>
                          <ThemedText type="smallBold" style={[styles.tMoodLabel, { color: t.mood.color }]}>
                            {t.mood.label}
                          </ThemedText>
                        </View>
                      ) : (
                        <Pressable style={styles.saveBtn} onPress={() => toggleTestimonioSave(t.id)}>
                          <Ionicons
                            name={t.saved ? 'bookmark' : 'bookmark-outline'}
                            size={20}
                            color={t.saved ? '#615673' : theme.textSecondary}
                          />
                        </Pressable>
                      )}
                      <View style={styles.articleActionsWrapper}>
                        <Pressable
                          style={styles.menuBtn}
                          onPress={() => setTMenuOpen(tMenuOpen === t.id ? null : t.id)}
                        >
                          <Ionicons name="ellipsis-horizontal" size={20} color={theme.textSecondary} />
                        </Pressable>
                        {tMenuOpen === t.id && (
                          <View style={[styles.actionMenu, { backgroundColor: theme.background, borderColor: theme.backgroundElement }]}>
                            <Pressable
                              style={styles.menuItem}
                              onPress={() => {
                                setTMenuOpen(null);
                                router.push({ pathname: '/crear-testimonio', params: { id: t.id } });
                              }}
                            >
                              <Ionicons name="create-outline" size={18} color={theme.text} />
                              <ThemedText type="small">Editar</ThemedText>
                            </Pressable>
                            <Pressable
                              style={styles.menuItem}
                              onPress={() => {
                                setTMenuOpen(null);
                                deleteTestimonio(t.id);
                              }}
                            >
                              <Ionicons name="trash-outline" size={18} color="#FF6B6B" />
                              <ThemedText type="small" style={{ color: '#FF6B6B' }}>Eliminar</ThemedText>
                            </Pressable>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>

                  <ThemedText type="smallBold" style={styles.tTitle} numberOfLines={2}>
                    {t.title}
                  </ThemedText>
                  <ThemedText type="small" themeColor="textSecondary" style={styles.tText} numberOfLines={4}>
                    {t.text}
                  </ThemedText>

                  <View style={styles.tDivider} />

                  <View style={styles.tActions}>
                    <View style={styles.tAction}>
                      <Ionicons name="heart-outline" size={20} color="#615673" />
                      <ThemedText type="small" style={{ color: '#615673' }}>
                        Agradecer · {t.likes}
                      </ThemedText>
                    </View>
                    <View style={styles.tAction}>
                      <Ionicons name="chatbubble-outline" size={18} color={theme.textSecondary} />
                      <ThemedText type="small" themeColor="textSecondary">
                        {t.comments.length} comentarios
                      </ThemedText>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>

            {/* Motivational quote */}
            <View style={[styles.quoteCard, { backgroundColor: theme.backgroundElement }]}>
              <Ionicons name="sparkles" size={22} color="#615673" />
              <ThemedText style={styles.quoteText}>
                Tu historia puede ser la luz que otra persona necesita hoy.
              </ThemedText>
              <ThemedText type="small" style={{ color: '#615673' }}>
                Comparte tu experiencia
              </ThemedText>
            </View>
          </>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <Pressable
        style={styles.fab}
        onPress={() => router.push(activeTab === 1 ? '/crear-testimonio' : '/crear-articulo')}
      >
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
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
  },
  categoryCardFull: {
    width: '47%',
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
  categoryDesc: {
    textAlign: 'center',
    fontSize: 11,
    lineHeight: 15,
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
  cardPressed: {
    opacity: 0.9,
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
  tCard: {
    borderRadius: 20,
    padding: Spacing.three,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
    gap: Spacing.two,
  },
  tHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  tAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F5F0FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tAvatarText: {
    color: '#615673',
    fontSize: 16,
  },
  tUserInfo: {
    flex: 1,
    gap: 2,
  },
  tHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  tUserName: {
    fontSize: 14,
  },
  tMoodChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.two,
    borderRadius: 999,
  },
  tMoodEmoji: {
    fontSize: 14,
  },
  tMoodLabel: {
    fontSize: 12,
  },
  tTitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  tText: {
    lineHeight: 20,
  },
  tDivider: {
    height: 1,
    backgroundColor: '#EEECF2',
    marginVertical: Spacing.one,
  },
  tActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingVertical: Spacing.one,
    paddingRight: Spacing.two,
  },
  quoteCard: {
    borderRadius: 20,
    padding: Spacing.four,
    alignItems: 'center',
    gap: Spacing.two,
    borderWidth: 1,
    borderColor: '#F0E9FA',
  },
  quoteText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
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
