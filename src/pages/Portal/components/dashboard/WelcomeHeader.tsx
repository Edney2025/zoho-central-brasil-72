
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface WelcomeHeaderProps {
  userName: string;
  lastUpdated: string;
  onViewOrders: () => void;
}

export const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({
  userName,
  lastUpdated,
  onViewOrders
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold">Bem-vindo, {userName}</h1>
        <p className="text-muted-foreground">Última atualização: {lastUpdated}</p>
      </div>
      <Button onClick={onViewOrders}>
        Ver meus pedidos <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};
