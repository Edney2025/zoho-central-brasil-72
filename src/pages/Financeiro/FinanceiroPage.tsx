
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowDown, ArrowUp, DollarSign, Calendar, TrendingUp, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const dadosFinanceiros = [
  { nome: 'Jan', receitas: 4000, despesas: 2400 },
  { nome: 'Fev', receitas: 3000, despesas: 1398 },
  { nome: 'Mar', receitas: 9800, despesas: 2000 },
  { nome: 'Abr', receitas: 3908, despesas: 2780 },
  { nome: 'Mai', receitas: 4800, despesas: 1890 },
  { nome: 'Jun', receitas: 3800, despesas: 2390 },
];

const FinanceiroPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Financeiro</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" /> Período
          </Button>
          <Button variant="outline">
            <ArrowDown className="mr-2 h-4 w-4" /> Exportar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-2xl font-bold">R$ 125.430,00</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <ArrowUp className="inline h-3 w-3 text-green-500" /> 12% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Despesas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-red-500 mr-2" />
              <span className="text-2xl font-bold">R$ 45.230,00</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <ArrowDown className="inline h-3 w-3 text-green-500" /> 3% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Vendas do Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-blue-500 mr-2" />
              <span className="text-2xl font-bold">32</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <ArrowUp className="inline h-3 w-3 text-green-500" /> 8 vendas a mais que o mês anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Faturas Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
              <span className="text-2xl font-bold">5</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Total de R$ 12.430,00 a receber
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="receitas" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="receitas">Receitas</TabsTrigger>
          <TabsTrigger value="despesas">Despesas</TabsTrigger>
          <TabsTrigger value="fluxo">Fluxo de Caixa</TabsTrigger>
        </TabsList>
        
        <TabsContent value="receitas">
          <Card>
            <CardHeader>
              <CardTitle>Receitas Mensais</CardTitle>
              <CardDescription>Visão geral das receitas do último semestre</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer 
                  config={{
                    receitas: { theme: { light: '#22C55E', dark: '#22C55E' } },
                    despesas: { theme: { light: '#EF4444', dark: '#EF4444' } }
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dadosFinanceiros}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="nome" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="receitas" stroke="var(--color-receitas)" activeDot={{ r: 8 }} name="Receitas" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="despesas">
          <Card>
            <CardHeader>
              <CardTitle>Despesas Mensais</CardTitle>
              <CardDescription>Visão geral das despesas do último semestre</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer 
                  config={{
                    receitas: { theme: { light: '#22C55E', dark: '#22C55E' } },
                    despesas: { theme: { light: '#EF4444', dark: '#EF4444' } }
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dadosFinanceiros}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="nome" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="despesas" stroke="var(--color-despesas)" activeDot={{ r: 8 }} name="Despesas" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="fluxo">
          <Card>
            <CardHeader>
              <CardTitle>Fluxo de Caixa</CardTitle>
              <CardDescription>Comparativo de receitas e despesas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer 
                  config={{
                    receitas: { theme: { light: '#22C55E', dark: '#22C55E' } },
                    despesas: { theme: { light: '#EF4444', dark: '#EF4444' } }
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dadosFinanceiros}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="nome" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="receitas" stroke="var(--color-receitas)" activeDot={{ r: 8 }} name="Receitas" />
                      <Line type="monotone" dataKey="despesas" stroke="var(--color-despesas)" name="Despesas" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinanceiroPage;
