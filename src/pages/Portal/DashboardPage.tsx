
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  ShoppingBag, 
  Clock, 
  Bell, 
  CreditCard,
  Info,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Download,
  PieChart,
  ArrowRight,
  BarChart3
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';

interface ActivityItem {
  id: string;
  type: string;
  title: string;
  description: string;
  date: string;
  status?: string;
}

const recentActivity: ActivityItem[] = [
  {
    id: 'act1',
    type: 'pedido',
    title: 'Pedido #12345',
    description: 'Pedido recebido e em processamento',
    date: '15/05/2023',
    status: 'processando'
  },
  {
    id: 'act2',
    type: 'orçamento',
    title: 'Orçamento #54321',
    description: 'Orçamento aprovado',
    date: '12/05/2023',
    status: 'aprovado'
  },
  {
    id: 'act3',
    type: 'mensagem',
    title: 'Novo contato',
    description: 'Sua solicitação foi respondida pela equipe de suporte',
    date: '10/05/2023'
  }
];

// Mock data for the dashboard summary cards
const summaryData = {
  pedidosPendentes: 2,
  pedidosConcluidos: 5,
  orcamentosPendentes: 1,
  orcamentosAprovados: 3,
  proximoPagamento: {
    data: '25/05/2023',
    valor: 'R$ 1.250,00'
  },
  ultimaAtualizacao: '15/05/2023 às 10:30'
};

// Mock upcoming events
const proximosEventos = [
  {
    id: 'evt1',
    titulo: 'Entrega pedido #12345',
    data: '20/05/2023',
    tipo: 'entrega'
  },
  {
    id: 'evt2',
    titulo: 'Vencimento da fatura',
    data: '25/05/2023',
    tipo: 'pagamento'
  },
  {
    id: 'evt3',
    titulo: 'Manutenção programada',
    data: '28/05/2023',
    tipo: 'manutenção'
  }
];

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [completionPercentage] = useState(75);

  const getStatusBadge = (status: string | undefined) => {
    if (!status) return null;
    
    switch(status) {
      case 'aprovado':
        return <Badge className="bg-green-500"><CheckCircle2 className="mr-1 h-3 w-3" /> Aprovado</Badge>;
      case 'reprovado':
        return <Badge className="bg-red-500">Reprovado</Badge>;
      case 'processando':
        return <Badge className="bg-yellow-500"><Clock className="mr-1 h-3 w-3" /> Em processamento</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleUpdateProfile = () => {
    navigate('/portal/profile');
  };

  const handleViewAllNotifications = () => {
    // This would navigate to a notifications page in a real app
    toast({
      title: "Notificações",
      description: "Funcionalidade em implementação"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Bem-vindo, {user?.email?.split('@')[0]}</h1>
          <p className="text-muted-foreground">Última atualização: {summaryData.ultimaAtualizacao}</p>
        </div>
        <Button onClick={() => navigate('/portal/pedidos')}>
          Ver meus pedidos <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      {completionPercentage < 100 && (
        <Alert className="bg-primary/10 border-primary/20 text-primary">
          <Info className="h-5 w-5" />
          <AlertTitle>Perfil Incompleto</AlertTitle>
          <AlertDescription>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Complete seu perfil para aproveitar todos os recursos</span>
                <span className="font-medium">{completionPercentage}%</span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
              <Button variant="outline" size="sm" onClick={handleUpdateProfile}>
                Atualizar Perfil
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <ShoppingBag className="mr-2 h-5 w-5 text-primary" />
              Pedidos
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-3 mb-2">
              <div className="bg-muted/30 p-2 rounded-lg text-center">
                <p className="text-3xl font-bold">{summaryData.pedidosPendentes}</p>
                <p className="text-xs text-muted-foreground">Pendentes</p>
              </div>
              <div className="bg-muted/30 p-2 rounded-lg text-center">
                <p className="text-3xl font-bold">{summaryData.pedidosConcluidos}</p>
                <p className="text-xs text-muted-foreground">Concluídos</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="link" className="p-0 h-auto text-sm" onClick={() => navigate('/portal/pedidos')}>
              Ver todos os pedidos
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <FileText className="mr-2 h-5 w-5 text-primary" />
              Orçamentos
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-3 mb-2">
              <div className="bg-muted/30 p-2 rounded-lg text-center">
                <p className="text-3xl font-bold">{summaryData.orcamentosPendentes}</p>
                <p className="text-xs text-muted-foreground">Pendentes</p>
              </div>
              <div className="bg-muted/30 p-2 rounded-lg text-center">
                <p className="text-3xl font-bold">{summaryData.orcamentosAprovados}</p>
                <p className="text-xs text-muted-foreground">Aprovados</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="link" className="p-0 h-auto text-sm" onClick={() => navigate('/portal/orcamentos')}>
              Ver todos os orçamentos
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <CreditCard className="mr-2 h-5 w-5 text-primary" />
              Pagamentos
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2 mb-2">
              <div className="bg-muted/30 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Próximo:</span>
                  <span className="text-sm font-medium">{summaryData.proximoPagamento.data}</span>
                </div>
                <div className="text-xl font-bold mt-1">{summaryData.proximoPagamento.valor}</div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="link" className="p-0 h-auto text-sm">
              Ver todos os pagamentos
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Atividade Recente</CardTitle>
                <CardDescription>Acompanhe suas atividades recentes</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => {}}>
                <PieChart className="mr-2 h-4 w-4" />
                Filtrar
              </Button>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">Tudo</TabsTrigger>
                  <TabsTrigger value="pedidos">Pedidos</TabsTrigger>
                  <TabsTrigger value="orcamentos">Orçamentos</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg border hover:bg-muted/30 cursor-pointer transition-colors">
                      <div className="bg-primary/10 p-2 rounded">
                        {activity.type === 'pedido' ? (
                          <ShoppingBag className="h-5 w-5 text-primary" />
                        ) : activity.type === 'orçamento' ? (
                          <FileText className="h-5 w-5 text-primary" />
                        ) : (
                          <Bell className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{activity.title}</h4>
                          <span className="text-sm text-muted-foreground">{activity.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                        {activity.status && (
                          <div className="mt-1">
                            {getStatusBadge(activity.status)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <div className="text-center mt-4">
                    <Button variant="outline">
                      Carregar mais
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="pedidos" className="space-y-4">
                  {recentActivity.filter(a => a.type === 'pedido').map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg border hover:bg-muted/30 cursor-pointer transition-colors">
                      <div className="bg-primary/10 p-2 rounded">
                        <ShoppingBag className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{activity.title}</h4>
                          <span className="text-sm text-muted-foreground">{activity.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                        {activity.status && (
                          <div className="mt-1">
                            {getStatusBadge(activity.status)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="orcamentos" className="space-y-4">
                  {recentActivity.filter(a => a.type === 'orçamento').map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg border hover:bg-muted/30 cursor-pointer transition-colors">
                      <div className="bg-primary/10 p-2 rounded">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{activity.title}</h4>
                          <span className="text-sm text-muted-foreground">{activity.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                        {activity.status && (
                          <div className="mt-1">
                            {getStatusBadge(activity.status)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Próximos Eventos
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {proximosEventos.map((evento) => (
                <div key={evento.id} className="flex items-center gap-3 p-2 border rounded-lg hover:bg-muted/30 cursor-pointer transition-colors">
                  <div className={`p-2 rounded-full ${
                    evento.tipo === 'entrega' ? 'bg-blue-100 text-blue-700' :
                    evento.tipo === 'pagamento' ? 'bg-green-100 text-green-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {evento.tipo === 'entrega' && <ShoppingBag className="h-4 w-4" />}
                    {evento.tipo === 'pagamento' && <CreditCard className="h-4 w-4" />}
                    {evento.tipo === 'manutenção' && <AlertTriangle className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{evento.titulo}</p>
                    <p className="text-xs text-muted-foreground">{evento.data}</p>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                Ver calendário completo
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notificações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-amber-50 border-amber-200 text-amber-900">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Atualização de cadastro</AlertTitle>
                <AlertDescription className="text-sm">
                  Por favor, atualize seus dados cadastrais.
                </AlertDescription>
              </Alert>
              
              <Alert className="bg-green-50 border-green-200 text-green-900">
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>Orçamento aprovado</AlertTitle>
                <AlertDescription className="text-sm">
                  Seu orçamento #54321 foi aprovado.
                </AlertDescription>
              </Alert>
              
              <Button variant="outline" className="w-full" onClick={handleViewAllNotifications}>
                Ver todas as notificações
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                Resumo Financeiro
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total em aberto:</span>
                  <span className="font-medium">R$ 5.800,00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Pagos (últimos 30 dias):</span>
                  <span className="font-medium">R$ 3.200,00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Próximo vencimento:</span>
                  <span className="font-medium">25/05/2023</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
