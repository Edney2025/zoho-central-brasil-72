
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Palette, Briefcase } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  
  const themes = [
    { name: 'light', icon: Sun, label: 'Claro' },
    { name: 'dark', icon: Moon, label: 'Escuro' },
    { name: 'corporate', icon: Briefcase, label: 'Corporativo' },
    { name: 'elegant', icon: Palette, label: 'Elegante' },
  ];
  
  const currentTheme = themes.find(t => t.name === theme) || themes[0];
  const Icon = currentTheme.icon;
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Icon className="h-4 w-4 mr-2" />
          {currentTheme.label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((t) => (
          <DropdownMenuItem 
            key={t.name}
            onClick={() => setTheme(t.name as any)}
          >
            <t.icon className="h-4 w-4 mr-2" />
            {t.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
