
import { z } from "zod";

export const clienteFormSchema = z.object({
  // Personal Info
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  telefone: z.string().min(10, "Telefone inválido"),
  tipoPessoa: z.enum(["fisica", "juridica"]),
  
  // Documents
  cpfCnpj: z.string().min(11, "CPF/CNPJ inválido"),
  rgInscricao: z.string().optional(),
  
  // Address
  cep: z.string().min(8, "CEP inválido"),
  endereco: z.string().min(3, "Endereço inválido"),
  numero: z.string().min(1, "Número é obrigatório"),
  complemento: z.string().optional(),
  bairro: z.string().min(2, "Bairro inválido"),
  cidade: z.string().min(2, "Cidade inválida"),
  estado: z.string().min(2, "Estado inválido"),
  
  // Additional Info
  observacoes: z.string().optional(),
  profissao: z.string().optional(),
  dataNascimento: z.string().optional(),
});

export type ClienteFormValues = z.infer<typeof clienteFormSchema>;

export const defaultValues: ClienteFormValues = {
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
};

export const formSteps = [
  "Informações Pessoais",
  "Documentos",
  "Endereço",
  "Arquivos",
  "Confirmação"
];
