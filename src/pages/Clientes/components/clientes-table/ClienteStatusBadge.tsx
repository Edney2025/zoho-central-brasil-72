
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface ClienteStatusBadgeProps {
  status: string;
  classificacao?: string;
}

const ClienteStatusBadge: React.FC<ClienteStatusBadgeProps> = ({ 
  status, 
  classificacao 
}) => {
  return (
    <div className="flex items-center gap-2">
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        status.toLowerCase() === 'ativo' ? 'bg-green-100 text-green-800' : 
        status.toLowerCase() === 'inativo' ? 'bg-red-100 text-red-800' : 
        'bg-yellow-100 text-yellow-800'
      }`}>
        {status}
      </span>
      
      {classificacao && (
        <Badge variant="secondary" className="text-xs">
          {classificacao}
        </Badge>
      )}
    </div>
  );
};

export default ClienteStatusBadge;
