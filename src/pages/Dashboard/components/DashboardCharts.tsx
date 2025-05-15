
import React from 'react';
import { SalesChart } from './SalesChart';
import { CategoryPerformanceChart } from './CategoryPerformanceChart';

interface DashboardChartsProps {
  vendasMensais: Array<{ nome: string; valor: number }>;
  desempenhoCategorias: Array<{ nome: string; atual: number; anterior: number }>;
}

export const DashboardCharts = ({ vendasMensais, desempenhoCategorias }: DashboardChartsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <SalesChart data={vendasMensais} />
      <CategoryPerformanceChart data={desempenhoCategorias} />
    </div>
  );
};
