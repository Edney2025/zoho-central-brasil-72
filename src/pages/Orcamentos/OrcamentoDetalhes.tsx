
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { sonnerToast } from '@/components/ui/use-toast';
import { 
  ArrowLeft, 
  Download, 
  Calendar, 
  Clock, 
  ThumbsUp, 
  ThumbsDown, 
  FileText,
  Mail,
  Phone,
  CreditCard,
  Info,
  BarChart3
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { DashboardCharts } from '../Dashboard/components/DashboardCharts';
import { localStorageService } from '@/services/localStorageService';

// Interface para os dados de orcamento
interface Cliente {
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
}

interface Item {
  id: string;
  nome: string;
  quantidade: number;
  valorUnitario: string;
  valorTotal: string;
}

interface EventoHistorico {
  data: string;
  evento: string;
  usuario: string;
}

interface Anexo {
  nome: string;
  tamanho: string;
}

interface OrcamentoDetalhado {
  id: string;
  cliente: Cliente;
  valor: string;
  data: string;
  validade: string;
  status: 'pendente' | 'aprovado' | 'reprovado' | 'vencido';
  items: Item[];
  historico: EventoHistorico[];
  condicoesPagamento: string;
  observacoes: string;
  anexos: Anexo[];
}

const OrcamentoDetalhes: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [orcamento, setOrcamento] = useState<OrcamentoDetalhado | null>(null);

  // Dados para os gráficos
  const vendasMensais = [
    { nome: 'Jan', valor: 12000 },
    { nome: 'Fev', valor: 14500 },
    { nome: 'Mar', valor: 18000 },
    { nome: 'Abr', valor: 16500 },
    { nome: 'Mai', valor: 21000 },
    { nome: 'Jun', valor: 19800 }
  ];
  
  const desempenhoCategorias = [
    { nome: 'Serviços', atual: 21000, anterior: 18500 },
    { nome: 'Produtos', atual: 16800, anterior: 15200 },
    { nome: 'Consultoria', atual: 8500, anterior: 7200 },
    { nome: 'Suporte', atual: 5200, anterior: 4800 }
  ];

  useEffect(() => {
    // Simula busca de dados do orçamento
    setTimeout(() => {
      // Busca de dados do serviço de localStorage
      const orcamentos = localStorageService.getData('orcamentos') || [];
      const orcamentoEncontrado = orcamentos.find((orc: any) => orc.id === id);
      
      if (orcamentoEncontrado) {
        // Ensure the status is one of the allowed types
        const validStatus = orcamentoEncontrado.status as 'pendente' | 'aprovado' | 'reprovado' | 'vencido';
        setOrcamento({
          ...orcamentoEncontrado,
          status: validStatus
        });
      } else {
        sonnerToast("Orçamento não encontrado", {
          description: `O orçamento #${id} não foi encontrado no sistema.`,
          duration: 5000,
        });
        navigate('/orcamentos');
      }
      setLoading(false);
    }, 800);
  }, [id, navigate]);

  const handleApproveQuote = () => {
    if (orcamento) {
      const updatedOrcamento = { 
        ...orcamento, 
        status: 'aprovado' as const  // Explicitly type as const to match the union type
      };
      setOrcamento(updatedOrcamento);
      
      // Atualiza no localStorage
      const orcamentos = localStorageService.getData('orcamentos') || [];
      const updatedOrcamentos = orcamentos.map((orc: any) => 
        orc.id === id ? {...orc, status: 'aprovado'} : orc
      );
      localStorageService.setData('orcamentos', updatedOrcamentos);
      
      toast({
        title: "Orçamento aprovado",
        description: `O orçamento #${id} foi aprovado com sucesso.`,
      });
    }
  };

  const handleRejectQuote = () => {
    if (orcamento) {
      const updatedOrcamento = { 
        ...orcamento, 
        status: 'reprovado' as const  // Explicitly type as const to match the union type
      };
      setOrcamento(updatedOrcamento);
      
      // Atualiza no localStorage
      const orcamentos = localStorageService.getData('orcamentos') || [];
      const updatedOrcamentos = orcamentos.map((orc: any) => 
        orc.id === id ? {...orc, status: 'reprovado'} : orc
      );
      localStorageService.setData('orcamentos', updatedOrcamentos);
      
      toast({
        title: "Orçamento recusado",
        description: `O orçamento #${id} foi recusado.`,
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'aprovado':
        return <Badge className="bg-green-500"><ThumbsUp className="mr-1 h-3 w-3" /> Aprovado</Badge>;
      case 'reprovado':
        return <Badge className="bg-red-500"><ThumbsDown className="mr-1 h-3 w-3" /> Reprovado</Badge>;
      case 'pendente':
        return <Badge className="bg-yellow-500"><Clock className="mr-1 h-3 w-3" /> Pendente</Badge>;
      case 'vencido':
        return <Badge className="bg-gray-500"><Info className="mr-1 h-3 w-3" /> Vencido</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-24" />
        </div>
        
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-64 mb-2" />
            <Skeleton className="h-4 w-40" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <Skeleton className="h-24 w-full" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
            <Skeleton className="h-40 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!orcamento) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => navigate('/orcamentos')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">Orçamento #{orcamento.id}</h1>
          {getStatusBadge(orcamento.status)}
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Baixar PDF
          </Button>
          {orcamento.status === 'pendente' && (
            <div className="flex gap-2">
              <Button variant="outline" className="bg-red-500/10 hover:bg-red-500/20 border-red-500/30 text-red-700" onClick={handleRejectQuote}>
                <ThumbsDown className="mr-2 h-4 w-4" /> Recusar
              </Button>
              <Button className="bg-green-600 hover:bg-green-700" onClick={handleApproveQuote}>
                <ThumbsUp className="mr-2 h-4 w-4" /> Aprovar
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Dados do Orçamento */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                Informações do Orçamento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Número</p>
                  <p className="font-medium">{orcamento.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Data de Emissão</p>
                  <div className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    <p>{orcamento.data}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Validade</p>
                  <div className="flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    <p>{orcamento.validade}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Valor Total</p>
                  <p className="font-medium text-lg text-primary">{orcamento.valor}</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Itens do Orçamento</h3>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Código</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead className="text-center">Qtd</TableHead>
                        <TableHead className="text-right">Valor Unit.</TableHead>
                        <TableHead className="text-right">Valor Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orcamento.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-mono text-sm">{item.id}</TableCell>
                          <TableCell>{item.nome}</TableCell>
                          <TableCell className="text-center">{item.quantidade}</TableCell>
                          <TableCell className="text-right">{item.valorUnitario}</TableCell>
                          <TableCell className="text-right font-medium">{item.valorTotal}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Condições de Pagamento</h3>
                  <div className="bg-muted/30 p-3 rounded-md flex items-start">
                    <CreditCard className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                    <p>{orcamento.condicoesPagamento}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Observações</h3>
                  <div className="bg-muted/30 p-3 rounded-md">
                    <p className="text-sm">{orcamento.observacoes}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Análise de desempenho */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                Análise de Desempenho
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DashboardCharts 
                vendasMensais={vendasMensais}
                desempenhoCategorias={desempenhoCategorias}
              />
            </CardContent>
          </Card>
          
          {/* Histórico */}
          <Card>
            <CardHeader>
              <CardTitle>Histórico do Orçamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orcamento.historico.map((evento, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="rounded-full h-8 w-8 flex items-center justify-center bg-primary/10 text-primary">
                      {index === 0 ? (
                        <FileText className="h-4 w-4" />
                      ) : evento.evento.includes('Email') ? (
                        <Mail className="h-4 w-4" />
                      ) : (
                        <Info className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{evento.evento}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{evento.data}</span>
                        <span>•</span>
                        <span>{evento.usuario}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Anexos */}
          {orcamento.anexos.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Anexos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {orcamento.anexos.map((anexo, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-md border hover:bg-muted/50">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-primary" />
                        <span>{anexo.nome}</span>
                        <span className="ml-2 text-xs text-muted-foreground">({anexo.tamanho})</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Sidebar com dados do cliente */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dados do Cliente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="font-medium text-lg">{orcamento.cliente.nome}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <a href={`mailto:${orcamento.cliente.email}`} className="text-sm hover:underline">
                    {orcamento.cliente.email}
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <a href={`tel:${orcamento.cliente.telefone}`} className="text-sm hover:underline">
                    {orcamento.cliente.telefone}
                  </a>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Endereço</p>
                <p className="text-sm">{orcamento.cliente.endereco}</p>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <Button variant="outline" size="sm" className="w-full">
                Ver Perfil Completo
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Próximas Ações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {orcamento.status === 'pendente' && (
                <>
                  <Button className="w-full">
                    <Mail className="mr-2 h-4 w-4" /> Enviar Lembrete
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Phone className="mr-2 h-4 w-4" /> Registrar Contato
                  </Button>
                </>
              )}
              
              {orcamento.status === 'aprovado' && (
                <>
                  <Button className="w-full">
                    <FileText className="mr-2 h-4 w-4" /> Gerar Pedido
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="mr-2 h-4 w-4" /> Enviar Instruções
                  </Button>
                </>
              )}
              
              {orcamento.status === 'reprovado' && (
                <>
                  <Button className="w-full">
                    <FileText className="mr-2 h-4 w-4" /> Criar Novo Orçamento
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Phone className="mr-2 h-4 w-4" /> Agendar Follow-up
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrcamentoDetalhes;
