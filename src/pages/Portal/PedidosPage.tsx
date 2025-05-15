
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Search, 
  Download, 
  FileText, 
  Check, 
  X, 
  Clock,
  ChevronRight,
  CheckCircle2,
  TrendingUp,
  Filter,
  Printer
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

// Mock data for the orders
const pedidosExemplo = [
  { 
    id: 'PED001', 
    data: '15/05/2023',
    valor: 'R$ 12.500,00',
    status: 'aprovado', 
    produtos: [
      { nome: 'Produto A', quantidade: 5, valor: 'R$ 2.500,00' },
      { nome: 'Produto B', quantidade: 2, valor: 'R$ 10.000,00' }
    ],
    entrega: '30/05/2023',
    pagamento: 'À vista',
    comentarios: 'Pedido aprovado. Em produção.'
  },
  { 
    id: 'PED002', 
    data: '18/05/2023',
    valor: 'R$ 5.800,00', 
    status: 'pendente',
    produtos: [
      { nome: 'Produto C', quantidade: 3, valor: 'R$ 1.800,00' },
      { nome: 'Produto D', quantidade: 1, valor: 'R$ 4.000,00' }
    ],
    entrega: '02/06/2023',
    pagamento: 'Parcelado (3x)',
    comentarios: 'Aguardando aprovação.'
  },
  { 
    id: 'PED003', 
    data: '20/05/2023',
    valor: 'R$ 8.200,00', 
    status: 'concluido',
    produtos: [
      { nome: 'Produto E', quantidade: 2, valor: 'R$ 3.200,00' },
      { nome: 'Produto F', quantidade: 1, valor: 'R$ 5.000,00' }
    ],
    entrega: '25/05/2023',
    pagamento: 'À vista',
    comentarios: 'Pedido entregue e concluído.'
  }
];

interface StatusStepProps {
  status: 'aprovado' | 'pendente' | 'concluido' | 'reprovado' | 'processando';
}

const StatusStep: React.FC<StatusStepProps> = ({ status }) => {
  const steps = [
    { label: 'Pedido Recebido', complete: true },
    { label: 'Aprovado', complete: status !== 'pendente' && status !== 'reprovado' },
    { label: 'Em Produção', complete: status === 'processando' || status === 'concluido' },
    { label: 'Enviado', complete: status === 'concluido' },
    { label: 'Entregue', complete: status === 'concluido' }
  ];
  
  if (status === 'reprovado') {
    return (
      <div className="px-4 py-2 bg-red-50 border border-red-200 rounded-md text-red-700">
        <div className="flex items-center mb-2">
          <X className="h-5 w-5 mr-2" />
          <span className="font-medium">Pedido Reprovado</span>
        </div>
        <p className="text-sm">Este pedido foi reprovado e não será processado.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="relative flex items-center justify-between">
        <div className="absolute h-1 bg-muted w-full top-4 -z-10" />
        
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div 
              className={`h-8 w-8 rounded-full flex items-center justify-center ${
                step.complete 
                  ? 'bg-green-600 text-white' 
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {step.complete ? <Check className="h-5 w-5" /> : index + 1}
            </div>
            <span className="text-xs mt-1 text-center max-w-[70px]">{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const PedidosPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPedido, setSelectedPedido] = useState<typeof pedidosExemplo[0] | null>(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [activeTab, setActiveTab] = useState('todos');
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  
  const filteredPedidos = pedidosExemplo.filter(pedido => {
    // Apply status filter
    if (activeTab !== 'todos' && pedido.status !== activeTab) {
      return false;
    }
    
    // Apply search filter
    if (
      !pedido.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !pedido.valor.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !pedido.data.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    
    // Apply date filter
    if (selectedDate) {
      const pedidoDate = new Date(pedido.data.split('/').reverse().join('-'));
      const filterDate = new Date(selectedDate);
      
      if (
        pedidoDate.getDate() !== filterDate.getDate() ||
        pedidoDate.getMonth() !== filterDate.getMonth() ||
        pedidoDate.getFullYear() !== filterDate.getFullYear()
      ) {
        return false;
      }
    }
    
    return true;
  });
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'aprovado':
        return <Badge className="bg-green-500"><Check className="mr-1 h-3 w-3" /> Aprovado</Badge>;
      case 'reprovado':
        return <Badge className="bg-red-500"><X className="mr-1 h-3 w-3" /> Reprovado</Badge>;
      case 'pendente':
        return <Badge className="bg-yellow-500"><Clock className="mr-1 h-3 w-3" /> Pendente</Badge>;
      case 'concluido':
        return <Badge className="bg-blue-500"><CheckCircle2 className="mr-1 h-3 w-3" /> Concluído</Badge>;
      case 'processando':
        return <Badge className="bg-purple-500"><TrendingUp className="mr-1 h-3 w-3" /> Processando</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const viewPedidoDetails = (pedido: typeof pedidosExemplo[0]) => {
    setSelectedPedido(pedido);
    setOpenDetails(true);
  };

  const handleDownloadPdf = (pedidoId: string) => {
    setIsGeneratingPdf(true);
    
    // Simulate PDF generation delay
    setTimeout(() => {
      toast({
        title: "PDF Gerado",
        description: `O PDF do pedido ${pedidoId} foi gerado com sucesso.`
      });
      setIsGeneratingPdf(false);
    }, 1500);
  };
  
  const handlePrintPedido = () => {
    toast({
      title: "Impressão iniciada",
      description: "O documento foi enviado para impressão."
    });
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setShowDateFilter(false);
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDate(undefined);
    setActiveTab('todos');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Meus Pedidos</h1>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Opções de Exportação</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleDownloadPdf('todos')}>
              <FileText className="mr-2 h-4 w-4" />
              Exportar todos como PDF
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="mr-2 h-4 w-4" />
              Exportar como CSV
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar pedidos..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Popover open={showDateFilter} onOpenChange={setShowDateFilter}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              {selectedDate ? new Date(selectedDate).toLocaleDateString('pt-BR') : "Filtrar por data"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              initialFocus
            />
            <div className="p-3 border-t">
              <Button variant="ghost" size="sm" onClick={() => setSelectedDate(undefined)} className="w-full">
                Limpar data
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        
        {(searchTerm || selectedDate || activeTab !== 'todos') && (
          <Button variant="ghost" size="icon" onClick={clearFilters} className="sm:hidden">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {(searchTerm || selectedDate || activeTab !== 'todos') && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filtros ativos:</span>
          {searchTerm && (
            <Badge variant="outline" className="flex items-center gap-1">
              Busca: {searchTerm}
              <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setSearchTerm('')} />
            </Badge>
          )}
          {selectedDate && (
            <Badge variant="outline" className="flex items-center gap-1">
              Data: {new Date(selectedDate).toLocaleDateString('pt-BR')}
              <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setSelectedDate(undefined)} />
            </Badge>
          )}
          {activeTab !== 'todos' && (
            <Badge variant="outline" className="flex items-center gap-1">
              Status: {activeTab}
              <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setActiveTab('todos')} />
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={clearFilters} className="ml-auto hidden sm:flex">
            Limpar filtros
          </Button>
        </div>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Lista de Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList>
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="pendente">Pendentes</TabsTrigger>
              <TabsTrigger value="aprovado">Aprovados</TabsTrigger>
              <TabsTrigger value="concluido">Concluídos</TabsTrigger>
            </TabsList>
            
            <div className="mt-4">
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
                      <TableRow key={pedido.id} className="cursor-pointer" onClick={() => viewPedidoDetails(pedido)}>
                        <TableCell className="font-medium">{pedido.id}</TableCell>
                        <TableCell>{pedido.data}</TableCell>
                        <TableCell>{pedido.valor}</TableCell>
                        <TableCell>{getStatusBadge(pedido.status)}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={(e) => {
                              e.stopPropagation();
                              viewPedidoDetails(pedido);
                            }}
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownloadPdf(pedido.id);
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
            </div>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Order Details Dialog */}
      <Dialog open={openDetails} onOpenChange={setOpenDetails}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes do Pedido {selectedPedido?.id}</DialogTitle>
          </DialogHeader>
          
          {selectedPedido && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Informações do Pedido</h3>
                  <div className="bg-muted/30 p-3 rounded-md space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Número:</span>
                      <span className="text-sm font-medium">{selectedPedido.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Data:</span>
                      <span className="text-sm font-medium">{selectedPedido.data}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Valor Total:</span>
                      <span className="text-sm font-medium">{selectedPedido.valor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Forma de Pagamento:</span>
                      <span className="text-sm font-medium">{selectedPedido.pagamento}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Previsão de Entrega:</span>
                      <span className="text-sm font-medium">{selectedPedido.entrega}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Status do Pedido</h3>
                  <div className="bg-muted/30 p-3 rounded-md">
                    <div className="mb-2 flex items-center">
                      <span className="font-medium mr-2">Status:</span>
                      {getStatusBadge(selectedPedido.status)}
                    </div>
                    
                    <StatusStep status={selectedPedido.status as any} />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Produtos</h3>
                <div className="bg-muted/30 rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Produto</TableHead>
                        <TableHead className="text-center">Quantidade</TableHead>
                        <TableHead className="text-right">Valor</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedPedido.produtos.map((produto, index) => (
                        <TableRow key={index}>
                          <TableCell>{produto.nome}</TableCell>
                          <TableCell className="text-center">{produto.quantidade}</TableCell>
                          <TableCell className="text-right">{produto.valor}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Comentários</h3>
                <div className="bg-muted/30 p-3 rounded-md">
                  <p className="text-sm">{selectedPedido.comentarios}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 justify-between">
                <div className="space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => handleDownloadPdf(selectedPedido.id)}
                    disabled={isGeneratingPdf}
                  >
                    <Download className="mr-2 h-4 w-4" /> Baixar PDF
                  </Button>
                  <Button variant="outline" onClick={handlePrintPedido}>
                    <Printer className="mr-2 h-4 w-4" /> Imprimir
                  </Button>
                </div>
                <Button onClick={() => setOpenDetails(false)}>
                  Fechar <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PedidosPage;
