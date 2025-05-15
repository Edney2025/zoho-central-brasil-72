
/**
 * LocalStorage service para gerenciar dados localmente
 * Este serviço será temporário até que haja integração com banco de dados
 */

// Verifica se o ambiente suporta localStorage
const isLocalStorageAvailable = () => {
  if (typeof window === 'undefined') return false;
  
  try {
    window.localStorage.setItem('test', 'test');
    window.localStorage.removeItem('test');
    return true;
  } catch (e) {
    return false;
  }
};

// Coleções de dados simuladas
const COLLECTIONS = {
  USERS: 'users',
  CUSTOMERS: 'customers',
  ORDERS: 'orders',
  QUOTES: 'quotes',
  SIMULATIONS: 'simulations',
  PRODUCTS: 'products',
  SETTINGS: 'settings',
  NOTIFICATIONS: 'notifications',
  SUPPORT_TICKETS: 'support_tickets',
  MESSAGES: 'messages',
  FAQ: 'faq',
};

// Obter dados de uma coleção
const getCollection = (collection: string) => {
  if (!isLocalStorageAvailable()) return [];
  
  try {
    const data = window.localStorage.getItem(collection);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error(`Erro ao obter coleção ${collection}:`, e);
    return [];
  }
};

// Salvar dados em uma coleção
const saveCollection = (collection: string, data: any[]) => {
  if (!isLocalStorageAvailable()) return false;
  
  try {
    window.localStorage.setItem(collection, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error(`Erro ao salvar coleção ${collection}:`, e);
    return false;
  }
};

// Adicionar item a uma coleção
const addItem = (collection: string, item: any) => {
  if (!isLocalStorageAvailable()) return null;
  
  try {
    const items = getCollection(collection);
    const newItem = { ...item, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
    items.push(newItem);
    saveCollection(collection, items);
    return newItem;
  } catch (e) {
    console.error(`Erro ao adicionar item à coleção ${collection}:`, e);
    return null;
  }
};

// Atualizar item em uma coleção
const updateItem = (collection: string, id: string, updates: any) => {
  if (!isLocalStorageAvailable()) return null;
  
  try {
    const items = getCollection(collection);
    const index = items.findIndex((item: any) => item.id === id);
    
    if (index !== -1) {
      items[index] = { 
        ...items[index], 
        ...updates, 
        updatedAt: new Date().toISOString() 
      };
      saveCollection(collection, items);
      return items[index];
    }
    return null;
  } catch (e) {
    console.error(`Erro ao atualizar item na coleção ${collection}:`, e);
    return null;
  }
};

// Remover item de uma coleção
const removeItem = (collection: string, id: string) => {
  if (!isLocalStorageAvailable()) return false;
  
  try {
    const items = getCollection(collection);
    const filteredItems = items.filter((item: any) => item.id !== id);
    
    if (items.length !== filteredItems.length) {
      saveCollection(collection, filteredItems);
      return true;
    }
    return false;
  } catch (e) {
    console.error(`Erro ao remover item da coleção ${collection}:`, e);
    return false;
  }
};

// Obter um item por ID
const getItem = (collection: string, id: string) => {
  if (!isLocalStorageAvailable()) return null;
  
  try {
    const items = getCollection(collection);
    return items.find((item: any) => item.id === id) || null;
  } catch (e) {
    console.error(`Erro ao obter item da coleção ${collection}:`, e);
    return null;
  }
};

// Inicializar dados padrão se o localStorage estiver vazio
const initializeDefaultData = () => {
  if (!isLocalStorageAvailable()) return;
  
  // Inicializar usuários padrão se não existirem
  if (getCollection(COLLECTIONS.USERS).length === 0) {
    saveCollection(COLLECTIONS.USERS, [
      {
        id: '1',
        email: 'admin@example.com',
        password: 'admin123', // Apenas para fins de demonstração
        name: 'Administrador',
        role: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        email: 'cliente@example.com',
        password: 'cliente123', // Apenas para fins de demonstração
        name: 'Cliente Exemplo',
        role: 'customer',
        createdAt: new Date().toISOString()
      }
    ]);
  }
  
  // Inicializar FAQ se não existir
  if (getCollection(COLLECTIONS.FAQ).length === 0) {
    saveCollection(COLLECTIONS.FAQ, [
      {
        id: '1',
        question: 'Como faço para solicitar um orçamento?',
        answer: 'Você pode criar uma simulação em uma de nossas calculadoras e, ao final, clicar em "Gerar Orçamento".',
        category: 'Orçamentos',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        question: 'Quais são os métodos de pagamento aceitos?',
        answer: 'Aceitamos cartão de crédito, débito, boleto bancário e transferência bancária.',
        category: 'Pagamentos',
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        question: 'Em quanto tempo meu pedido é processado?',
        answer: 'Após a aprovação, seu pedido é processado em até 2 dias úteis.',
        category: 'Pedidos',
        createdAt: new Date().toISOString()
      }
    ]);
  }
  
  // Inicializar configurações padrão
  if (getCollection(COLLECTIONS.SETTINGS).length === 0) {
    saveCollection(COLLECTIONS.SETTINGS, [
      {
        id: '1',
        category: 'taxas',
        produtosNovos: 1.99,
        produtosUsados: 2.49,
        emprestimos: 2.99,
        renegociacao: 1.79,
        parcelasMax: 96,
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        category: 'calculadoras',
        enabled: {
          produtosNovos: true,
          produtosUsados: true,
          transportes: true,
          emprestimos: true,
          renegociacao: true,
          garantias: true,
          frete: true,
          utilitarios: true
        },
        updatedAt: new Date().toISOString()
      }
    ]);
  }
};

// Exportar funções e constantes úteis
export const localStorageService = {
  COLLECTIONS,
  getCollection,
  saveCollection,
  addItem,
  updateItem,
  removeItem,
  getItem,
  initializeDefaultData,
  isAvailable: isLocalStorageAvailable
};
