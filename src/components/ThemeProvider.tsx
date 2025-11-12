import { useEffect } from 'react';
import { usePortfolioStore } from '@/lib/store';
import { hexToHsl } from '@/lib/theme-utils';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = usePortfolioStore((state) => state.portfolio.theme);

  useEffect(() => {
    const root = document.documentElement;

    const primaryHsl = hexToHsl(theme.primary);
    const accentHsl = hexToHsl(theme.accent);
    const backgroundHsl = hexToHsl(theme.background);
    const foregroundHsl = hexToHsl(theme.foreground);

    root.style.setProperty('--portfolio-primary', primaryHsl);
    root.style.setProperty('--portfolio-accent', accentHsl);
    root.style.setProperty('--portfolio-background', backgroundHsl);
    root.style.setProperty('--portfolio-foreground', foregroundHsl);
    root.style.setProperty('--portfolio-font-scale', theme.fontScale.toString());

    if (theme.mode === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else if (theme.mode === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
      }
    }
  }, [theme]);

  return <>{children}</>;
}
