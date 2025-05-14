
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";

const documentsSchema = z.object({
  cpfCnpj: z.string().min(11, "CPF/CNPJ inválido"),
  rgInscricao: z.string().optional(),
});

export type DocumentsFormValues = z.infer<typeof documentsSchema>;

interface FormDocumentsProps {
  form: UseFormReturn<any>;
  tipoPessoa: 'fisica' | 'juridica';
}

const FormDocuments: React.FC<FormDocumentsProps> = ({ form, tipoPessoa }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Documentos</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="cpfCnpj"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{tipoPessoa === 'fisica' ? 'CPF' : 'CNPJ'}</FormLabel>
              <FormControl>
                <Input placeholder={tipoPessoa === 'fisica' ? '000.000.000-00' : '00.000.000/0000-00'} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="rgInscricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{tipoPessoa === 'fisica' ? 'RG' : 'Inscrição Estadual'}</FormLabel>
              <FormControl>
                <Input placeholder={tipoPessoa === 'fisica' ? '00.000.000-0' : 'Inscrição Estadual'} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default FormDocuments;
