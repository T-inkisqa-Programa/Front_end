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

import type { Community } from '../domain/community';
import { communities as seedCommunities } from '../infrastructure/comunidades.seed';

const STORAGE_KEY = 'tinkisqa-foros-v1';

const DEFAULT_COMMUNITY_IMAGE =
  'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=80';

export type CommunityDraft = {
  name: string;
  description: string;
  image?: string;
  category?: string;
  privacy?: 'publica' | 'privada';
};

type ForosContextValue = {
  communities: Community[];
  getCommunityById: (id: string) => Community | undefined;
  addCommunity: (draft: CommunityDraft) => string;
  updateCommunity: (id: string, patch: Partial<Community>) => void;
  deleteCommunity: (id: string) => void;
};

const ForosContext = createContext<ForosContextValue | null>(null);

export function ForosProvider({ children }: { children: ReactNode }) {
  const [communities, setCommunities] = useState<Community[]>(seedCommunities);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (!active || !raw) return;
        const parsed = JSON.parse(raw) as { communities?: Community[] };
        setCommunities(parsed.communities ?? seedCommunities);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ communities })).catch(() => {});
  }, [communities]);

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
    setCommunities((prev) => [community, ...prev]);
    return id;
  }, []);

  const updateCommunity = useCallback((id: string, patch: Partial<Community>) => {
    setCommunities((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  }, []);

  const deleteCommunity = useCallback((id: string) => {
    setCommunities((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const value = useMemo<ForosContextValue>(
    () => ({
      communities,
      getCommunityById: (id: string) => communities.find((c) => c.id === id),
      addCommunity,
      updateCommunity,
      deleteCommunity,
    }),
    [communities, addCommunity, updateCommunity, deleteCommunity]
  );

  return <ForosContext.Provider value={value}>{children}</ForosContext.Provider>;
}

export function useForosStore() {
  const ctx = useContext(ForosContext);
  if (!ctx) {
    throw new Error('useForosStore must be used within ForosProvider');
  }
  return ctx;
}