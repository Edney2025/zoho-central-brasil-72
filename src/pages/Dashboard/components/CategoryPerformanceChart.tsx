
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

interface CategoryData {
  nome: string;
  atual: number;
  anterior: number;
}

interface CategoryPerformanceChartProps {
  data: CategoryData[];
}

export const CategoryPerformanceChart = ({ data }: CategoryPerformanceChartProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Desempenho por Categoria</CardTitle>
      <CardDescription>Comparativo com o mês anterior</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="h-80">
        <ChartContainer 
          config={{
            atual: { theme: { light: '#22C55E', dark: '#4ADE80' } },
            anterior: { theme: { light: '#94A3B8', dark: '#64748B' } }
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nome" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="atual" stroke="var(--color-atual)" name="Mês Atual" />
              <Line type="monotone" dataKey="anterior" stroke="var(--color-anterior)" name="Mês Anterior" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </CardContent>
  </Card>
);
