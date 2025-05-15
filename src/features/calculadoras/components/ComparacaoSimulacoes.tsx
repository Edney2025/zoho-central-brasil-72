
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Simulacao } from '../types';
import EmptyState from './comparacao/EmptyState';
import CategoriaSimulacoes from './comparacao/CategoriaSimulacoes';

interface ComparacaoSimulacoesProps {
  simulacoes: Simulacao[];
  onRemove: (id: string) => void;
  onShare: (id: string) => void;
  onCreateOrcamento: (id: string) => void;
}

export const ComparacaoSimulacoes: React.FC<ComparacaoSimulacoesProps> = ({
  simulacoes,
  onRemove,
  onShare,
  onCreateOrcamento
}) => {
  if (!simulacoes.length) {
    return <EmptyState />;
  }

  // Agrupando simulações por categoria
  const simulacoesPorCategoria: Record<string, Simulacao[]> = {};
  
  simulacoes.forEach(sim => {
    if (!simulacoesPorCategoria[sim.categoria]) {
      simulacoesPorCategoria[sim.categoria] = [];
    }
    simulacoesPorCategoria[sim.categoria].push(sim);
  });

  return (
    <div className="space-y-6 mt-4">
      <Card>
        <CardHeader>
          <CardTitle>Comparação de Simulações</CardTitle>
          <CardDescription>
            Compare os valores e condições das simulações selecionadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          {Object.entries(simulacoesPorCategoria).map(([categoria, sims]) => (
            <CategoriaSimulacoes
              key={categoria}
              categoria={categoria}
              simulacoes={sims}
              onRemove={onRemove}
              onShare={onShare}
              onCreateOrcamento={onCreateOrcamento}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

