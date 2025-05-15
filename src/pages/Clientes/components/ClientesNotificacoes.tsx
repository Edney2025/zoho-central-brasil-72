
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, CheckCircle, X, RefreshCw } from "lucide-react";
import { useClientesNotificacoes } from "@/hooks/useClientesNotificacoes";
import { NotificacaoCliente, formatarDataNotificacao, TipoNotificacao } from "@/services/notificacoesClientesService";

interface NotificacaoItemProps {
  notificacao: NotificacaoCliente;
  onComplete: (id: string) => void;
  onCancel: (id: string) => void;
}

const NotificacaoItem: React.FC<NotificacaoItemProps> = ({
  notificacao,
  onComplete,
  onCancel,
}) => {
  const getIconByTipo = () => {
    switch (notificacao.tipo) {
      case 'aniversario': 
        return <span className="text-lg">🎂</span>;
      case 'renovacao': 
        return <span className="text-lg">📝</span>;
      case 'reuniao': 
        return <span className="text-lg">👥</span>;
      case 'pagamento': 
        return <span className="text-lg">💰</span>;
      default: 
        return <Calendar className="h-5 w-5" />;
    }
  };

  return (
    <div className="p-3 border rounded-md flex items-start gap-3 hover:bg-muted/30 transition-colors">
      <div className="bg-primary/10 p-2 rounded">
        {getIconByTipo()}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{notificacao.clienteNome}</h4>
          <Badge variant="outline" className="text-xs">
            {notificacao.tipo}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{notificacao.descricao}</p>
        <p className="text-xs flex items-center mt-1 text-muted-foreground">
          <Calendar className="h-3 w-3 mr-1" />
          {formatarDataNotificacao(notificacao.data)}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-green-500"
          onClick={() => onComplete(notificacao.id)}
        >
          <CheckCircle className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive"
          onClick={() => onCancel(notificacao.id)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const ClientesNotificacoes: React.FC = () => {
  const {
    notificacoes,
    notificacoesHoje,
    isLoading,
    carregarNotificacoes,
    marcarComoConcluida,
    cancelarNotificacao,
  } = useClientesNotificacoes();

  const notificacoesPendentes = notificacoes.filter(
    (n) => n.status === "pendente"
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notificações
          </CardTitle>
          <CardDescription>
            Lembretes e eventos relacionados aos clientes
          </CardDescription>
        </div>
        <Button variant="outline" size="icon" onClick={() => carregarNotificacoes()} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="hoje">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="hoje" className="relative">
              Hoje
              {notificacoesHoje.length > 0 && (
                <Badge className="ml-2 bg-primary text-primary-foreground">
                  {notificacoesHoje.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="pendentes">
              Pendentes
              {notificacoesPendentes.length > 0 && (
                <Badge className="ml-2" variant="outline">
                  {notificacoesPendentes.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="todas">Todas</TabsTrigger>
          </TabsList>

          <TabsContent value="hoje" className="space-y-4">
            {notificacoesHoje.length > 0 ? (
              notificacoesHoje.map((notif) => (
                <NotificacaoItem
                  key={notif.id}
                  notificacao={notif}
                  onComplete={marcarComoConcluida}
                  onCancel={cancelarNotificacao}
                />
              ))
            ) : (
              <p className="text-center text-muted-foreground py-6">
                Não há notificações para hoje
              </p>
            )}
          </TabsContent>

          <TabsContent value="pendentes" className="space-y-4">
            {notificacoesPendentes.length > 0 ? (
              notificacoesPendentes.map((notif) => (
                <NotificacaoItem
                  key={notif.id}
                  notificacao={notif}
                  onComplete={marcarComoConcluida}
                  onCancel={cancelarNotificacao}
                />
              ))
            ) : (
              <p className="text-center text-muted-foreground py-6">
                Não há notificações pendentes
              </p>
            )}
          </TabsContent>

          <TabsContent value="todas" className="space-y-4">
            {notificacoes.length > 0 ? (
              notificacoes.map((notif) => (
                <NotificacaoItem
                  key={notif.id}
                  notificacao={notif}
                  onComplete={marcarComoConcluida}
                  onCancel={cancelarNotificacao}
                />
              ))
            ) : (
              <p className="text-center text-muted-foreground py-6">
                Não há notificações
              </p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ClientesNotificacoes;
