
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { Pedido } from '../../hooks/usePedidosData';

interface PedidosTableProps {
  filteredPedidos: Pedido[];
  onViewDetails: (pedido: Pedido) => void;
  onDownloadPdf: (id: string) => void;
  isGeneratingPdf: boolean;
}

export const PedidosTable: React.FC<PedidosTableProps> = ({ 
  filteredPedidos, 
  onViewDetails, 
  onDownloadPdf,
  isGeneratingPdf
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Número</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredPedidos.length > 0 ? (
          filteredPedidos.map((pedido) => (
            <TableRow key={pedido.id} className="cursor-pointer" onClick={() => onViewDetails(pedido)}>
              <TableCell className="font-medium">{pedido.id}</TableCell>
              <TableCell>{pedido.data}</TableCell>
              <TableCell>{pedido.valor}</TableCell>
              <TableCell>
                <StatusBadge status={pedido.status} />
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewDetails(pedido);
                  }}
                >
                  <FileText className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDownloadPdf(pedido.id);
                  }}
                  disabled={isGeneratingPdf}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-6">
              Nenhum pedido encontrado
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
