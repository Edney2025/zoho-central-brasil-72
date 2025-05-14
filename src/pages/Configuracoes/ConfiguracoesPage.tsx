
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings, User, CreditCard, Bell, Lock, Calculator, Package, Building, Tag } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from '@/hooks/use-toast';

const ConfiguracoesPage = () => {
  const { theme, setTheme } = useTheme();
  
  // State for financial calculators rates
  const [taxasProdutosNovos, setTaxasProdutosNovos] = useState('1.99');
  const [taxasProdutosUsados, setTaxasProdutosUsados] = useState('2.49');
  const [taxasEmprestimos, setTaxasEmprestimos] = useState('2.99');
  const [taxasRenegociacao, setTaxasRenegociacao] = useState('1.79');
  
  // State for installment settings
  const [parcelasMax, setParcelasMax] = useState('96');
  const [diasVencimento, setDiasVencimento] = useState(['5', '10', '15', '20', '25', '30']);
  
  // State for calculator toggles
  const [calculadorasAtivas, setCalculadorasAtivas] = useState({
    produtosNovos: true,
    produtosUsados: true,
    transportes: true,
    emprestimos: true,
    renegociacao: true,
    garantias: true,
    frete: true,
    utilitarios: true
  });

  const handleSaveRates = () => {
    toast({
      title: "Taxas salvas",
      description: "As configurações de taxas foram atualizadas com sucesso."
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: "Configurações salvas",
      description: "As preferências do sistema foram atualizadas com sucesso."
    });
  };

  const handleCalculatorToggle = (calculator) => {
    setCalculadorasAtivas(prev => ({
      ...prev,
      [calculator]: !prev[calculator]
    }));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Configurações</h1>
      
      <Tabs defaultValue="taxas" className="w-full">
        <div className="flex flex-col md:flex-row gap-6">
          <TabsList className="flex md:flex-col h-auto p-1 md:p-2 md:w-48 space-y-1">
            <TabsTrigger value="taxas" className="w-full justify-start gap-2 px-2">
              <Tag className="h-4 w-4" />
              <span>Taxas</span>
            </TabsTrigger>
            <TabsTrigger value="perfil" className="w-full justify-start gap-2 px-2">
              <User className="h-4 w-4" />
              <span>Perfil</span>
            </TabsTrigger>
            <TabsTrigger value="empresa" className="w-full justify-start gap-2 px-2">
              <Building className="h-4 w-4" />
              <span>Empresa</span>
            </TabsTrigger>
            <TabsTrigger value="calculadoras" className="w-full justify-start gap-2 px-2">
              <Calculator className="h-4 w-4" />
              <span>Calculadoras</span>
            </TabsTrigger>
            <TabsTrigger value="financeiro" className="w-full justify-start gap-2 px-2">
              <CreditCard className="h-4 w-4" />
              <span>Financeiro</span>
            </TabsTrigger>
            <TabsTrigger value="notificacoes" className="w-full justify-start gap-2 px-2">
              <Bell className="h-4 w-4" />
              <span>Notificações</span>
            </TabsTrigger>
            <TabsTrigger value="seguranca" className="w-full justify-start gap-2 px-2">
              <Lock className="h-4 w-4" />
              <span>Segurança</span>
            </TabsTrigger>
            <TabsTrigger value="sistema" className="w-full justify-start gap-2 px-2">
              <Settings className="h-4 w-4" />
              <span>Sistema</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="flex-1">
            <TabsContent value="taxas">
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
            </TabsContent>
            
            <TabsContent value="calculadoras">
              <Card>
                <CardHeader>
                  <CardTitle>Configuração das Calculadoras</CardTitle>
                  <CardDescription>
                    Ative ou desative calculadoras e defina suas configurações específicas.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-6">
                    <div className="flex items-center justify-between border-b pb-3">
                      <div>
                        <p className="font-medium">Produtos Novos</p>
                        <p className="text-sm text-muted-foreground">Calculadoras para produtos novos com e sem entrada</p>
                      </div>
                      <Switch 
                        checked={calculadorasAtivas.produtosNovos} 
                        onCheckedChange={() => handleCalculatorToggle('produtosNovos')} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between border-b pb-3">
                      <div>
                        <p className="font-medium">Produtos Usados</p>
                        <p className="text-sm text-muted-foreground">Calculadoras para produtos usados com e sem entrada</p>
                      </div>
                      <Switch 
                        checked={calculadorasAtivas.produtosUsados} 
                        onCheckedChange={() => handleCalculatorToggle('produtosUsados')} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between border-b pb-3">
                      <div>
                        <p className="font-medium">Transportes</p>
                        <p className="text-sm text-muted-foreground">Automóveis, bicicletas elétricas, patinetes</p>
                      </div>
                      <Switch 
                        checked={calculadorasAtivas.transportes} 
                        onCheckedChange={() => handleCalculatorToggle('transportes')} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between border-b pb-3">
                      <div>
                        <p className="font-medium">Empréstimos</p>
                        <p className="text-sm text-muted-foreground">Empréstimos parcelados e de parcela única</p>
                      </div>
                      <Switch 
                        checked={calculadorasAtivas.emprestimos} 
                        onCheckedChange={() => handleCalculatorToggle('emprestimos')} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between border-b pb-3">
                      <div>
                        <p className="font-medium">Renegociação</p>
                        <p className="text-sm text-muted-foreground">Parcelas atrasadas, a vencer e total</p>
                      </div>
                      <Switch 
                        checked={calculadorasAtivas.renegociacao} 
                        onCheckedChange={() => handleCalculatorToggle('renegociacao')} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between border-b pb-3">
                      <div>
                        <p className="font-medium">Garantias Estendidas</p>
                        <p className="text-sm text-muted-foreground">Produtos nacionais, importados, bicicletas</p>
                      </div>
                      <Switch 
                        checked={calculadorasAtivas.garantias} 
                        onCheckedChange={() => handleCalculatorToggle('garantias')} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between border-b pb-3">
                      <div>
                        <p className="font-medium">Frete</p>
                        <p className="text-sm text-muted-foreground">Caminhão, carro, moto, retirada</p>
                      </div>
                      <Switch 
                        checked={calculadorasAtivas.frete} 
                        onCheckedChange={() => handleCalculatorToggle('frete')} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between pb-3">
                      <div>
                        <p className="font-medium">Utilitários</p>
                        <p className="text-sm text-muted-foreground">Conversor de moedas e outras utilidades</p>
                      </div>
                      <Switch 
                        checked={calculadorasAtivas.utilitarios} 
                        onCheckedChange={() => handleCalculatorToggle('utilitarios')} 
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleSaveSettings} className="mt-4">Salvar Preferências</Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="perfil">
              <Card>
                <CardHeader>
                  <CardTitle>Perfil</CardTitle>
                  <CardDescription>
                    Gerencie suas informações pessoais e conta.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome</Label>
                      <Input id="nome" defaultValue="Admin" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sobrenome">Sobrenome</Label>
                      <Input id="sobrenome" defaultValue="Usuário" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" defaultValue="desenvolvimento@exemplo.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input id="telefone" type="tel" />
                  </div>
                  <Button>Salvar Alterações</Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="empresa">
              <Card>
                <CardHeader>
                  <CardTitle>Empresa</CardTitle>
                  <CardDescription>
                    Configure os dados da empresa.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="empresa-nome">Nome da Empresa</Label>
                    <Input id="empresa-nome" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input id="cnpj" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="telefone-empresa">Telefone</Label>
                      <Input id="telefone-empresa" type="tel" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email-empresa">E-mail</Label>
                      <Input id="email-empresa" type="email" />
                    </div>
                  </div>
                  <Button>Salvar Alterações</Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="financeiro">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações Financeiras</CardTitle>
                  <CardDescription>
                    Configure parâmetros financeiros.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="taxa-padrao">Taxa de Juros Padrão (%)</Label>
                    <Input id="taxa-padrao" type="number" defaultValue="1.99" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parcelas-max">Parcelas Máximas</Label>
                    <Input id="parcelas-max" type="number" defaultValue="96" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="simular-automatico" />
                    <Label htmlFor="simular-automatico">Simular automaticamente ao abrir calculadoras</Label>
                  </div>
                  <Button>Salvar Alterações</Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notificacoes">
              <Card>
                <CardHeader>
                  <CardTitle>Notificações</CardTitle>
                  <CardDescription>
                    Configure suas preferências de notificação.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Novos pedidos</p>
                      <p className="text-sm text-muted-foreground">Receba notificações quando novos pedidos forem criados</p>
                    </div>
                    <Switch id="notif-pedidos" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Alertas de estoque</p>
                      <p className="text-sm text-muted-foreground">Receba alertas quando produtos estiverem com estoque baixo</p>
                    </div>
                    <Switch id="notif-estoque" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Faturas vencidas</p>
                      <p className="text-sm text-muted-foreground">Receba alertas sobre faturas vencidas ou próximas do vencimento</p>
                    </div>
                    <Switch id="notif-faturas" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">E-mails de resumo</p>
                      <p className="text-sm text-muted-foreground">Receba e-mails com resumos semanais</p>
                    </div>
                    <Switch id="notif-emails" />
                  </div>
                  <Button>Salvar Preferências</Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="seguranca">
              <Card>
                <CardHeader>
                  <CardTitle>Segurança</CardTitle>
                  <CardDescription>
                    Gerencie suas configurações de segurança.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="senha-atual">Senha Atual</Label>
                    <Input id="senha-atual" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nova-senha">Nova Senha</Label>
                    <Input id="nova-senha" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmar-senha">Confirmar Nova Senha</Label>
                    <Input id="confirmar-senha" type="password" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="dois-fatores" />
                    <Label htmlFor="dois-fatores">Ativar autenticação de dois fatores</Label>
                  </div>
                  <Button>Atualizar Senha</Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="sistema">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações do Sistema</CardTitle>
                  <CardDescription>
                    Personalize a aparência e comportamento do sistema.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Tema do Sistema</h3>
                    <div className="flex flex-wrap gap-4">
                      <div 
                        className={`border rounded-lg p-4 w-28 cursor-pointer ${theme === 'light' ? 'ring-2 ring-primary' : ''}`}
                        onClick={() => setTheme('light')}
                      >
                        <div className="h-12 mb-2 bg-white border rounded-md"></div>
                        <p className="text-center text-sm">Claro</p>
                      </div>
                      
                      <div 
                        className={`border rounded-lg p-4 w-28 cursor-pointer ${theme === 'dark' ? 'ring-2 ring-primary' : ''}`}
                        onClick={() => setTheme('dark')}
                      >
                        <div className="h-12 mb-2 bg-slate-800 border rounded-md"></div>
                        <p className="text-center text-sm">Escuro</p>
                      </div>
                      
                      <div 
                        className={`border rounded-lg p-4 w-28 cursor-pointer ${theme === 'corporate' ? 'ring-2 ring-primary' : ''}`}
                        onClick={() => setTheme('corporate')}
                      >
                        <div className="h-12 mb-2 bg-blue-600 border rounded-md"></div>
                        <p className="text-center text-sm">Corporativo</p>
                      </div>
                      
                      <div 
                        className={`border rounded-lg p-4 w-28 cursor-pointer ${theme === 'elegant' ? 'ring-2 ring-primary' : ''}`}
                        onClick={() => setTheme('elegant')}
                      >
                        <div className="h-12 mb-2 bg-amber-800 border rounded-md"></div>
                        <p className="text-center text-sm">Elegante</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h3 className="text-lg font-medium mb-3">Preferências Gerais</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Modo compacto</p>
                          <p className="text-sm text-muted-foreground">Reduz o espaçamento entre os elementos</p>
                        </div>
                        <Switch id="compact-mode" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Exibir margem de lucro</p>
                          <p className="text-sm text-muted-foreground">Mostra a margem de lucro nos relatórios</p>
                        </div>
                        <Switch id="show-profit" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Alertas sonoros</p>
                          <p className="text-sm text-muted-foreground">Ativa sons para notificações importantes</p>
                        </div>
                        <Switch id="sound-alerts" />
                      </div>
                    </div>
                  </div>
                  
                  <Button onClick={handleSaveSettings}>Salvar Configurações</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default ConfiguracoesPage;
