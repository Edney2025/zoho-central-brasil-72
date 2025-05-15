
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface MenuItemProps { 
  icon: LucideIcon; 
  title: string; 
  description: string; 
  path: string;
  color?: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  path, 
  color = "bg-primary/10 dark:bg-primary/20"
}) => {
  const navigate = useNavigate();
  
  return (
    <Card 
      className="cursor-pointer transition-all hover:shadow-md hover:scale-[1.02] border-muted-foreground/20"
      onClick={() => navigate(path)}
    >
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className={`p-4 rounded-full ${color}`}>
            <Icon className="h-8 w-8 text-primary dark:text-primary" />
          </div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};
