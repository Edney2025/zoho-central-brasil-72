
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { clientesSegmentosData, recenciaClientesData, topClientesData } from '../data/relatorios-data';

const CORES_SEGMENTOS = ['#3B82F6', '#22C55E', '#EF4444', '#F59E0B'];

export const ClientesReportSection = () => {
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Segmentação de Clientes</CardTitle>
            <CardDescription>Distribuição por categoria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={clientesSegmentosData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="valor"
                    nameKey="segmento"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {clientesSegmentosData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CORES_SEGMENTOS[index % CORES_SEGMENTOS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value} clientes`, name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recência de Compra</CardTitle>
            <CardDescription>Última interação dos clientes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ChartContainer 
                config={{
                  clientes: { theme: { light: '#3B82F6', dark: '#60A5FA' } }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={recenciaClientesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="periodo" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="quantidade" fill="var(--color-clientes)" name="Clientes" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Clientes</CardTitle>
          <CardDescription>Clientes com maior valor em compras</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Segmento</TableHead>
                <TableHead className="text-right">Nº Compras</TableHead>
                <TableHead className="text-right">Valor Total</TableHead>
                <TableHead className="text-right">Ticket Médio</TableHead>
                <TableHead>Última Compra</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topClientesData.map((cliente) => (
                <TableRow key={cliente.id}>
                  <TableCell className="font-medium">{cliente.nome}</TableCell>
                  <TableCell>{cliente.segmento}</TableCell>
                  <TableCell className="text-right">{cliente.compras}</TableCell>
                  <TableCell className="text-right">R$ {cliente.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                  <TableCell className="text-right">R$ {(cliente.valorTotal / cliente.compras).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                  <TableCell>{cliente.ultimaCompra}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
