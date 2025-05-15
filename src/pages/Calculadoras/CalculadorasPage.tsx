
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, Calculator, Filter, Search } from 'lucide-react';
import { CalculadorasList } from '@/features/calculadoras/components/CalculadorasList';
import { SimulacoesLista } from '@/features/calculadoras/components/SimulacoesLista';
import { ComparacaoSimulacoes } from '@/features/calculadoras/components/ComparacaoSimulacoes';
import { useSimulacoes } from '@/features/calculadoras/hooks/useSimulacoes';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const CalculadorasPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  const { 
    simulacoes, 
    selectedSimulacoes, 
    loading,
    toggleSelectSimulacao, 
    removeSimulacao, 
    shareSimulacao,
    createOrcamentoFromSimulacao,
    clearSelectedSimulacoes,
    getSelectedSimulacoes
  } = useSimulacoes();
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleFilterByCategory = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };
  
  const selectedSimulacoesData = getSelectedSimulacoes();
  
  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between">
        <h1 className="text-3xl font-bold">Calculadoras Financeiras</h1>
        <div className="text-sm text-muted-foreground">
          Total de {simulacoes.length} simulação(ões) salva(s)
        </div>
      </div>
      
      <Tabs defaultValue="calculadoras">
        <TabsList className="mb-4">
          <TabsTrigger value="calculadoras">
            <Calculator className="h-4 w-4 mr-2" />
            Calculadoras
          </TabsTrigger>
          <TabsTrigger value="simulacoes">
            <Filter className="h-4 w-4 mr-2" />
            Simulações Salvas
          </TabsTrigger>
          <TabsTrigger value="comparacao">
            <Search className="h-4 w-4 mr-2" />
            Comparar ({selectedSimulacoesData.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="calculadoras">
          <Card>
            <CardHeader>
              <CardTitle>Escolha uma Calculadora</CardTitle>
              <CardDescription>
                Selecione uma calculadora para realizar simulações financeiras
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <Input 
                  placeholder="Buscar calculadoras..." 
                  value={searchTerm}
                  onChange={handleSearch}
                  className="md:max-w-xs"
                />
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant={selectedCategory === 'produtos' ? "default" : "outline"} 
                    size="sm"
                    onClick={() => handleFilterByCategory('produtos')}
                  >
                    Produtos
                  </Button>
                  <Button 
                    variant={selectedCategory === 'financiamentos' ? "default" : "outline"} 
                    size="sm"
                    onClick={() => handleFilterByCategory('financiamentos')}
                  >
                    Financiamentos
                  </Button>
                  <Button 
                    variant={selectedCategory === 'emprestimos' ? "default" : "outline"} 
                    size="sm"
                    onClick={() => handleFilterByCategory('emprestimos')}
                  >
                    Empréstimos
                  </Button>
                  <Button 
                    variant={selectedCategory === 'transportes' ? "default" : "outline"} 
                    size="sm"
                    onClick={() => handleFilterByCategory('transportes')}
                  >
                    Transportes
                  </Button>
                  <Button 
                    variant={selectedCategory === 'servicos' ? "default" : "outline"} 
                    size="sm"
                    onClick={() => handleFilterByCategory('servicos')}
                  >
                    Serviços
                  </Button>
                  <Button 
                    variant={selectedCategory === 'garantias' ? "default" : "outline"} 
                    size="sm"
                    onClick={() => handleFilterByCategory('garantias')}
                  >
                    Garantias
                  </Button>
                  <Button 
                    variant={selectedCategory === 'outros' ? "default" : "outline"} 
                    size="sm"
                    onClick={() => handleFilterByCategory('outros')}
                  >
                    Outros
                  </Button>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <CalculadorasList 
                filter={selectedCategory || searchTerm} 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="simulacoes">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between">
                <div>Simulações Salvas</div>
                {selectedSimulacoes.length > 0 && (
                  <Button variant="outline" size="sm" onClick={clearSelectedSimulacoes}>
                    Limpar seleção ({selectedSimulacoes.length})
                  </Button>
                )}
              </CardTitle>
              <CardDescription>
                Visualize, compare e gerencie suas simulações salvas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SimulacoesLista 
                simulacoes={simulacoes}
                selectedIds={selectedSimulacoes}
                onSelect={toggleSelectSimulacao}
                onShare={shareSimulacao}
                onCreateOrcamento={createOrcamentoFromSimulacao}
                onRemove={removeSimulacao}
              />
              
              {simulacoes.length > 0 && selectedSimulacoes.length === 0 && (
                <Alert className="mt-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Selecione simulações para comparar</AlertTitle>
                  <AlertDescription>
                    Marque as simulações que deseja comparar e vá para a aba "Comparar".
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="comparacao">
          <ComparacaoSimulacoes 
            simulacoes={selectedSimulacoesData}
            onRemove={toggleSelectSimulacao}
            onShare={shareSimulacao}
            onCreateOrcamento={createOrcamentoFromSimulacao}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CalculadorasPage;
