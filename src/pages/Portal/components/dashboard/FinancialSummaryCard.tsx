
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

export const FinancialSummaryCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="mr-2 h-5 w-5" />
          Resumo Financeiro
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Total em aberto:</span>
            <span className="font-medium">R$ 5.800,00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Pagos (últimos 30 dias):</span>
            <span className="font-medium">R$ 3.200,00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Próximo vencimento:</span>
            <span className="font-medium">25/05/2023</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
