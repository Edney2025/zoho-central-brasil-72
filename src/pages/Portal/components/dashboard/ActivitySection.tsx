
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FileText, ShoppingBag, Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { PieChart } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: string;
  title: string;
  description: string;
  date: string;
  status?: string;
}

interface ActivitySectionProps {
  recentActivity: ActivityItem[];
}

export const ActivitySection: React.FC<ActivitySectionProps> = ({ recentActivity }) => {
  const getStatusBadge = (status: string | undefined) => {
    if (!status) return null;
    
    switch(status) {
      case 'aprovado':
        return <Badge className="bg-green-500">Aprovado</Badge>;
      case 'reprovado':
        return <Badge className="bg-red-500">Reprovado</Badge>;
      case 'processando':
        return <Badge className="bg-yellow-500">Em processamento</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
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
  );
};
