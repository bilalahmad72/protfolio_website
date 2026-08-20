'use client';

import React, { useCallback, useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'portfolio-theme';

/*
 * The resolved theme lives on `<html data-theme>`, stamped by the inline script
 * in the root layout before first paint. That attribute — not React state — is
 * the source of truth, so it is read here as an external store. Anything that
 * changes it dispatches `themechange` so subscribers re-read.
 */
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);

  // Follow the OS only until the visitor has expressed a preference of their own.
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const onSystemChange = (e: MediaQueryListEvent) => {
    if (readStoredTheme()) return;
    applyTheme(e.matches ? 'dark' : 'light');
  };
  media.addEventListener('change', onSystemChange);

  return () => {
    listeners.delete(onChange);
    media.removeEventListener('change', onSystemChange);
  };
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

// The server cannot know the visitor's theme; the inline script corrects the
// attribute before paint, and hydration is told to expect the mismatch.
function getServerSnapshot(): Theme {
  return 'light';
}

function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'dark' || stored === 'light' ? stored : null;
  } catch {
    return null;
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  listeners.forEach((listener) => listener());
}

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === 'dark';

  const toggle = useCallback(() => {
    const next: Theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* Private mode can refuse writes; the theme still applies for this visit. */
    }
    applyTheme(next);
  }, []);

  const label = `Switch to ${isDark ? 'light' : 'dark'} theme`;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={isDark}
      title={label}
      className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-surface text-slate-600 transition-colors hover:border-accent/40 hover:text-accent ${className}`}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
