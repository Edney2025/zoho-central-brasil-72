
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { categoriasProdutosData, estoqueProdutosData } from '../data/relatorios-data';

export const ProdutosReportSection = () => {
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Vendas por Categoria</CardTitle>
            <CardDescription>Desempenho de vendas por categoria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ChartContainer 
                config={{
                  vendas: { theme: { light: '#3B82F6', dark: '#60A5FA' } }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoriasProdutosData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="categoria" width={100} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="vendas" fill="var(--color-vendas)" name="Vendas" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status de Estoque</CardTitle>
            <CardDescription>Situação atual do estoque</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ChartContainer 
                config={{
                  disponivel: { theme: { light: '#22C55E', dark: '#4ADE80' } },
                  baixo: { theme: { light: '#F59E0B', dark: '#FBBF24' } },
                  critico: { theme: { light: '#EF4444', dark: '#F87171' } }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={estoqueProdutosData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="categoria" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="disponivel" stackId="a" fill="var(--color-disponivel)" name="Disponível" />
                    <Bar dataKey="baixo" stackId="a" fill="var(--color-baixo)" name="Estoque Baixo" />
                    <Bar dataKey="critico" stackId="a" fill="var(--color-critico)" name="Crítico" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Produtos em Estoque Crítico</CardTitle>
          <CardDescription>Produtos que precisam de reposição</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Qtd. Atual</TableHead>
                <TableHead className="text-right">Mínimo</TableHead>
                <TableHead className="text-right">Vendas (30 dias)</TableHead>
                <TableHead className="text-right">Previsão Fim Estoque</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { id: 1, nome: 'Smartphone XYZ', categoria: 'Eletrônicos', atual: 5, minimo: 10, vendas30d: 15, previsaoFim: '7 dias' },
                { id: 2, nome: 'Notebook Ultra', categoria: 'Eletrônicos', atual: 2, minimo: 5, vendas30d: 8, previsaoFim: '3 dias' },
                { id: 3, nome: 'Sofá Retrátil', categoria: 'Móveis', atual: 1, minimo: 2, vendas30d: 3, previsaoFim: '5 dias' },
                { id: 4, nome: 'Cadeira Gamer', categoria: 'Móveis', atual: 3, minimo: 8, vendas30d: 12, previsaoFim: '8 dias' },
              ].map((produto) => (
                <TableRow key={produto.id}>
                  <TableCell className="font-medium">{produto.nome}</TableCell>
                  <TableCell>{produto.categoria}</TableCell>
                  <TableCell className="text-right text-red-500 font-bold">{produto.atual}</TableCell>
                  <TableCell className="text-right">{produto.minimo}</TableCell>
                  <TableCell className="text-right">{produto.vendas30d}</TableCell>
                  <TableCell className="text-right">{produto.previsaoFim}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
