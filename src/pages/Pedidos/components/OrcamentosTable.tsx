
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, 
  FileText, 
  Download, 
  Clock,
  Check,
  X,
  AlertCircle
} from 'lucide-react';

interface Orcamento {
  id: string;
  cliente: string;
  valor: string;
  data: string;
  validade: string;
  status: string;
}

interface OrcamentosTableProps {
  orcamentos: Orcamento[];
}

const OrcamentosTable: React.FC<OrcamentosTableProps> = ({ orcamentos }) => {
  const navigate = useNavigate();
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'aprovado':
        return <Badge className="bg-green-500"><Check className="mr-1 h-3 w-3" /> Aprovado</Badge>;
      case 'reprovado':
        return <Badge className="bg-red-500"><X className="mr-1 h-3 w-3" /> Reprovado</Badge>;
      case 'pendente':
        return <Badge className="bg-yellow-500"><Clock className="mr-1 h-3 w-3" /> Pendente</Badge>;
      case 'vencido':
        return <Badge className="bg-gray-500"><AlertCircle className="mr-1 h-3 w-3" /> Vencido</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const handleViewDetails = (id: string) => {
    navigate(`/pedidos/orcamento/${id}`);
  };
  
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Número</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Validade</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orcamentos.length > 0 ? (
            orcamentos.map((orcamento) => (
              <TableRow key={orcamento.id}>
                <TableCell className="font-medium">{orcamento.id}</TableCell>
                <TableCell>{orcamento.cliente}</TableCell>
                <TableCell>{orcamento.data}</TableCell>
                <TableCell>{orcamento.validade}</TableCell>
                <TableCell>{orcamento.valor}</TableCell>
                <TableCell>{getStatusBadge(orcamento.status)}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleViewDetails(orcamento.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6">
                Nenhum orçamento encontrado
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrcamentosTable;
