
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Tag } from 'lucide-react';

const TaxasTab = () => {
  // State for financial calculators rates
  const [taxasProdutosNovos, setTaxasProdutosNovos] = useState('1.99');
  const [taxasProdutosUsados, setTaxasProdutosUsados] = useState('2.49');
  const [taxasEmprestimos, setTaxasEmprestimos] = useState('2.99');
  const [taxasRenegociacao, setTaxasRenegociacao] = useState('1.79');
  
  // State for installment settings
  const [parcelasMax, setParcelasMax] = useState('96');

  const handleSaveRates = () => {
    toast({
      title: "Taxas salvas",
      description: "As configurações de taxas foram atualizadas com sucesso."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuração de Taxas</CardTitle>
        <CardDescription>
          Configure as taxas utilizadas em todas as calculadoras financeiras.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <h3 className="text-lg font-medium">Taxas por Tipo de Operação</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="taxa-produtos-novos">Taxa para Produtos Novos (%)</Label>
            <Input 
              id="taxa-produtos-novos" 
              type="number" 
              step="0.01" 
              value={taxasProdutosNovos}
              onChange={(e) => setTaxasProdutosNovos(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="taxa-produtos-usados">Taxa para Produtos Usados (%)</Label>
            <Input 
              id="taxa-produtos-usados" 
              type="number" 
              step="0.01" 
              value={taxasProdutosUsados}
              onChange={(e) => setTaxasProdutosUsados(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="taxa-emprestimos">Taxa para Empréstimos (%)</Label>
            <Input 
              id="taxa-emprestimos" 
              type="number" 
              step="0.01" 
              value={taxasEmprestimos}
              onChange={(e) => setTaxasEmprestimos(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="taxa-renegociacao">Taxa para Renegociação (%)</Label>
            <Input 
              id="taxa-renegociacao" 
              type="number" 
              step="0.01" 
              value={taxasRenegociacao}
              onChange={(e) => setTaxasRenegociacao(e.target.value)}
            />
          </div>
        </div>

        <h3 className="text-lg font-medium mt-6">Configurações de Parcelas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="parcelas-max">Número Máximo de Parcelas</Label>
            <Input 
              id="parcelas-max" 
              type="number" 
              value={parcelasMax}
              onChange={(e) => setParcelasMax(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">Sempre múltiplos de 3 (3x, 6x, 9x...)</p>
          </div>
        </div>

        <Button onClick={handleSaveRates} className="mt-4">Salvar Alterações</Button>
      </CardContent>
    </Card>
  );
};

export default TaxasTab;
