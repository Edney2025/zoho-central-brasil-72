
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
  Info
} from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Skeleton } from '@/components/ui/skeleton';

// Mock data para demonstração
const orcamentosDetalhados = [
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

const OrcamentoDetalhe = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [orcamento, setOrcamento] = useState<any>(null);

  useEffect(() => {
    // Simula carregamento de dados
    setTimeout(() => {
      const orcamentoEncontrado = orcamentosDetalhados.find(orc => orc.id === id);
      setOrcamento(orcamentoEncontrado || null);
      setLoading(false);
      
      if (!orcamentoEncontrado) {
        sonnerToast("Orçamento não encontrado", {
          description: `O orçamento #${id} não foi encontrado no sistema.`,
          duration: 5000,
        });
        navigate('/pedidos');
      }
    }, 800);
  }, [id, navigate]);

  const handleApproveQuote = () => {
    toast({
      title: "Orçamento aprovado",
      description: `O orçamento #${id} foi aprovado com sucesso.`,
    });
    // Em uma aplicação real, atualizaríamos o estado do orçamento
    setOrcamento({...orcamento, status: 'aprovado'});
  };

  const handleRejectQuote = () => {
    toast({
      title: "Orçamento recusado",
      description: `O orçamento #${id} foi recusado.`,
    });
    // Em uma aplicação real, atualizaríamos o estado do orçamento
    setOrcamento({...orcamento, status: 'reprovado'});
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
    return null; // Redirecionamento já foi tratado no useEffect
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => navigate('/pedidos')}
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
                      {orcamento.items.map((item: any) => (
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
          
          {/* Histórico */}
          <Card>
            <CardHeader>
              <CardTitle>Histórico do Orçamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orcamento.historico.map((evento: any, index: number) => (
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
                  {orcamento.anexos.map((anexo: any, index: number) => (
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

export default OrcamentoDetalhe;
