
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, FileText } from 'lucide-react';

interface ProximasAcoesProps {
  status: 'pendente' | 'aprovado' | 'reprovado' | 'vencido';
}

export const ProximasAcoes: React.FC<ProximasAcoesProps> = ({ status }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Próximas Ações</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {status === 'pendente' && (
          <>
            <Button className="w-full">
              <Mail className="mr-2 h-4 w-4" /> Enviar Lembrete
            </Button>
            <Button variant="outline" className="w-full">
              <Phone className="mr-2 h-4 w-4" /> Registrar Contato
            </Button>
          </>
        )}
        
        {status === 'aprovado' && (
          <>
            <Button className="w-full">
              <FileText className="mr-2 h-4 w-4" /> Gerar Pedido
            </Button>
            <Button variant="outline" className="w-full">
              <Mail className="mr-2 h-4 w-4" /> Enviar Instruções
            </Button>
          </>
        )}
        
        {status === 'reprovado' && (
          <>
            <Button className="w-full">
              <FileText className="mr-2 h-4 w-4" /> Criar Novo Orçamento
            </Button>
            <Button variant="outline" className="w-full">
              <Phone className="mr-2 h-4 w-4" /> Agendar Follow-up
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};
