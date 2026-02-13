'use client';

import { createContext, useContext, useCallback, useSyncExternalStore } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggleTheme: () => {},
});

// External theme store — avoids setState-in-effect lint violations
// Each ThemeProvider creates its own store instance via useRef-like pattern,
// but since we only ever have one provider, a module-level store is fine.
// The inline <script> in layout.tsx handles the initial class on <html>
// before React hydrates, so FOUC is already prevented.
let currentTheme: Theme = 'light';
let listeners: Array<() => void> = [];

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(listener: () => void) {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function getSnapshot(): Theme {
  return currentTheme;
}

function getServerSnapshot(): Theme {
  return 'light';
}

function initializeTheme() {
  if (typeof window === 'undefined') return;
  const stored = localStorage.getItem('theme') as Theme | null;
  const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  currentTheme = stored || preferred;
  document.documentElement.classList.toggle('dark', currentTheme === 'dark');
}

// Initialize synchronously on module load (client only).
// This runs once when the module is first imported, before any component renders.
if (typeof window !== 'undefined') {
  initializeTheme();
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    const next = currentTheme === 'light' ? 'dark' : 'light';
    currentTheme = next;
    document.documentElement.classList.toggle('dark', next === 'dark');
    localStorage.setItem('theme', next);
    emitChange();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
