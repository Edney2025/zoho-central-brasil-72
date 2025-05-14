
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

interface SalesData {
  nome: string;
  valor: number;
}

interface SalesChartProps {
  data: SalesData[];
}

export const SalesChart = ({ data }: SalesChartProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Vendas Mensais</CardTitle>
      <CardDescription>Evolução de vendas dos últimos 6 meses</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="h-80">
        <ChartContainer 
          config={{
            vendas: { theme: { light: '#3B82F6', dark: '#60A5FA' } }
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nome" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Bar dataKey="valor" fill="var(--color-vendas)" name="Vendas (R$)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </CardContent>
  </Card>
);
