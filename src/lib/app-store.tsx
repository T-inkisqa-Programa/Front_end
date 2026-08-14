import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type { Article, ArticleBlock } from '@/lib/articulos';
import { articles as seedArticles } from '@/lib/articulos';
import type { Community } from '@/lib/comunidades';
import { communities as seedCommunities } from '@/lib/comunidades';
import type { CommunityPost } from '@/lib/publicaciones';
import { posts as seedPosts } from '@/lib/publicaciones';
import type { Testimonio } from '@/lib/testimonios';
import { testimonios as seedTestimonios } from '@/lib/testimonios';

const STORAGE_KEY = 'tinkisqa-app-store-v1';

const USER_AVATAR =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80';
const DEFAULT_COVER =
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80';
const DEFAULT_COMMUNITY_IMAGE =
  'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=80';

export type AppState = {
  articles: Article[];
  testimonios: Testimonio[];
  communities: Community[];
  posts: CommunityPost[];
};

const seedState: AppState = {
  articles: seedArticles,
  testimonios: seedTestimonios,
  communities: seedCommunities,
  posts: seedPosts,
};

export type ArticleDraft = {
  title: string;
  image: string | null;
  category: string;
  content: string;
  hasAudio: boolean;
};

export type TestimonioDraft = {
  title: string;
  text: string;
  mood?: { label: string; emoji: string; color: string };
};

export type CommunityDraft = {
  name: string;
  description: string;
  image?: string;
  category?: string;
  privacy?: 'publica' | 'privada';
};

export type PostDraft = {
  content: string;
  tag?: string;
};

type AppStoreContextValue = AppState & {
  getArticleById: (id: string) => Article | undefined;
  getTestimonioById: (id: string) => Testimonio | undefined;
  getCommunityById: (id: string) => Community | undefined;
  getPostById: (id: string) => CommunityPost | undefined;
  addArticle: (draft: ArticleDraft) => string;
  updateArticle: (id: string, patch: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  toggleArticleSave: (id: string) => void;
  addTestimonio: (draft: TestimonioDraft) => string;
  updateTestimonio: (id: string, patch: Partial<Testimonio>) => void;
  deleteTestimonio: (id: string) => void;
  toggleTestimonioSave: (id: string) => void;
  likeTestimonio: (id: string) => void;
  unlikeTestimonio: (id: string) => void;
  addCommunity: (draft: CommunityDraft) => string;
  updateCommunity: (id: string, patch: Partial<Community>) => void;
  deleteCommunity: (id: string) => void;
  addPost: (draft: PostDraft) => string;
  updatePost: (id: string, patch: Partial<CommunityPost>) => void;
  deletePost: (id: string) => void;
  togglePostLike: (id: string) => void;
  unlikePost: (id: string) => void;
  togglePostSave: (id: string) => void;
};

const AppStoreContext = createContext<AppStoreContextValue | null>(null);

function buildBlocks(content: string): ArticleBlock[] {
  const paragraphs = content
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  if (paragraphs.length === 0) {
    return [{ type: 'paragraph', text: 'Este artículo aún no tiene contenido.' }];
  }
  return paragraphs.map((text) => ({ type: 'paragraph', text }));
}

function estimateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 180))} min`;
}

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(seedState);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (!active || !raw) return;
        const parsed = JSON.parse(raw) as Partial<AppState>;
        setState((prev) => ({
          articles: parsed.articles ?? prev.articles,
          testimonios: parsed.testimonios ?? prev.testimonios,
          communities: parsed.communities ?? prev.communities,
          posts: parsed.posts ?? prev.posts,
        }));
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => {});
  }, [state]);

  const addArticle = useCallback((draft: ArticleDraft): string => {
    const id = `user-article-${Date.now()}`;
    const article: Article = {
      id,
      title: draft.title.trim() || 'Artículo sin título',
      author: 'Valeria M.',
      image: draft.image ?? DEFAULT_COVER,
      readTime: estimateReadTime(draft.content),
      contentType: 'Artículo',
      category: draft.category || 'Autocuidado',
      saved: false,
      authorPhoto: USER_AVATAR,
      authorRole: 'Miembro de la comunidad',
      audioMinutes: draft.hasAudio ? 5 : 0,
      blocks: buildBlocks(draft.content),
    };
    setState((prev) => ({ ...prev, articles: [article, ...prev.articles] }));
    return id;
  }, []);

  const updateArticle = useCallback((id: string, patch: Partial<Article>) => {
    setState((prev) => ({
      ...prev,
      articles: prev.articles.map((a) => (a.id === id ? { ...a, ...patch } : a)),
    }));
  }, []);

  const deleteArticle = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      articles: prev.articles.filter((a) => a.id !== id),
    }));
  }, []);

  const toggleArticleSave = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      articles: prev.articles.map((a) => (a.id === id ? { ...a, saved: !a.saved } : a)),
    }));
  }, []);

  const addTestimonio = useCallback((draft: TestimonioDraft): string => {
    const id = `user-testimonio-${Date.now()}`;
    const testimonio: Testimonio = {
      id,
      age: 24,
      time: 'Ahora mismo',
      title: draft.title.trim() || 'Mi experiencia',
      text: draft.text.trim(),
      likes: 0,
      saved: false,
      mood: draft.mood,
      comments: [],
    };
    setState((prev) => ({ ...prev, testimonios: [testimonio, ...prev.testimonios] }));
    return id;
  }, []);

  const updateTestimonio = useCallback((id: string, patch: Partial<Testimonio>) => {
    setState((prev) => ({
      ...prev,
      testimonios: prev.testimonios.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    }));
  }, []);

  const deleteTestimonio = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      testimonios: prev.testimonios.filter((t) => t.id !== id),
    }));
  }, []);

  const toggleTestimonioSave = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      testimonios: prev.testimonios.map((t) =>
        t.id === id ? { ...t, saved: !t.saved } : t
      ),
    }));
  }, []);

  const likeTestimonio = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      testimonios: prev.testimonios.map((t) =>
        t.id === id ? { ...t, likes: t.likes + 1 } : t
      ),
    }));
  }, []);

  const unlikeTestimonio = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      testimonios: prev.testimonios.map((t) =>
        t.id === id ? { ...t, likes: Math.max(0, t.likes - 1) } : t
      ),
    }));
  }, []);

  const addCommunity = useCallback((draft: CommunityDraft): string => {
    const id = `user-comunidad-${Date.now()}`;
    const community: Community = {
      id,
      name: draft.name.trim() || 'Nueva comunidad',
      description: draft.description.trim(),
      image: draft.image ?? DEFAULT_COMMUNITY_IMAGE,
      category: draft.category,
      privacy: draft.privacy,
      isUserCreated: true,
    };
    setState((prev) => ({ ...prev, communities: [community, ...prev.communities] }));
    return id;
  }, []);

  const updateCommunity = useCallback((id: string, patch: Partial<Community>) => {
    setState((prev) => ({
      ...prev,
      communities: prev.communities.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    }));
  }, []);

  const deleteCommunity = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      communities: prev.communities.filter((c) => c.id !== id),
    }));
  }, []);

  const addPost = useCallback((draft: PostDraft): string => {
    const id = `user-post-${Date.now()}`;
    const post: CommunityPost = {
      id,
      author: 'Valeria M.',
      avatar: USER_AVATAR,
      date: 'Ahora mismo',
      minutesAgo: 0,
      tag: draft.tag ?? 'Mi Idea',
      content: draft.content.trim(),
      isQuote: false,
      likes: 0,
      comments: 0,
      saved: false,
      isMine: true,
    };
    setState((prev) => ({ ...prev, posts: [post, ...prev.posts] }));
    return id;
  }, []);

  const updatePost = useCallback((id: string, patch: Partial<CommunityPost>) => {
    setState((prev) => ({
      ...prev,
      posts: prev.posts.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }));
  }, []);

  const deletePost = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      posts: prev.posts.filter((p) => p.id !== id),
    }));
  }, []);

  const togglePostLike = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      posts: prev.posts.map((p) =>
        p.id === id ? { ...p, likes: p.likes + 1 } : p
      ),
    }));
  }, []);

  const unlikePost = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      posts: prev.posts.map((p) =>
        p.id === id ? { ...p, likes: Math.max(0, p.likes - 1) } : p
      ),
    }));
  }, []);

  const togglePostSave = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      posts: prev.posts.map((p) => (p.id === id ? { ...p, saved: !p.saved } : p)),
    }));
  }, []);

  const value = useMemo<AppStoreContextValue>(() => {
    const { articles, testimonios, communities, posts } = state;
    return {
      articles,
      testimonios,
      communities,
      posts,
      getArticleById: (id: string) => articles.find((a) => a.id === id),
      getTestimonioById: (id: string) => testimonios.find((t) => t.id === id),
      getCommunityById: (id: string) => communities.find((c) => c.id === id),
      getPostById: (id: string) => posts.find((p) => p.id === id),
      addArticle,
      updateArticle,
      deleteArticle,
      toggleArticleSave,
      addTestimonio,
      updateTestimonio,
      deleteTestimonio,
      toggleTestimonioSave,
      likeTestimonio,
      unlikeTestimonio,
      addCommunity,
      updateCommunity,
      deleteCommunity,
      addPost,
      updatePost,
      deletePost,
      togglePostLike,
      unlikePost,
      togglePostSave,
    };
  }, [
    state,
    addArticle,
    updateArticle,
    deleteArticle,
    toggleArticleSave,
    addTestimonio,
    updateTestimonio,
    deleteTestimonio,
    toggleTestimonioSave,
    likeTestimonio,
    unlikeTestimonio,
    addCommunity,
    updateCommunity,
    deleteCommunity,
    addPost,
    updatePost,
    deletePost,
    togglePostLike,
    unlikePost,
    togglePostSave,
  ]);

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
}

export function useAppStore() {
  const ctx = useContext(AppStoreContext);
  if (!ctx) {
    throw new Error('useAppStore must be used within AppStoreProvider');
  }
  return ctx;
}
