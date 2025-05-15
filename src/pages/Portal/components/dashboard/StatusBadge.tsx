
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock } from 'lucide-react';

interface StatusBadgeProps {
  status: string | undefined;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
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
