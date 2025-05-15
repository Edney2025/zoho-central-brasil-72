
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { FileText, Calendar, Clock, CreditCard } from 'lucide-react';
import { Item } from '../../types/orcamento';

interface OrcamentoInfoProps {
  id: string;
  data: string;
  validade: string;
  valor: string;
  items: Item[];
  condicoesPagamento: string;
  observacoes: string;
}

export const OrcamentoInfo: React.FC<OrcamentoInfoProps> = ({
  id,
  data,
  validade,
  valor,
  items,
  condicoesPagamento,
  observacoes
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="h-5 w-5 mr-2 text-primary" />
          Informações do Orçamento
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Número</p>
            <p className="font-medium">{id}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Data de Emissão</p>
            <div className="flex items-center">
              <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
              <p>{data}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Validade</p>
            <div className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
              <p>{validade}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Valor Total</p>
            <p className="font-medium text-lg text-primary">{valor}</p>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Itens do Orçamento</h3>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Código</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-center">Qtd</TableHead>
                  <TableHead className="text-right">Valor Unit.</TableHead>
                  <TableHead className="text-right">Valor Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono text-sm">{item.id}</TableCell>
                    <TableCell>{item.nome}</TableCell>
                    <TableCell className="text-center">{item.quantidade}</TableCell>
                    <TableCell className="text-right">{item.valorUnitario}</TableCell>
                    <TableCell className="text-right font-medium">{item.valorTotal}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Condições de Pagamento</h3>
            <div className="bg-muted/30 p-3 rounded-md flex items-start">
              <CreditCard className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
              <p>{condicoesPagamento}</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Observações</h3>
            <div className="bg-muted/30 p-3 rounded-md">
              <p className="text-sm">{observacoes}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
