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

import type { Article, ArticleBlock } from '../domain/article';
import { articles as seedArticles } from '../infrastructure/articulos.seed';

const STORAGE_KEY = 'tinkisqa-contenido-v1';

const USER_AVATAR =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80';
const DEFAULT_COVER =
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80';

export type ArticleDraft = {
  title: string;
  image: string | null;
  category: string;
  content: string;
  hasAudio: boolean;
};

type ArticulosContextValue = {
  articles: Article[];
  getArticleById: (id: string) => Article | undefined;
  addArticle: (draft: ArticleDraft) => string;
  updateArticle: (id: string, patch: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  toggleArticleSave: (id: string) => void;
};

const ArticulosContext = createContext<ArticulosContextValue | null>(null);

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

export function ArticulosProvider({ children }: { children: ReactNode }) {
  const [articles, setArticles] = useState<Article[]>(seedArticles);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (!active || !raw) return;
        const parsed = JSON.parse(raw) as { articles?: Article[] };
        setArticles(parsed.articles ?? seedArticles);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ articles })).catch(() => {});
  }, [articles]);

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
    setArticles((prev) => [article, ...prev]);
    return id;
  }, []);

  const updateArticle = useCallback((id: string, patch: Partial<Article>) => {
    setArticles((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)));
  }, []);

  const deleteArticle = useCallback((id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const toggleArticleSave = useCallback((id: string) => {
    setArticles((prev) => prev.map((a) => (a.id === id ? { ...a, saved: !a.saved } : a)));
  }, []);

  const value = useMemo<ArticulosContextValue>(
    () => ({
      articles,
      getArticleById: (id: string) => articles.find((a) => a.id === id),
      addArticle,
      updateArticle,
      deleteArticle,
      toggleArticleSave,
    }),
    [articles, addArticle, updateArticle, deleteArticle, toggleArticleSave]
  );

  return <ArticulosContext.Provider value={value}>{children}</ArticulosContext.Provider>;
}

export function useArticulosStore() {
  const ctx = useContext(ArticulosContext);
  if (!ctx) {
    throw new Error('useArticulosStore must be used within ArticulosProvider');
  }
  return ctx;
}
