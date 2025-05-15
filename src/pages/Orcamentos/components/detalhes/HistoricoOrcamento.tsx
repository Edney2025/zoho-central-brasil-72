
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Mail, Info } from 'lucide-react';
import { EventoHistorico } from '../../types/orcamento';

interface HistoricoOrcamentoProps {
  historico: EventoHistorico[];
}

export const HistoricoOrcamento: React.FC<HistoricoOrcamentoProps> = ({ historico }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico do Orçamento</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {historico.map((evento, index) => (
            <div key={index} className="flex gap-3">
              <div className="rounded-full h-8 w-8 flex items-center justify-center bg-primary/10 text-primary">
                {index === 0 ? (
                  <FileText className="h-4 w-4" />
                ) : evento.evento.includes('Email') ? (
                  <Mail className="h-4 w-4" />
                ) : (
                  <Info className="h-4 w-4" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium">{evento.evento}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{evento.data}</span>
                  <span>•</span>
                  <span>{evento.usuario}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
