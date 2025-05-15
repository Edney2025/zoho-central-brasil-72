
import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const EmptyState: React.FC = () => {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Comparação de Simulações</CardTitle>
        <CardDescription>
          Selecione simulações para comparar os valores e condições.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center h-32 border border-dashed rounded-md">
          <p className="text-muted-foreground">Nenhuma simulação selecionada</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyState;
