
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Check, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';

interface Orcamento {
  id: string;
  cliente: string;
  descricao: string;
  valor: string;
  data: string;
  status: string;
}

interface OrcamentosSectionProps {
  orcamentos: Orcamento[];
}

export const OrcamentosSection = ({ orcamentos }: OrcamentosSectionProps) => {
  const navigate = useNavigate();

  const handleAcceptOrcamento = (id: string) => {
    toast({
      title: "Orçamento aceito",
      description: `O orçamento ${id} foi aceito com sucesso.`,
    });
  };
  
  const handleRejectOrcamento = (id: string) => {
    toast({
      title: "Orçamento recusado",
      description: `O orçamento ${id} foi recusado.`,
    });
  };

  return (
    <Card className="border-primary/20">
      <CardHeader className="bg-primary/5 flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center">
          <FileText className="mr-2 h-5 w-5 text-primary" />
          Orçamentos Recebidos
        </CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate('/pedidos')}
        >
          Ver todos
        </Button>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {orcamentos.map((orcamento) => (
            <div key={orcamento.id} className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-medium">{orcamento.cliente}</p>
                <p className="text-sm text-muted-foreground">{orcamento.descricao}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline">{orcamento.valor}</Badge>
                  <span className="text-xs text-muted-foreground">{orcamento.data}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="bg-green-500/10 border-green-500/30 hover:bg-green-500/20 text-green-700"
                  onClick={() => handleAcceptOrcamento(orcamento.id)}
                >
                  <Check className="h-4 w-4 mr-1" /> Aceitar
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="bg-red-500/10 border-red-500/30 hover:bg-red-500/20 text-red-700"
                  onClick={() => handleRejectOrcamento(orcamento.id)}
                >
                  <X className="h-4 w-4 mr-1" /> Recusar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
