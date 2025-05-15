
import React from 'react';
import { Check, X } from 'lucide-react';

interface StatusStepProps {
  status: 'aprovado' | 'pendente' | 'concluido' | 'reprovado' | 'processando';
}

export const StatusStep: React.FC<StatusStepProps> = ({ status }) => {
  const steps = [
    { label: 'Pedido Recebido', complete: true },
    { label: 'Aprovado', complete: status !== 'pendente' && status !== 'reprovado' },
    { label: 'Em Produção', complete: status === 'processando' || status === 'concluido' },
    { label: 'Enviado', complete: status === 'concluido' },
    { label: 'Entregue', complete: status === 'concluido' }
  ];
  
  if (status === 'reprovado') {
    return (
      <div className="px-4 py-2 bg-red-50 border border-red-200 rounded-md text-red-700">
        <div className="flex items-center mb-2">
          <X className="h-5 w-5 mr-2" />
          <span className="font-medium">Pedido Reprovado</span>
        </div>
        <p className="text-sm">Este pedido foi reprovado e não será processado.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="relative flex items-center justify-between">
        <div className="absolute h-1 bg-muted w-full top-4 -z-10" />
        
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div 
              className={`h-8 w-8 rounded-full flex items-center justify-center ${
                step.complete 
                  ? 'bg-green-600 text-white' 
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {step.complete ? <Check className="h-5 w-5" /> : index + 1}
            </div>
            <span className="text-xs mt-1 text-center max-w-[70px]">{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
