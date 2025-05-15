
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Check, X, Clock, CheckCircle2, TrendingUp } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  switch(status) {
    case 'aprovado':
      return <Badge className="bg-green-500"><Check className="mr-1 h-3 w-3" /> Aprovado</Badge>;
    case 'reprovado':
      return <Badge className="bg-red-500"><X className="mr-1 h-3 w-3" /> Reprovado</Badge>;
    case 'pendente':
      return <Badge className="bg-yellow-500"><Clock className="mr-1 h-3 w-3" /> Pendente</Badge>;
    case 'concluido':
      return <Badge className="bg-blue-500"><CheckCircle2 className="mr-1 h-3 w-3" /> Concluído</Badge>;
    case 'processando':
      return <Badge className="bg-purple-500"><TrendingUp className="mr-1 h-3 w-3" /> Processando</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};
