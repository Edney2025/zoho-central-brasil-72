
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Simulacao } from '../types';
import { formatarMoeda } from '@/lib/utils';
import { 
  Download, 
  XCircle, 
  Share2, 
  FileText, 
  CheckCircle2 
} from 'lucide-react';

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
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Comparação de Simulações</CardTitle>
          <CardDescription>
            Selecione simulações para comparar os valores e condições.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32 border border-dashed rounded-md">
            <p className="text-muted-foreground">Nenhuma simulação selecionada</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Função para obter os nomes corretos dos campos por categoria
  const getCamposPorCategoria = (categoria: string) => {
    switch (categoria) {
      case 'produtos':
        return [
          { key: 'nome', label: 'Produto' },
          { key: 'quantidade', label: 'Qtd' },
          { key: 'valorUnitario', label: 'Valor Unit.', formato: 'moeda' },
          { key: 'estado', label: 'Estado' },
        ];
      case 'financiamentos':
        return [
          { key: 'tipo', label: 'Tipo' },
          { key: 'prazo', label: 'Prazo' },
          { key: 'valorFinanciado', label: 'Valor Financiado', formato: 'moeda' },
          { key: 'valorEntrada', label: 'Entrada', formato: 'moeda' },
          { key: 'cet', label: 'CET %' },
        ];
      case 'emprestimos':
        return [
          { key: 'tipo', label: 'Tipo' },
          { key: 'prazo', label: 'Prazo' },
          { key: 'valorSolicitado', label: 'Valor Solicitado', formato: 'moeda' },
          { key: 'valorLiberado', label: 'Valor Liberado', formato: 'moeda' },
          { key: 'cet', label: 'CET %' },
        ];
      case 'transportes':
        return [
          { key: 'tipo', label: 'Tipo' },
          { key: 'distancia', label: 'Distância' },
          { key: 'valorPorKm', label: 'Valor/Km', formato: 'moeda' },
        ];
      default:
        return [];
    }
  };

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
            <div key={categoria} className="mt-4">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <Badge variant="outline" className="mr-2">{categoria.charAt(0).toUpperCase() + categoria.slice(1)}</Badge>
                {sims.length} simulação(ões)
              </h3>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Data</TableHead>
                      {getCamposPorCategoria(categoria).map(campo => (
                        <TableHead key={campo.key}>{campo.label}</TableHead>
                      ))}
                      <TableHead>Parcelas</TableHead>
                      <TableHead>Taxa</TableHead>
                      <TableHead>Valor Parcela</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sims.map((sim) => (
                      <TableRow key={sim.id}>
                        <TableCell className="font-medium">{sim.titulo}</TableCell>
                        <TableCell>{sim.data.toLocaleDateString()}</TableCell>
                        
                        {getCamposPorCategoria(categoria).map(campo => {
                          // Obtém o valor da propriedade dinâmica
                          const valor = (sim as any)[campo.key];
                          
                          // Formata o valor conforme o tipo
                          let valorFormatado = valor;
                          if (campo.formato === 'moeda' && typeof valor === 'number') {
                            valorFormatado = formatarMoeda(valor);
                          } else if (campo.key === 'estado') {
                            valorFormatado = valor === 'novo' ? 'Novo' : 'Usado';
                          }
                          
                          return <TableCell key={campo.key}>{valorFormatado}</TableCell>;
                        })}
                        
                        <TableCell>{sim.parcelas || '-'}</TableCell>
                        <TableCell>{sim.taxaJuros ? `${sim.taxaJuros.toFixed(2)}%` : '-'}</TableCell>
                        <TableCell>{sim.valorParcela ? formatarMoeda(sim.valorParcela) : '-'}</TableCell>
                        <TableCell className="font-bold">{formatarMoeda(sim.valorTotal)}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              onClick={() => onShare(sim.id)}
                              title="Compartilhar"
                            >
                              <Share2 className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => onCreateOrcamento(sim.id)}
                              title="Criar Orçamento"
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => onRemove(sim.id)}
                              title="Remover da comparação"
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
