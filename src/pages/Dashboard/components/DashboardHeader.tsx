
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock, TrendingUp } from 'lucide-react';

export const DashboardHeader = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
      <h1 className="text-3xl font-bold">Dashboard Analítico</h1>
      <div className="flex gap-2">
        <Button variant="outline">
          <Clock className="mr-2 h-4 w-4" /> Últimos 30 dias
        </Button>
        <Button variant="outline">
          <TrendingUp className="mr-2 h-4 w-4" /> Gerar Relatório
        </Button>
      </div>
    </div>
  );
};
