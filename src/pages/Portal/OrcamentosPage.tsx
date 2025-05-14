
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
  Calendar
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrcamento, setSelectedOrcamento] = useState<typeof orcamentosExemplo[0] | null>(null);
  const [openDetails, setOpenDetails] = useState(false);
  
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
  
  const viewOrcamentoDetails = (orcamento: typeof orcamentosExemplo[0]) => {
    setSelectedOrcamento(orcamento);
    setOpenDetails(true);
  };

  const handleApproveQuote = () => {
    // In a real application, this would make an API call to update the quote status
    toast({
      title: "Orçamento aprovado",
      description: "Em breve nossa equipe entrará em contato para os próximos passos.",
    });
    setOpenDetails(false);
  };

  const handleRejectQuote = () => {
    // In a real application, this would make an API call to update the quote status
    toast({
      title: "Orçamento reprovado",
      description: "Você pode solicitar um novo orçamento a qualquer momento.",
    });
    setOpenDetails(false);
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
                          onClick={() => viewOrcamentoDetails(orcamento)}
                        >
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
      
      {/* Quote Details Dialog */}
      <Dialog open={openDetails} onOpenChange={setOpenDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Orçamento {selectedOrcamento?.id}</DialogTitle>
          </DialogHeader>
          
          {selectedOrcamento && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Informações do Orçamento</h3>
                  <div className="bg-muted/30 p-3 rounded-md space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Número:</span>
                      <span className="text-sm font-medium">{selectedOrcamento.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Data:</span>
                      <span className="text-sm font-medium">{selectedOrcamento.data}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Valor Total:</span>
                      <span className="text-sm font-medium">{selectedOrcamento.valor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Condições de Pagamento:</span>
                      <span className="text-sm font-medium">{selectedOrcamento.condicoesPagamento}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Status do Orçamento</h3>
                  <div className="bg-muted/30 p-3 rounded-md space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-sm mr-2">Status:</span>
                        {getStatusBadge(selectedOrcamento.status)}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="text-sm">Válido até: {selectedOrcamento.validade}</span>
                      </div>
                    </div>
                    
                    {selectedOrcamento.status === 'pendente' && (
                      <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-md flex items-center">
                        <AlertCircle className="h-5 w-5 mr-2" />
                        <div>
                          <p className="text-sm font-medium">Aguardando sua aprovação</p>
                          <p className="text-xs">Você pode aprovar ou rejeitar este orçamento.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Itens do Orçamento</h3>
                <div className="bg-muted/30 rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead className="text-center">Quantidade</TableHead>
                        <TableHead className="text-right">Valor</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrcamento.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.nome}</TableCell>
                          <TableCell className="text-center">{item.quantidade}</TableCell>
                          <TableCell className="text-right">{item.valor}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Observações</h3>
                <div className="bg-muted/30 p-3 rounded-md">
                  <p className="text-sm">{selectedOrcamento.observacoes}</p>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" /> Baixar PDF
                </Button>
                
                {selectedOrcamento.status === 'pendente' ? (
                  <div className="space-x-2">
                    <Button variant="outline" onClick={handleRejectQuote}>
                      <ThumbsDown className="mr-2 h-4 w-4" /> Rejeitar
                    </Button>
                    <Button onClick={handleApproveQuote}>
                      <ThumbsUp className="mr-2 h-4 w-4" /> Aprovar
                    </Button>
                  </div>
                ) : (
                  <Button onClick={() => setOpenDetails(false)}>
                    Fechar
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrcamentosPage;
