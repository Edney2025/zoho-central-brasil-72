
import { z } from "zod";

// Define schema for validating the form
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
  cep: z.string().min(8, { message: "CEP inválido" }).optional().or(z.literal("")),
  endereco: z.string().min(3, { message: "Endereço inválido" }).optional().or(z.literal("")),
  numero: z.string().min(1, { message: "Número é obrigatório" }).optional().or(z.literal("")),
  complemento: z.string().optional(),
  bairro: z.string().min(2, { message: "Bairro inválido" }).optional().or(z.literal("")),
  cidade: z.string().min(2, { message: "Cidade inválida" }).optional().or(z.literal("")),
  estado: z.string().min(2, { message: "Estado inválido" }).optional().or(z.literal("")),

  // Informações adicionais
  observacoes: z.string().optional(),
  profissao: z.string().optional(),
  dataNascimento: z.string().optional(),
  
  // Novos campos
  proximoContato: z.string().optional(),
  lembreteTipo: z.string().optional(),
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

// Default values for form initialization
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
  lembreteDescricao: "",
  tags: [],
  notes: [],
  status: "Ativo",
  classificacao: "Regular",
};

// Form steps
export const formSteps = [
  "Informações Pessoais",
  "Documentos",
  "Endereço",
  "Arquivos",
  "Revisão",
];

// Type for form values
export type ClienteFormValues = z.infer<typeof clienteFormSchema>;
