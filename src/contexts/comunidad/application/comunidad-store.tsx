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

import type { CommunityPost } from '../domain/post';
import { posts as seedPosts } from '../infrastructure/publicaciones.seed';

const STORAGE_KEY = 'tinkisqa-comunidad-v1';

const USER_AVATAR =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80';

export type PostDraft = {
  content: string;
  tag?: string;
};

type ComunidadContextValue = {
  posts: CommunityPost[];
  getPostById: (id: string) => CommunityPost | undefined;
  addPost: (draft: PostDraft) => string;
  updatePost: (id: string, patch: Partial<CommunityPost>) => void;
  deletePost: (id: string) => void;
  togglePostLike: (id: string) => void;
  unlikePost: (id: string) => void;
  togglePostSave: (id: string) => void;
};

const ComunidadContext = createContext<ComunidadContextValue | null>(null);

export function ComunidadProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<CommunityPost[]>(seedPosts);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (!active || !raw) return;
        const parsed = JSON.parse(raw) as { posts?: CommunityPost[] };
        setPosts(parsed.posts ?? seedPosts);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ posts })).catch(() => {});
  }, [posts]);

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
    setPosts((prev) => [post, ...prev]);
    return id;
  }, []);

  const updatePost = useCallback((id: string, patch: Partial<CommunityPost>) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }, []);

  const deletePost = useCallback((id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const togglePostLike = useCallback((id: string) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p)));
  }, []);

  const unlikePost = useCallback((id: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: Math.max(0, p.likes - 1) } : p))
    );
  }, []);

  const togglePostSave = useCallback((id: string) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, saved: !p.saved } : p)));
  }, []);

  const value = useMemo<ComunidadContextValue>(
    () => ({
      posts,
      getPostById: (id: string) => posts.find((p) => p.id === id),
      addPost,
      updatePost,
      deletePost,
      togglePostLike,
      unlikePost,
      togglePostSave,
    }),
    [
      posts,
      addPost,
      updatePost,
      deletePost,
      togglePostLike,
      unlikePost,
      togglePostSave,
    ]
  );

  return <ComunidadContext.Provider value={value}>{children}</ComunidadContext.Provider>;
}

export function useComunidadStore() {
  const ctx = useContext(ComunidadContext);
  if (!ctx) {
    throw new Error('useComunidadStore must be used within ComunidadProvider');
  }
  return ctx;
}