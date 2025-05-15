
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Download,
  FileText,
  ThumbsUp,
  ThumbsDown,
  Clock,
  AlertCircle,
  Check,
  X,
  Calendar,
  Eye
} from 'lucide-react';

// Mock data for the quotes
const orcamentosExemplo = [
  { 
    id: 'ORC001', 
    cliente: 'Empresa XYZ Inc', 
    valor: 'R$ 22.500,00', 
    data: '10/05/2023', 
    validade: '10/06/2023', 
    status: 'pendente',
    items: [
      { nome: 'Serviço A', quantidade: 1, valor: 'R$ 10.000,00' },
      { nome: 'Produto B', quantidade: 5, valor: 'R$ 12.500,00' }
    ],
    condicoesPagamento: 'Parcelado em 3x',
    observacoes: 'Entrega em 30 dias após aprovação.'
  },
  { 
    id: 'ORC002', 
    cliente: 'Pedro Almeida', 
    valor: 'R$ 7.800,00', 
    data: '12/05/2023', 
    validade: '12/06/2023', 
    status: 'aprovado',
    items: [
      { nome: 'Serviço C', quantidade: 2, valor: 'R$ 3.800,00' },
      { nome: 'Produto D', quantidade: 1, valor: 'R$ 4.000,00' }
    ],
    condicoesPagamento: 'À vista',
    observacoes: 'Pedido convertido em #PED002.'
  },
  { 
    id: 'ORC003', 
    cliente: 'Ana Ferreira', 
    valor: 'R$ 9.200,00', 
    data: '14/05/2023', 
    validade: '14/06/2023', 
    status: 'reprovado',
    items: [
      { nome: 'Serviço E', quantidade: 1, valor: 'R$ 5.200,00' },
      { nome: 'Produto F', quantidade: 2, valor: 'R$ 4.000,00' }
    ],
    condicoesPagamento: 'Parcelado em 2x',
    observacoes: 'Cliente solicitou renegociação dos valores.'
  },
  { 
    id: 'ORC004', 
    cliente: 'Empresa ABC', 
    valor: 'R$ 15.300,00', 
    data: '18/05/2023', 
    validade: '18/06/2023', 
    status: 'pendente',
    items: [
      { nome: 'Serviço G', quantidade: 1, valor: 'R$ 8.300,00' },
      { nome: 'Produto H', quantidade: 2, valor: 'R$ 7.000,00' }
    ],
    condicoesPagamento: 'Parcelado em 4x',
    observacoes: 'Cliente solicitou prazo estendido de entrega.'
  },
];

const OrcamentosPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredOrcamentos = orcamentosExemplo.filter(orcamento => 
    orcamento.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    orcamento.valor.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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
  
  const viewOrcamentoDetails = (id: string) => {
    navigate(`/portal/orcamento/${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Meus Orçamentos</h1>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Buscar orçamentos..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Lista de Orçamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Validade</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrcamentos.length > 0 ? (
                  filteredOrcamentos.map((orcamento) => (
                    <TableRow key={orcamento.id}>
                      <TableCell className="font-medium">{orcamento.id}</TableCell>
                      <TableCell>{orcamento.data}</TableCell>
                      <TableCell>{orcamento.validade}</TableCell>
                      <TableCell>{orcamento.valor}</TableCell>
                      <TableCell>{getStatusBadge(orcamento.status)}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => viewOrcamentoDetails(orcamento.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      Nenhum orçamento encontrado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrcamentosPage;
