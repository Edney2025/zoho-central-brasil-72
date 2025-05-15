
export interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  tipo: string;
  dataCadastro: string;
  status: string;
  isPessoaJuridica?: boolean;
  cpf?: string;
  cnpj?: string;
  tags?: string[];
  proximoContato?: string;
  classificacao?: string;
}
