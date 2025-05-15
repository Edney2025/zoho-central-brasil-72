
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Bell, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NotificationsCardProps {
  onViewAllNotifications: () => void;
}

export const NotificationsCard: React.FC<NotificationsCardProps> = ({ onViewAllNotifications }) => {
  return (
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
        
        <Button variant="outline" className="w-full" onClick={onViewAllNotifications}>
          Ver todas as notificações
        </Button>
      </CardContent>
    </Card>
  );
};
