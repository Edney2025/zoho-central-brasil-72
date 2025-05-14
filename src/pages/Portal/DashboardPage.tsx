
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

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

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const getStatusBadge = (status: string | undefined) => {
    if (!status) return null;
    
    switch (status) {
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Bem-vindo, {user?.email?.split('@')[0]}</h1>
      </div>
      
      <Alert className="bg-primary/10 border-primary/20 text-primary">
        <Info className="h-5 w-5" />
        <AlertTitle>Perfil Incompleto</AlertTitle>
        <AlertDescription>
          Complete seu perfil para aproveitar todos os recursos do portal.
          <Button variant="outline" size="sm" className="ml-2" onClick={() => navigate('/portal/profile')}>
            Atualizar Perfil
          </Button>
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <ShoppingBag className="mr-2 h-5 w-5 text-primary" />
              Pedidos Ativos
            </CardTitle>
            <CardDescription>Seus pedidos em andamento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2</div>
            <Button variant="link" className="p-0 h-auto text-sm" onClick={() => navigate('/portal/pedidos')}>
              Ver todos os pedidos
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <FileText className="mr-2 h-5 w-5 text-primary" />
              Orçamentos
            </CardTitle>
            <CardDescription>Orçamentos pendentes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1</div>
            <Button variant="link" className="p-0 h-auto text-sm" onClick={() => navigate('/portal/orcamentos')}>
              Ver todos os orçamentos
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <CreditCard className="mr-2 h-5 w-5 text-primary" />
              Pagamentos
            </CardTitle>
            <CardDescription>Status dos pagamentos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">R$ 5.800,00</div>
            <div className="text-sm text-muted-foreground">Próximo vencimento: 25/05/2023</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
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
                    <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg border">
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
                </TabsContent>
                
                <TabsContent value="pedidos" className="space-y-4">
                  {recentActivity.filter(a => a.type === 'pedido').map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg border">
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
                    <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg border">
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
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Notificações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-amber-50 border-amber-200 text-amber-900">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Atualização de cadastro</AlertTitle>
                <AlertDescription className="text-sm">
                  Por favor, atualize seus dados cadastrais para continuar utilizando o portal.
                </AlertDescription>
              </Alert>
              
              <Alert className="bg-green-50 border-green-200 text-green-900">
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>Orçamento aprovado</AlertTitle>
                <AlertDescription className="text-sm">
                  Seu orçamento #54321 foi aprovado e está disponível para visualização.
                </AlertDescription>
              </Alert>
              
              <Button variant="outline" className="w-full">
                Ver todas as notificações
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
