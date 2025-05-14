
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export const TaskList = () => (
  <Card>
    <CardHeader>
      <CardTitle>Tarefas Pendentes</CardTitle>
    </CardHeader>
    <CardContent className="max-h-[300px] overflow-auto">
      <ul className="space-y-2">
        <li className="p-3 bg-muted/50 rounded-md">
          <div className="font-medium">Confirmar pagamento do cliente XYZ</div>
          <div className="text-sm text-muted-foreground">Vence hoje</div>
        </li>
        <li className="p-3 bg-muted/50 rounded-md">
          <div className="font-medium">Atualizar estoque de produtos</div>
          <div className="text-sm text-muted-foreground">Vence em 2 dias</div>
        </li>
        <li className="p-3 bg-muted/50 rounded-md">
          <div className="font-medium">Revisar orçamentos pendentes</div>
          <div className="text-sm text-muted-foreground">Vence em 3 dias</div>
        </li>
        <li className="p-3 bg-muted/50 rounded-md">
          <div className="font-medium">Contatar fornecedores para reposição</div>
          <div className="text-sm text-muted-foreground">Vence em 3 dias</div>
        </li>
        <li className="p-3 bg-muted/50 rounded-md">
          <div className="font-medium">Preparar relatório mensal</div>
          <div className="text-sm text-muted-foreground">Vence em 5 dias</div>
        </li>
      </ul>
    </CardContent>
  </Card>
);
