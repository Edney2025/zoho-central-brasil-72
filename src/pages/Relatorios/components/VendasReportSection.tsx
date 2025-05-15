
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { vendasMensaisData, topProdutosData } from '../data/relatorios-data';

export const VendasReportSection = () => {
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Vendas Mensais</CardTitle>
            <CardDescription>Desempenho mensal de vendas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ChartContainer 
                config={{
                  vendas: { theme: { light: '#3B82F6', dark: '#60A5FA' } }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={vendasMensaisData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="valor" fill="var(--color-vendas)" name="Vendas" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tendência de Vendas</CardTitle>
            <CardDescription>Comparativo ano atual vs. ano anterior</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ChartContainer 
                config={{
                  atual: { theme: { light: '#3B82F6', dark: '#60A5FA' } },
                  anterior: { theme: { light: '#94A3B8', dark: '#64748B' } }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={vendasMensaisData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="valor" stroke="var(--color-atual)" name="2025" />
                    <Line type="monotone" dataKey="valorAnterior" stroke="var(--color-anterior)" name="2024" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Produtos Vendidos</CardTitle>
          <CardDescription>Produtos com maior volume de vendas</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Quantidade</TableHead>
                <TableHead className="text-right">Valor Total</TableHead>
                <TableHead className="text-right">Ticket Médio</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topProdutosData.map((produto) => (
                <TableRow key={produto.id}>
                  <TableCell className="font-medium">{produto.nome}</TableCell>
                  <TableCell>{produto.categoria}</TableCell>
                  <TableCell className="text-right">{produto.quantidade}</TableCell>
                  <TableCell className="text-right">R$ {produto.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                  <TableCell className="text-right">R$ {(produto.valorTotal / produto.quantidade).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
