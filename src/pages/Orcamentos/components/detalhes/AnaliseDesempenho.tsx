
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import { DashboardCharts } from '@/pages/Dashboard/components/DashboardCharts';

interface VendaMensal {
  nome: string;
  valor: number;
}

interface DesempenhoCategoria {
  nome: string;
  atual: number;
  anterior: number;
}

interface AnaliseDesempenhoProps {
  vendasMensais: VendaMensal[];
  desempenhoCategorias: DesempenhoCategoria[];
}

export const AnaliseDesempenho: React.FC<AnaliseDesempenhoProps> = ({ 
  vendasMensais, 
  desempenhoCategorias 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-primary" />
          Análise de Desempenho
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DashboardCharts 
          vendasMensais={vendasMensais}
          desempenhoCategorias={desempenhoCategorias}
        />
      </CardContent>
    </Card>
  );
};
