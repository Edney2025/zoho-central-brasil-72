
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { fluxoCaixaData } from '../data/relatorios-data';

export const FinanceiroReportSection = () => {
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Fluxo de Caixa</CardTitle>
            <CardDescription>Receitas x Despesas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer 
                config={{
                  receitas: { theme: { light: '#22C55E', dark: '#4ADE80' } },
                  despesas: { theme: { light: '#EF4444', dark: '#F87171' } },
                  liquido: { theme: { light: '#3B82F6', dark: '#60A5FA' } }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={fluxoCaixaData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="receitas" stroke="var(--color-receitas)" name="Receitas" />
                    <Line type="monotone" dataKey="despesas" stroke="var(--color-despesas)" name="Despesas" />
                    <Line type="monotone" dataKey="liquido" stroke="var(--color-liquido)" name="Líquido" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contas a Receber</CardTitle>
          <CardDescription>Faturas em aberto</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Referência</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead>Emissão</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { id: 1, cliente: 'Empresa ABC', referencia: 'FAT-2025-001', valor: 5000, emissao: '02/05/2025', vencimento: '01/06/2025', status: 'Em Aberto' },
                { id: 2, cliente: 'Comércio XYZ', referencia: 'FAT-2025-002', valor: 3200, emissao: '05/05/2025', vencimento: '04/06/2025', status: 'Em Aberto' },
                { id: 3, cliente: 'Cliente PQR', referencia: 'FAT-2025-003', valor: 1500, emissao: '10/05/2025', vencimento: '09/06/2025', status: 'Em Aberto' },
                { id: 4, cliente: 'Loja DEF', referencia: 'FAT-2025-004', valor: 4300, emissao: '12/05/2025', vencimento: '11/06/2025', status: 'Em Aberto' },
                { id: 5, cliente: 'Indústria GHI', referencia: 'FAT-2025-005', valor: 8700, emissao: '15/05/2025', vencimento: '14/06/2025', status: 'Em Aberto' },
              ].map((conta) => (
                <TableRow key={conta.id}>
                  <TableCell className="font-medium">{conta.cliente}</TableCell>
                  <TableCell>{conta.referencia}</TableCell>
                  <TableCell className="text-right">R$ {conta.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                  <TableCell>{conta.emissao}</TableCell>
                  <TableCell>{conta.vencimento}</TableCell>
                  <TableCell>{conta.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
