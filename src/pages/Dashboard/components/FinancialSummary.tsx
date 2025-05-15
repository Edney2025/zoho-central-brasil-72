
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface FinancialSummaryProps {
  resumoFinanceiro: {
    receitaTotal: string;
    receitaMensal: string;
    pedidosAceitos: number;
    pedidosPendentes: number;
    ticketMedio: string;
  };
}

export const FinancialSummary = ({ resumoFinanceiro }: FinancialSummaryProps) => {
  return (
    <Card className="border-primary/20">
      <CardHeader className="bg-primary/5">
        <CardTitle className="text-lg flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-primary" />
          Resumo Financeiro
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-muted/30 p-3 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Receita Total</p>
            <p className="text-2xl font-bold">{resumoFinanceiro.receitaTotal}</p>
          </div>
          <div className="bg-muted/30 p-3 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Pedidos Aceitos</p>
            <p className="text-2xl font-bold">{resumoFinanceiro.pedidosAceitos}</p>
          </div>
          <div className="bg-muted/30 p-3 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Pedidos Pendentes</p>
            <p className="text-2xl font-bold">{resumoFinanceiro.pedidosPendentes}</p>
          </div>
          <div className="bg-muted/30 p-3 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Ticket Médio</p>
            <p className="text-2xl font-bold">{resumoFinanceiro.ticketMedio}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
