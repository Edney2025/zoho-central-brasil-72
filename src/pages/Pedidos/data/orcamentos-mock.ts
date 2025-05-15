
export interface Orcamento {
  id: string;
  cliente: string;
  valor: string;
  data: string;
  validade: string;
  status: 'aprovado' | 'reprovado' | 'pendente' | 'vencido';
}

export const orcamentosMock: Orcamento[] = [
  { 
    id: 'ORC001', 
    cliente: 'Empresa XYZ Inc', 
    valor: 'R$ 22.500,00', 
    data: '10/05/2023', 
    validade: '10/06/2023', 
    status: 'pendente'
  },
  { 
    id: 'ORC002', 
    cliente: 'Pedro Almeida', 
    valor: 'R$ 7.800,00', 
    data: '12/05/2023', 
    validade: '12/06/2023', 
    status: 'aprovado'
  },
  { 
    id: 'ORC003', 
    cliente: 'Ana Ferreira', 
    valor: 'R$ 9.200,00', 
    data: '14/05/2023', 
    validade: '14/06/2023', 
    status: 'reprovado'
  },
  { 
    id: 'ORC004', 
    cliente: 'Empresa ABC Ltda', 
    valor: 'R$ 15.300,00', 
    data: '18/05/2023', 
    validade: '18/06/2023', 
    status: 'pendente'
  },
  { 
    id: 'ORC005', 
    cliente: 'João Santos', 
    valor: 'R$ 5.900,00', 
    data: '20/04/2023', 
    validade: '20/05/2023', 
    status: 'vencido'
  },
  { 
    id: 'ORC006', 
    cliente: 'Maria Oliveira', 
    valor: 'R$ 11.450,00', 
    data: '22/05/2023', 
    validade: '22/06/2023', 
    status: 'pendente'
  }
];
