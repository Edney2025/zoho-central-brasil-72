
import { z } from "zod";

// Define o schema para validação do formulário
export const clienteFormSchema = z.object({
  // Dados pessoais
  nome: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  telefone: z.string().min(8, { message: "Telefone inválido" }),
  tipoPessoa: z.enum(["fisica", "juridica"]),

  // Documentos
  cpfCnpj: z.string().min(1, { message: "CPF/CNPJ é obrigatório" }),
  rgInscricao: z.string().optional(),

  // Endereço
  cep: z.string().min(8, { message: "CEP inválido" }),
  endereco: z.string().min(3, { message: "Endereço inválido" }),
  numero: z.string().min(1, { message: "Número é obrigatório" }),
  complemento: z.string().optional(),
  bairro: z.string().min(2, { message: "Bairro inválido" }),
  cidade: z.string().min(2, { message: "Cidade inválida" }),
  estado: z.string().min(2, { message: "Estado inválido" }),

  // Informações adicionais
  observacoes: z.string().optional(),
  profissao: z.string().optional(),
  dataNascimento: z.string().optional(),
  
  // Novos campos
  proximoContato: z.string().optional(),
  lembreteTipo: z.string().optional(),
  lembreteData: z.string().optional(),
  lembreteDescricao: z.string().optional(),
  tags: z.array(z.string()).default([]), 
  notes: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
      date: z.string()
    })
  ).default([]),
  status: z.string().default("Ativo"),
  classificacao: z.string().optional(),
});

// Valores padrão para inicialização do formulário
export const defaultValues: Partial<ClienteFormValues> = {
  nome: "",
  email: "",
  telefone: "",
  tipoPessoa: "fisica",
  cpfCnpj: "",
  rgInscricao: "",
  cep: "",
  endereco: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  estado: "",
  observacoes: "",
  profissao: "",
  dataNascimento: "",
  proximoContato: "",
  lembreteTipo: "",
  lembreteData: "",
  lembreteDescricao: "",
  tags: [],
  notes: [],
  status: "Ativo",
  classificacao: "Regular",
};

// Etapas do formulário
export const formSteps = [
  { id: "personal", label: "Informações Pessoais" },
  { id: "documents", label: "Documentos" },
  { id: "address", label: "Endereço" },
  { id: "files", label: "Arquivos" },
  { id: "review", label: "Revisão" },
];

// Tipo para os valores do formulário
export type ClienteFormValues = z.infer<typeof clienteFormSchema>;
