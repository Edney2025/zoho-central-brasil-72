import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Download,
  Check,
  X,
  Clock,
  AlertCircle,
  Eye,
  PlusCircle,
  Filter,
} from 'lucide-react';
import { localStorageService } from '@/services/localStorageService';
import BuscaAvancada from './components/BuscaAvancada';
import { toast } from '@/components/ui/use-toast';

// Exemplo de dados para inicialização
const orcamentosExemplo = [
  { 
    id: 'ORC001', 
    cliente: {
      nome: 'Empresa XYZ Inc',
      email: 'contato@xyz.com',
      telefone: '(11) 98765-4321',
      endereco: 'Av. Paulista, 1000, São Paulo - SP'
    },
    valor: 'R$ 22.500,00', 
    data: '10/05/2023', 
    validade: '10/06/2023', 
    status: 'pendente',
    items: [
      { id: 'ITEM001', nome: 'Serviço de Consultoria', quantidade: 1, valorUnitario: 'R$ 10.000,00', valorTotal: 'R$ 10.000,00' },
      { id: 'ITEM002', nome: 'Licença de Software Premium', quantidade: 5, valorUnitario: 'R$ 2.500,00', valorTotal: 'R$ 12.500,00' }
    ],
    historico: [
      { data: '10/05/2023 10:30', evento: 'Orçamento criado', usuario: 'Carlos Silva' },
      { data: '11/05/2023 14:15', evento: 'Email enviado ao cliente', usuario: 'Ana Torres' },
      { data: '13/05/2023 09:22', evento: 'Cliente visualizou o orçamento', usuario: 'Sistema' }
    ],
    condicoesPagamento: 'Parcelado em 3x sem juros',
    observacoes: 'Entrega em até 30 dias após aprovação. Inclui treinamento básico para até 5 usuários.',
    anexos: [
      { nome: 'Proposta_Detalhada.pdf', tamanho: '1.2 MB' },
      { nome: 'Termos_Servico.pdf', tamanho: '450 KB' }
    ]
  },
  { 
    id: 'ORC002', 
    cliente: {
      nome: 'Pedro Almeida',
      email: 'pedro@email.com',
      telefone: '(21) 97654-3210',
      endereco: 'Rua das Flores, 123, Rio de Janeiro - RJ'
    },
    valor: 'R$ 7.800,00', 
    data: '12/05/2023', 
    validade: '12/06/2023', 
    status: 'aprovado',
    items: [
      { id: 'ITEM003', nome: 'Consultoria Técnica', quantidade: 2, valorUnitario: 'R$ 1.900,00', valorTotal: 'R$ 3.800,00' },
      { id: 'ITEM004', nome: 'Sistema ERP - Licença Anual', quantidade: 1, valorUnitario: 'R$ 4.000,00', valorTotal: 'R$ 4.000,00' }
    ],
    historico: [
      { data: '12/05/2023 11:20', evento: 'Orçamento criado', usuario: 'Ana Torres' },
      { data: '12/05/2023 15:45', evento: 'Email enviado ao cliente', usuario: 'Ana Torres' },
      { data: '14/05/2023 10:30', evento: 'Cliente aprovou o orçamento', usuario: 'Sistema' },
      { data: '14/05/2023 14:15', evento: 'Pedido #PED002 gerado', usuario: 'Sistema' }
    ],
    condicoesPagamento: 'À vista com 5% de desconto',
    observacoes: 'Implementação imediata após confirmação do pagamento.',
    anexos: [
      { nome: 'Contrato_Servico.pdf', tamanho: '2.1 MB' }
    ]
  },
  { 
    id: 'ORC003', 
    cliente: {
      nome: 'Ana Ferreira',
      email: 'ana@ferreira.com',
      telefone: '(31) 98877-6655',
      endereco: 'Av. Central, 500, Belo Horizonte - MG'
    },
    valor: 'R$ 9.200,00', 
    data: '14/05/2023', 
    validade: '14/06/2023', 
    status: 'reprovado',
    items: [
      { id: 'ITEM005', nome: 'Desenvolvimento Web', quantidade: 1, valorUnitario: 'R$ 5.200,00', valorTotal: 'R$ 5.200,00' },
      { id: 'ITEM006', nome: 'Hospedagem Premium (Anual)', quantidade: 2, valorUnitario: 'R$ 2.000,00', valorTotal: 'R$ 4.000,00' }
    ],
    historico: [
      { data: '14/05/2023 09:10', evento: 'Orçamento criado', usuario: 'Carlos Silva' },
      { data: '14/05/2023 10:30', evento: 'Email enviado ao cliente', usuario: 'Ana Torres' },
      { data: '18/05/2023 16:45', evento: 'Cliente rejeitou o orçamento', usuario: 'Sistema' },
      { data: '19/05/2023 11:20', evento: 'Feedback registrado: Valor acima do orçado pelo cliente', usuario: 'Carlos Silva' }
    ],
    condicoesPagamento: 'Parcelado em 2x sem juros',
    observacoes: 'Cliente solicitou renegociação dos valores. Aguardando retorno para novo orçamento.',
    anexos: [
      { nome: 'Especificacoes_Tecnicas.pdf', tamanho: '1.8 MB' },
      { nome: 'Cronograma_Projeto.pdf', tamanho: '550 KB' }
    ]
  },
  { 
    id: 'ORC004', 
    cliente: {
      nome: 'Empresa ABC Ltda',
      email: 'financeiro@abc.com',
      telefone: '(11) 3322-1100',
      endereco: 'Rua Comercial, 200, São Paulo - SP'
    },
    valor: 'R$ 15.300,00', 
    data: '18/05/2023', 
    validade: '18/06/2023', 
    status: 'pendente',
    items: [
      { id: 'ITEM007', nome: 'Consultoria Estratégica', quantidade: 1, valorUnitario: 'R$ 8.300,00', valorTotal: 'R$ 8.300,00' },
      { id: 'ITEM008', nome: 'Treinamento Personalizado', quantidade: 2, valorUnitario: 'R$ 3.500,00', valorTotal: 'R$ 7.000,00' }
    ],
    historico: [
      { data: '18/05/2023 14:20', evento: 'Orçamento criado', usuario: 'Ana Torres' },
      { data: '18/05/2023 16:30', evento: 'Email enviado ao cliente', usuario: 'Ana Torres' },
      { data: '20/05/2023 09:45', evento: 'Cliente visualizou o orçamento', usuario: 'Sistema' },
      { data: '21/05/2023 11:10', evento: 'Cliente solicitou reunião', usuario: 'Carlos Silva' }
    ],
    condicoesPagamento: 'Entrada de 30% + 3x sem juros',
    observacoes: 'Cliente solicitou reunião para esclarecimentos adicionais. Agendada para 25/05.',
    anexos: [
      { nome: 'Proposta_Detalhada.pdf', tamanho: '2.4 MB' },
      { nome: 'Apresentacao_Servicos.pdf', tamanho: '1.8 MB' }
    ]
  }
];

const OrcamentosPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [orcamentos, setOrcamentos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtrosAvancados, setFiltrosAvancados] = useState<any>(null);
  
  useEffect(() => {
    // Verificar se já existem orçamentos no localStorage
    const savedOrcamentos = localStorageService.getData('orcamentos');
    
    if (!savedOrcamentos) {
      // Se não existir, inicializar com os dados de exemplo
      localStorageService.setData('orcamentos', orcamentosExemplo);
      setOrcamentos(orcamentosExemplo);
    } else {
      setOrcamentos(savedOrcamentos);
    }
    
    setLoading(false);
  }, []);
  
  const filteredOrcamentos = orcamentos.filter(orcamento => {
    // Filtro básico de busca
    const matchesSearch = searchTerm === '' || 
                        orcamento.cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        orcamento.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        orcamento.valor.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtro de status
    const matchesStatus = statusFilter === null || orcamento.status === statusFilter;
    
    // Filtros avançados
    let matchesFiltrosAvancados = true;
    
    if (filtrosAvancados) {
      // Filtro de cliente
      if (filtrosAvancados.cliente && !orcamento.cliente.nome.toLowerCase().includes(filtrosAvancados.cliente.toLowerCase())) {
        matchesFiltrosAvancados = false;
      }
      
      // Filtros de valor
      const valorNumerico = parseFloat(orcamento.valor.replace(/[^\d,]/g, '').replace(',', '.'));
      
      if (filtrosAvancados.valorMinimo && valorNumerico < parseFloat(filtrosAvancados.valorMinimo.replace(/[^\d,]/g, '').replace(',', '.'))) {
        matchesFiltrosAvancados = false;
      }
      
      if (filtrosAvancados.valorMaximo && valorNumerico > parseFloat(filtrosAvancados.valorMaximo.replace(/[^\d,]/g, '').replace(',', '.'))) {
        matchesFiltrosAvancados = false;
      }
      
      // Filtro de forma de pagamento
      if (filtrosAvancados.formaPagamento && 
          !orcamento.condicoesPagamento.toLowerCase().includes(filtrosAvancados.formaPagamento.toLowerCase())) {
        matchesFiltrosAvancados = false;
      }
      
      // Filtros de data
      if (filtrosAvancados.dataInicio || filtrosAvancados.dataFim) {
        const dataParts = orcamento.data.split('/');
        const orcamentoDate = new Date(dataParts[2], dataParts[1] - 1, dataParts[0]);
        
        if (filtrosAvancados.dataInicio && orcamentoDate < filtrosAvancados.dataInicio) {
          matchesFiltrosAvancados = false;
        }
        
        if (filtrosAvancados.dataFim && orcamentoDate > filtrosAvancados.dataFim) {
          matchesFiltrosAvancados = false;
        }
      }
    }
    
    return matchesSearch && matchesStatus && matchesFiltrosAvancados;
  });
  
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
  
  const handleStatusFilter = (status: string | null) => {
    setStatusFilter(status === statusFilter ? null : status);
  };

  const handleAddNewOrcamento = () => {
    navigate('/orcamentos/novo');
  };

  const handleFilterChange = (filtros: any) => {
    setFiltrosAvancados(filtros);
    toast({
      title: "Filtros aplicados",
      description: "A lista de orçamentos foi filtrada com os critérios selecionados.",
    });
  };
  
  const handleDownloadOrcamento = (id: string) => {
    toast({
      title: "Download iniciado",
      description: `O orçamento ${id} será baixado em PDF.`,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Orçamentos</h1>
        <Button onClick={handleAddNewOrcamento}>
          <PlusCircle className="mr-2 h-4 w-4" /> Novo Orçamento
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar por cliente, número ou valor..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="md:col-span-2 flex items-center gap-2 justify-end">
          <BuscaAvancada onFilterChange={handleFilterChange} />
          
          <Button 
            variant={statusFilter === 'pendente' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleStatusFilter('pendente')}
          >
            <Clock className={`mr-1 h-3 w-3 ${statusFilter === 'pendente' ? 'text-white' : 'text-yellow-500'}`} />
            Pendentes
          </Button>
          <Button 
            variant={statusFilter === 'aprovado' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleStatusFilter('aprovado')}
          >
            <Check className={`mr-1 h-3 w-3 ${statusFilter === 'aprovado' ? 'text-white' : 'text-green-500'}`} />
            Aprovados
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Lista de Orçamentos</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-6">
              <p>Carregando orçamentos...</p>
            </div>
          ) : (
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
                  {filteredOrcamentos.length > 0 ? (
                    filteredOrcamentos.map((orcamento) => (
                      <TableRow key={orcamento.id}>
                        <TableCell className="font-medium">{orcamento.id}</TableCell>
                        <TableCell>{orcamento.cliente.nome}</TableCell>
                        <TableCell>{orcamento.data}</TableCell>
                        <TableCell>{orcamento.validade}</TableCell>
                        <TableCell>{orcamento.valor}</TableCell>
                        <TableCell>{getStatusBadge(orcamento.status)}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => navigate(`/orcamentos/${orcamento.id}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDownloadOrcamento(orcamento.id)}
                          >
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrcamentosPage;
