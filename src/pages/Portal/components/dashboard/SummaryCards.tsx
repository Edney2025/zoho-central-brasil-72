
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, FileText, CreditCard } from 'lucide-react';

interface SummaryData {
  pedidosPendentes: number;
  pedidosConcluidos: number;
  orcamentosPendentes: number;
  orcamentosAprovados: number;
  proximoPagamento: {
    data: string;
    valor: string;
  };
}

interface SummaryCardsProps {
  summaryData: SummaryData;
  navigate: (path: string) => void;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ summaryData, navigate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5 text-primary" />
            Pedidos
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-3 mb-2">
            <div className="bg-muted/30 p-2 rounded-lg text-center">
              <p className="text-3xl font-bold">{summaryData.pedidosPendentes}</p>
              <p className="text-xs text-muted-foreground">Pendentes</p>
            </div>
            <div className="bg-muted/30 p-2 rounded-lg text-center">
              <p className="text-3xl font-bold">{summaryData.pedidosConcluidos}</p>
              <p className="text-xs text-muted-foreground">Concluídos</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button variant="link" className="p-0 h-auto text-sm" onClick={() => navigate('/portal/pedidos')}>
            Ver todos os pedidos
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <FileText className="mr-2 h-5 w-5 text-primary" />
            Orçamentos
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-3 mb-2">
            <div className="bg-muted/30 p-2 rounded-lg text-center">
              <p className="text-3xl font-bold">{summaryData.orcamentosPendentes}</p>
              <p className="text-xs text-muted-foreground">Pendentes</p>
            </div>
            <div className="bg-muted/30 p-2 rounded-lg text-center">
              <p className="text-3xl font-bold">{summaryData.orcamentosAprovados}</p>
              <p className="text-xs text-muted-foreground">Aprovados</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button variant="link" className="p-0 h-auto text-sm" onClick={() => navigate('/portal/orcamentos')}>
            Ver todos os orçamentos
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <CreditCard className="mr-2 h-5 w-5 text-primary" />
            Pagamentos
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2 mb-2">
            <div className="bg-muted/30 p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Próximo:</span>
                <span className="text-sm font-medium">{summaryData.proximoPagamento.data}</span>
              </div>
              <div className="text-xl font-bold mt-1">{summaryData.proximoPagamento.valor}</div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button variant="link" className="p-0 h-auto text-sm">
            Ver todos os pagamentos
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
