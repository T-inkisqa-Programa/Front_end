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

import type { Testimonio } from '../domain/testimonio';
import { testimonios as seedTestimonios } from '../infrastructure/testimonios.repository';

const STORAGE_KEY = 'tinkisqa-testimonios-v1';

export type TestimonioDraft = {
  title: string;
  text: string;
  mood?: { label: string; emoji: string; color: string };
};

type TestimoniosContextValue = {
  testimonios: Testimonio[];
  getTestimonioById: (id: string) => Testimonio | undefined;
  addTestimonio: (draft: TestimonioDraft) => string;
  updateTestimonio: (id: string, patch: Partial<Testimonio>) => void;
  deleteTestimonio: (id: string) => void;
  toggleTestimonioSave: (id: string) => void;
  likeTestimonio: (id: string) => void;
  unlikeTestimonio: (id: string) => void;
};

const TestimoniosContext = createContext<TestimoniosContextValue | null>(null);

export function TestimoniosProvider({ children }: { children: ReactNode }) {
  const [testimonios, setTestimonios] = useState<Testimonio[]>(seedTestimonios);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (!active || !raw) return;
        const parsed = JSON.parse(raw) as { testimonios?: Testimonio[] };
        setTestimonios(parsed.testimonios ?? seedTestimonios);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ testimonios })).catch(() => {});
  }, [testimonios]);

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
    setTestimonios((prev) => [testimonio, ...prev]);
    return id;
  }, []);

  const updateTestimonio = useCallback((id: string, patch: Partial<Testimonio>) => {
    setTestimonios((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }, []);

  const deleteTestimonio = useCallback((id: string) => {
    setTestimonios((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toggleTestimonioSave = useCallback((id: string) => {
    setTestimonios((prev) => prev.map((t) => (t.id === id ? { ...t, saved: !t.saved } : t)));
  }, []);

  const likeTestimonio = useCallback((id: string) => {
    setTestimonios((prev) => prev.map((t) => (t.id === id ? { ...t, likes: t.likes + 1 } : t)));
  }, []);

  const unlikeTestimonio = useCallback((id: string) => {
    setTestimonios((prev) =>
      prev.map((t) => (t.id === id ? { ...t, likes: Math.max(0, t.likes - 1) } : t))
    );
  }, []);

  const value = useMemo<TestimoniosContextValue>(
    () => ({
      testimonios,
      getTestimonioById: (id: string) => testimonios.find((t) => t.id === id),
      addTestimonio,
      updateTestimonio,
      deleteTestimonio,
      toggleTestimonioSave,
      likeTestimonio,
      unlikeTestimonio,
    }),
    [
      testimonios,
      addTestimonio,
      updateTestimonio,
      deleteTestimonio,
      toggleTestimonioSave,
      likeTestimonio,
      unlikeTestimonio,
    ]
  );

  return <TestimoniosContext.Provider value={value}>{children}</TestimoniosContext.Provider>;
}

export function useTestimoniosStore() {
  const ctx = useContext(TestimoniosContext);
  if (!ctx) {
    throw new Error('useTestimoniosStore must be used within TestimoniosProvider');
  }
  return ctx;
}
