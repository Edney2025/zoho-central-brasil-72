
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings, User, CreditCard, Bell, Lock } from 'lucide-react';

const ConfiguracoesPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Configurações</h1>
      
      <Tabs defaultValue="perfil" className="w-full">
        <div className="flex flex-col md:flex-row gap-6">
          <TabsList className="flex md:flex-col h-auto p-1 md:p-2 md:w-48 space-y-1">
            <TabsTrigger value="perfil" className="w-full justify-start gap-2 px-2">
              <User className="h-4 w-4" />
              <span>Perfil</span>
            </TabsTrigger>
            <TabsTrigger value="empresa" className="w-full justify-start gap-2 px-2">
              <Settings className="h-4 w-4" />
              <span>Empresa</span>
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
          </TabsList>
          
          <div className="flex-1">
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
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default ConfiguracoesPage;
