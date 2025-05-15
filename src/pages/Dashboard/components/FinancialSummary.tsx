
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FinancialSummaryProps {
  data: {
    receitas: string;
    despesas: string;
    lucroLiquido: string;
    ticketMedio: string;
    taxaConversao: string;
    crescimento: string;
  };
}

export const FinancialSummary: React.FC<FinancialSummaryProps> = ({ data }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Receitas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{data.receitas}</p>
          <p className="text-xs text-muted-foreground mt-1">
            vs mês anterior {data.crescimento}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Despesas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{data.despesas}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Lucro Líquido</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-green-600">{data.lucroLiquido}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Ticket médio</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{data.ticketMedio}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Taxa de conversão</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{data.taxaConversao}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Crescimento</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-green-600">{data.crescimento}</p>
        </CardContent>
      </Card>
    </div>
  );
};
