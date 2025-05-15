
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calendar, Download, ShoppingBag, CreditCard, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Event {
  id: string;
  titulo: string;
  data: string;
  tipo: string;
}

interface EventsCardProps {
  events: Event[];
}

export const EventsCard: React.FC<EventsCardProps> = ({ events }) => {
  return (
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
        {events.map((evento) => (
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
  );
};
