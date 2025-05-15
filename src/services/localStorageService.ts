
export const localStorageService = {
  /**
   * Gets data from localStorage by key
   */
  getData: (key: string) => {
    if (typeof window === 'undefined') return null;

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting localStorage data for key ${key}:`, error);
      return null;
    }
  },

  /**
   * Sets data in localStorage by key
   */
  setData: (key: string, value: any) => {
    if (typeof window === 'undefined') return;

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage data for key ${key}:`, error);
    }
  },

  /**
   * Removes data from localStorage by key
   */
  removeData: (key: string) => {
    if (typeof window === 'undefined') return;

    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage data for key ${key}:`, error);
    }
  },

  /**
   * Initializes default data in localStorage if it doesn't exist
   */
  initializeDefaultData: () => {
    // Exemplo de dados padrão para inicialização
    const orcamentosExemplo = [
      { 
        id: 'ORC001', 
        cliente: {
          nome: 'Empresa XYZ Inc',
          email: 'contato@xyz.com',
          telefone: '(11) 98765-4321',
          endereco: 'Av. Paulista, 1000, São Paulo - SP'
        },
        valor: 'R$ 22.500,00', 
        data: '10/05/2023', 
        validade: '10/06/2023', 
        status: 'pendente',
        items: [
          { id: 'ITEM001', nome: 'Serviço de Consultoria', quantidade: 1, valorUnitario: 'R$ 10.000,00', valorTotal: 'R$ 10.000,00' },
          { id: 'ITEM002', nome: 'Licença de Software Premium', quantidade: 5, valorUnitario: 'R$ 2.500,00', valorTotal: 'R$ 12.500,00' }
        ],
        historico: [
          { data: '10/05/2023 10:30', evento: 'Orçamento criado', usuario: 'Carlos Silva' },
          { data: '11/05/2023 14:15', evento: 'Email enviado ao cliente', usuario: 'Ana Torres' },
          { data: '13/05/2023 09:22', evento: 'Cliente visualizou o orçamento', usuario: 'Sistema' }
        ],
        condicoesPagamento: 'Parcelado em 3x sem juros',
        observacoes: 'Entrega em até 30 dias após aprovação. Inclui treinamento básico para até 5 usuários.',
        anexos: [
          { nome: 'Proposta_Detalhada.pdf', tamanho: '1.2 MB' },
          { nome: 'Termos_Servico.pdf', tamanho: '450 KB' }
        ]
      },
      { 
        id: 'ORC002', 
        cliente: {
          nome: 'Pedro Almeida',
          email: 'pedro@email.com',
          telefone: '(21) 97654-3210',
          endereco: 'Rua das Flores, 123, Rio de Janeiro - RJ'
        },
        valor: 'R$ 7.800,00', 
        data: '12/05/2023', 
        validade: '12/06/2023', 
        status: 'aprovado',
        items: [
          { id: 'ITEM003', nome: 'Consultoria Técnica', quantidade: 2, valorUnitario: 'R$ 1.900,00', valorTotal: 'R$ 3.800,00' },
          { id: 'ITEM004', nome: 'Sistema ERP - Licença Anual', quantidade: 1, valorUnitario: 'R$ 4.000,00', valorTotal: 'R$ 4.000,00' }
        ],
        historico: [
          { data: '12/05/2023 11:20', evento: 'Orçamento criado', usuario: 'Ana Torres' },
          { data: '12/05/2023 15:45', evento: 'Email enviado ao cliente', usuario: 'Ana Torres' },
          { data: '14/05/2023 10:30', evento: 'Cliente aprovou o orçamento', usuario: 'Sistema' },
          { data: '14/05/2023 14:15', evento: 'Pedido #PED002 gerado', usuario: 'Sistema' }
        ],
        condicoesPagamento: 'À vista com 5% de desconto',
        observacoes: 'Implementação imediata após confirmação do pagamento.',
        anexos: [
          { nome: 'Contrato_Servico.pdf', tamanho: '2.1 MB' }
        ]
      },
      { 
        id: 'ORC003', 
        cliente: {
          nome: 'Ana Ferreira',
          email: 'ana@ferreira.com',
          telefone: '(31) 98877-6655',
          endereco: 'Av. Central, 500, Belo Horizonte - MG'
        },
        valor: 'R$ 9.200,00', 
        data: '14/05/2023', 
        validade: '14/06/2023', 
        status: 'reprovado',
        items: [
          { id: 'ITEM005', nome: 'Desenvolvimento Web', quantidade: 1, valorUnitario: 'R$ 5.200,00', valorTotal: 'R$ 5.200,00' },
          { id: 'ITEM006', nome: 'Hospedagem Premium (Anual)', quantidade: 2, valorUnitario: 'R$ 2.000,00', valorTotal: 'R$ 4.000,00' }
        ],
        historico: [
          { data: '14/05/2023 09:10', evento: 'Orçamento criado', usuario: 'Carlos Silva' },
          { data: '14/05/2023 10:30', evento: 'Email enviado ao cliente', usuario: 'Ana Torres' },
          { data: '18/05/2023 16:45', evento: 'Cliente rejeitou o orçamento', usuario: 'Sistema' },
          { data: '19/05/2023 11:20', evento: 'Feedback registrado: Valor acima do orçado pelo cliente', usuario: 'Carlos Silva' }
        ],
        condicoesPagamento: 'Parcelado em 2x sem juros',
        observacoes: 'Cliente solicitou renegociação dos valores. Aguardando retorno para novo orçamento.',
        anexos: [
          { nome: 'Especificacoes_Tecnicas.pdf', tamanho: '1.8 MB' },
          { nome: 'Cronograma_Projeto.pdf', tamanho: '550 KB' }
        ]
      },
      { 
        id: 'ORC004', 
        cliente: {
          nome: 'Empresa ABC Ltda',
          email: 'financeiro@abc.com',
          telefone: '(11) 3322-1100',
          endereco: 'Rua Comercial, 200, São Paulo - SP'
        },
        valor: 'R$ 15.300,00', 
        data: '18/05/2023', 
        validade: '18/06/2023', 
        status: 'pendente',
        items: [
          { id: 'ITEM007', nome: 'Consultoria Estratégica', quantidade: 1, valorUnitario: 'R$ 8.300,00', valorTotal: 'R$ 8.300,00' },
          { id: 'ITEM008', nome: 'Treinamento Personalizado', quantidade: 2, valorUnitario: 'R$ 3.500,00', valorTotal: 'R$ 7.000,00' }
        ],
        historico: [
          { data: '18/05/2023 14:20', evento: 'Orçamento criado', usuario: 'Ana Torres' },
          { data: '18/05/2023 16:30', evento: 'Email enviado ao cliente', usuario: 'Ana Torres' },
          { data: '20/05/2023 09:45', evento: 'Cliente visualizou o orçamento', usuario: 'Sistema' },
          { data: '21/05/2023 11:10', evento: 'Cliente solicitou reunião', usuario: 'Carlos Silva' }
        ],
        condicoesPagamento: 'Entrada de 30% + 3x sem juros',
        observacoes: 'Cliente solicitou reunião para esclarecimentos adicionais. Agendada para 25/05.',
        anexos: [
          { nome: 'Proposta_Detalhada.pdf', tamanho: '2.4 MB' },
          { nome: 'Apresentacao_Servicos.pdf', tamanho: '1.8 MB' }
        ]
      }
    ];

    // Inicializar orçamentos se não existirem
    if (!localStorageService.getData('orcamentos')) {
      localStorageService.setData('orcamentos', orcamentosExemplo);
    }

    // Adicione outras inicializações conforme necessário
  },
};
