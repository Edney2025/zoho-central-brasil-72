
import React from 'react';
import { MenuItem } from './MenuItem';
import { LucideIcon } from 'lucide-react';

interface MenuItem {
  icon: LucideIcon;
  title: string;
  description: string;
  path: string;
  color?: string;
}

interface MenuSectionProps {
  title: string;
  items: MenuItem[];
}

export const MenuSection: React.FC<MenuSectionProps> = ({ title, items }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold border-b pb-2">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item, idx) => (
          <MenuItem 
            key={idx} 
            icon={item.icon} 
            title={item.title} 
            description={item.description} 
            path={item.path}
            color={item.color}
          />
        ))}
      </div>
    </div>
  );
};
