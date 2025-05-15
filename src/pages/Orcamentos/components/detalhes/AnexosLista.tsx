
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';
import { Anexo } from '../../types/orcamento';

interface AnexosListaProps {
  anexos: Anexo[];
}

export const AnexosLista: React.FC<AnexosListaProps> = ({ anexos }) => {
  if (anexos.length === 0) return null;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Anexos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {anexos.map((anexo, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded-md border hover:bg-muted/50">
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2 text-primary" />
                <span>{anexo.nome}</span>
                <span className="ml-2 text-xs text-muted-foreground">({anexo.tamanho})</span>
              </div>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
