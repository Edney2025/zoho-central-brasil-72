
import React from 'react';
import { Star } from 'lucide-react';

interface AvaliacaoEstrelasProps {
  avaliacao: number;
  tamanho?: number;
  interativo?: boolean;
  onChange?: (avaliacao: number) => void;
}

const AvaliacaoEstrelas: React.FC<AvaliacaoEstrelasProps> = ({ 
  avaliacao, 
  tamanho = 4, 
  interativo = false,
  onChange 
}) => {
  const [hoverValue, setHoverValue] = React.useState<number | null>(null);

  return (
    <div className="flex text-amber-500">
      {[1, 2, 3, 4, 5].map((valor) => (
        <Star 
          key={valor} 
          className={`h-${tamanho} w-${tamanho} ${interativo ? 'cursor-pointer' : ''}`}
          fill={(hoverValue !== null ? valor <= hoverValue : valor <= avaliacao) ? "currentColor" : "none"}
          onMouseEnter={interativo ? () => setHoverValue(valor) : undefined}
          onMouseLeave={interativo ? () => setHoverValue(null) : undefined}
          onClick={interativo && onChange ? () => onChange(valor) : undefined}
        />
      ))}
    </div>
  );
};

export default AvaliacaoEstrelas;
