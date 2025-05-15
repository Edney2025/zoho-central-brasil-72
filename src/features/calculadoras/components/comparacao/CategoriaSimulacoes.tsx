
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Simulacao } from '../../types';
import { formatarMoeda } from '@/lib/utils';
import SimulacaoActions from './SimulacaoActions';
import { getCamposPorCategoria, CampoConfig } from '../../utils/camposCategorias';

interface CategoriaSimulacoesProps {
  categoria: string;
  simulacoes: Simulacao[];
  onRemove: (id: string) => void;
  onShare: (id: string) => void;
  onCreateOrcamento: (id: string) => void;
}

const CategoriaSimulacoes: React.FC<CategoriaSimulacoesProps> = ({
  categoria,
  simulacoes,
  onRemove,
  onShare,
  onCreateOrcamento
}) => {
  const campos = getCamposPorCategoria(categoria);
  
  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium mb-2 flex items-center">
        <Badge variant="outline" className="mr-2">{categoria.charAt(0).toUpperCase() + categoria.slice(1)}</Badge>
        {simulacoes.length} simulação(ões)
      </h3>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Data</TableHead>
              {campos.map(campo => (
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
            {simulacoes.map((sim) => (
              <TableRow key={sim.id}>
                <TableCell className="font-medium">{sim.titulo}</TableCell>
                <TableCell>{sim.data.toLocaleDateString()}</TableCell>
                
                {campos.map(campo => {
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
                  <SimulacaoActions 
                    id={sim.id}
                    onShare={onShare}
                    onCreateOrcamento={onCreateOrcamento}
                    onRemove={onRemove}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CategoriaSimulacoes;
