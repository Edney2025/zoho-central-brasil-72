
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, ThumbsUp, ThumbsDown, Clock, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderActionsProps {
  id: string;
  status: 'pendente' | 'aprovado' | 'reprovado' | 'vencido';
  onApprove: () => void;
  onReject: () => void;
}

export const HeaderActions: React.FC<HeaderActionsProps> = ({ 
  id, 
  status, 
  onApprove, 
  onReject 
}) => {
  const navigate = useNavigate();

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

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => navigate('/orcamentos')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Orçamento #{id}</h1>
        {getStatusBadge(status)}
      </div>
      <div className="flex gap-2">
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Baixar PDF
        </Button>
        {status === 'pendente' && (
          <div className="flex gap-2">
            <Button variant="outline" className="bg-red-500/10 hover:bg-red-500/20 border-red-500/30 text-red-700" onClick={onReject}>
              <ThumbsDown className="mr-2 h-4 w-4" /> Recusar
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={onApprove}>
              <ThumbsUp className="mr-2 h-4 w-4" /> Aprovar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
