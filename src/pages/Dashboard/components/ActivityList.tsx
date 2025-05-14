
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export const ActivityList = () => (
  <Card>
    <CardHeader>
      <CardTitle>Atividades Recentes</CardTitle>
    </CardHeader>
    <CardContent className="max-h-[300px] overflow-auto">
      <ul className="space-y-2">
        <li className="p-3 bg-muted/50 rounded-md">
          <div className="font-medium">Novo cliente cadastrado</div>
          <div className="text-sm text-muted-foreground">Hoje, 10:45</div>
        </li>
        <li className="p-3 bg-muted/50 rounded-md">
          <div className="font-medium">Orçamento aprovado - #5123</div>
          <div className="text-sm text-muted-foreground">Ontem, 15:30</div>
        </li>
        <li className="p-3 bg-muted/50 rounded-md">
          <div className="font-medium">Produto abaixo do estoque mínimo</div>
          <div className="text-sm text-muted-foreground">Ontem, 09:15</div>
        </li>
        <li className="p-3 bg-muted/50 rounded-md">
          <div className="font-medium">Simulação de financiamento realizada</div>
          <div className="text-sm text-muted-foreground">2 dias atrás, 14:22</div>
        </li>
        <li className="p-3 bg-muted/50 rounded-md">
          <div className="font-medium">Venda finalizada - #4982</div>
          <div className="text-sm text-muted-foreground">2 dias atrás, 11:05</div>
        </li>
      </ul>
    </CardContent>
  </Card>
);
