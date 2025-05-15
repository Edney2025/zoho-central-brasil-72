
import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'corporate' | 'elegant';

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // When running in browser environment, check localStorage
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme;
      return savedTheme || 'light';
    }
    // Default for SSR or when localStorage is not available
    return 'light';
  });

  useEffect(() => {
    // Only run in browser environment
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    
      // Remove previous theme classes
      document.documentElement.classList.remove('light', 'dark', 'corporate', 'elegant');
      
      // Add new theme class
      document.documentElement.classList.add(theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
