
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2, FileText, XCircle } from 'lucide-react';

interface SimulacaoActionsProps {
  id: string;
  onShare: (id: string) => void;
  onCreateOrcamento: (id: string) => void;
  onRemove: (id: string) => void;
}

const SimulacaoActions: React.FC<SimulacaoActionsProps> = ({
  id,
  onShare,
  onCreateOrcamento,
  onRemove
}) => {
  return (
    <div className="flex gap-1">
      <Button 
        variant="outline" 
        size="icon" 
        onClick={() => onShare(id)}
        title="Compartilhar"
      >
        <Share2 className="h-4 w-4" />
      </Button>
      <Button 
        variant="outline" 
        size="icon"
        onClick={() => onCreateOrcamento(id)}
        title="Criar Orçamento"
      >
        <FileText className="h-4 w-4" />
      </Button>
      <Button 
        variant="outline" 
        size="icon"
        onClick={() => onRemove(id)}
        title="Remover da comparação"
      >
        <XCircle className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SimulacaoActions;
