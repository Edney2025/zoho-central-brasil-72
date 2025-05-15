
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { calculadoras } from '../config/calculadoras';
import { CalculadoraConfig } from '../types';

interface CalculadorasListProps {
  filter?: string;
  onlyShowInMenu?: boolean;
}

export const CalculadorasList: React.FC<CalculadorasListProps> = ({ 
  filter, 
  onlyShowInMenu = false
}) => {
  const navigate = useNavigate();

  const filteredCalculadoras = calculadoras.filter(calc => {
    if (onlyShowInMenu && !calc.mostrarNoMenu) return false;
    if (!filter) return true;
    return calc.categoria === filter || 
           calc.nome.toLowerCase().includes(filter.toLowerCase()) || 
           calc.descricao.toLowerCase().includes(filter.toLowerCase());
  });

  const handleSelectCalculadora = (calculadora: CalculadoraConfig) => {
    navigate(calculadora.caminhoRota);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredCalculadoras.map((calculadora) => (
        <Card 
          key={calculadora.id}
          className="cursor-pointer hover:shadow-md transition-all hover:scale-[1.02] border-muted-foreground/20"
          onClick={() => handleSelectCalculadora(calculadora)}
        >
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-2">
                <calculadora.icone className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">{calculadora.nome}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{calculadora.descricao}</p>
          </CardContent>
        </Card>
      ))}
      
      {filteredCalculadoras.length === 0 && (
        <div className="col-span-full text-center py-8">
          <p className="text-muted-foreground">Nenhuma calculadora encontrada.</p>
        </div>
      )}
    </div>
  );
};
