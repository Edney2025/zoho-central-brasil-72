
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Bell } from 'lucide-react';

const NotificacoesTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notificações</CardTitle>
        <CardDescription>
          Configure suas preferências de notificação.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Novos pedidos</p>
            <p className="text-sm text-muted-foreground">Receba notificações quando novos pedidos forem criados</p>
          </div>
          <Switch id="notif-pedidos" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Alertas de estoque</p>
            <p className="text-sm text-muted-foreground">Receba alertas quando produtos estiverem com estoque baixo</p>
          </div>
          <Switch id="notif-estoque" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Faturas vencidas</p>
            <p className="text-sm text-muted-foreground">Receba alertas sobre faturas vencidas ou próximas do vencimento</p>
          </div>
          <Switch id="notif-faturas" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">E-mails de resumo</p>
            <p className="text-sm text-muted-foreground">Receba e-mails com resumos semanais</p>
          </div>
          <Switch id="notif-emails" />
        </div>
        <Button>Salvar Preferências</Button>
      </CardContent>
    </Card>
  );
};

export default NotificacoesTab;
