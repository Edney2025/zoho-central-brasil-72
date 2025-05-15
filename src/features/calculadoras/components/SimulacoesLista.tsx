
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Share2, 
  FileText, 
  Trash2, 
  Clock, 
  Calendar, 
  DollarSign 
} from 'lucide-react';
import { Simulacao } from '../types';
import { formatarMoeda } from '@/lib/utils';

interface SimulacoesListaProps {
  simulacoes: Simulacao[];
  selectedIds: string[];
  onSelect: (id: string) => void;
  onShare: (id: string) => void;
  onCreateOrcamento: (id: string) => void;
  onRemove: (id: string) => void;
}

export const SimulacoesLista: React.FC<SimulacoesListaProps> = ({
  simulacoes,
  selectedIds,
  onSelect,
  onShare,
  onCreateOrcamento,
  onRemove
}) => {
  if (!simulacoes.length) {
    return (
      <Card>
        <CardContent className="py-6">
          <div className="flex flex-col items-center justify-center text-center p-4">
            <Clock className="h-12 w-12 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">Nenhuma simulação salva.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Ordenar simulações pela data mais recente
  const sortedSimulacoes = [...simulacoes].sort((a, b) => 
    new Date(b.data).getTime() - new Date(a.data).getTime()
  );

  const getCategoriaLabel = (categoria: string) => {
    const labels = {
      'produtos': 'Produtos',
      'financiamentos': 'Financiamentos',
      'emprestimos': 'Empréstimos',
      'transportes': 'Transportes',
      'servicos': 'Serviços',
      'garantias': 'Garantias',
      'outros': 'Outros',
    };
    return labels[categoria as keyof typeof labels] || categoria;
  };

  return (
    <ScrollArea className="h-[500px]">
      <div className="p-1 space-y-4">
        {sortedSimulacoes.map((simulacao) => (
          <Card key={simulacao.id} className={`border ${selectedIds.includes(simulacao.id) ? 'border-primary' : ''}`}>
            <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    checked={selectedIds.includes(simulacao.id)}
                    onCheckedChange={() => onSelect(simulacao.id)}
                    id={`select-${simulacao.id}`}
                  />
                  <CardTitle className="text-lg">{simulacao.titulo}</CardTitle>
                </div>
                <CardDescription className="flex items-center mt-1">
                  <Badge variant="outline" className="mr-2">
                    {getCategoriaLabel(simulacao.categoria)}
                  </Badge>
                  <Calendar className="h-3 w-3 mr-1" /> 
                  {new Date(simulacao.data).toLocaleDateString()}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Valor Total</span>
                  <span className="font-medium text-lg flex items-center">
                    <DollarSign className="h-4 w-4 mr-1 text-green-600" /> 
                    {formatarMoeda(simulacao.valorTotal)}
                  </span>
                </div>
                {simulacao.parcelas && simulacao.valorParcela && (
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">
                      Parcelas ({simulacao.parcelas}x)
                    </span>
                    <span className="font-medium">
                      {formatarMoeda(simulacao.valorParcela)}
                    </span>
                  </div>
                )}
              </div>

              {/* Informações específicas por categoria */}
              {simulacao.categoria === 'produtos' && (
                <div className="grid grid-cols-2 gap-2 mt-2 text-sm border-t pt-2">
                  <div>
                    <span className="text-muted-foreground">Produto:</span>{' '}
                    {(simulacao as any).nome}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Estado:</span>{' '}
                    {(simulacao as any).estado === 'novo' ? 'Novo' : 'Usado'}
                  </div>
                </div>
              )}

              {simulacao.categoria === 'financiamentos' && (
                <div className="grid grid-cols-2 gap-2 mt-2 text-sm border-t pt-2">
                  <div>
                    <span className="text-muted-foreground">Tipo:</span>{' '}
                    {(simulacao as any).tipo}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Prazo:</span>{' '}
                    {(simulacao as any).prazo} meses
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">CET:</span>{' '}
                    {(simulacao as any).cet.toFixed(2)}%
                  </div>
                </div>
              )}

              {simulacao.categoria === 'emprestimos' && (
                <div className="grid grid-cols-2 gap-2 mt-2 text-sm border-t pt-2">
                  <div>
                    <span className="text-muted-foreground">Tipo:</span>{' '}
                    {(simulacao as any).tipo}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Prazo:</span>{' '}
                    {(simulacao as any).prazo} meses
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <div className="flex justify-between w-full">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onShare(simulacao.id)}
                >
                  <Share2 className="h-3.5 w-3.5 mr-1" /> Compartilhar
                </Button>
                <div className="space-x-1">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onCreateOrcamento(simulacao.id)}
                  >
                    <FileText className="h-3.5 w-3.5 mr-1" /> Orçamento
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => onRemove(simulacao.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1" /> Excluir
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};
