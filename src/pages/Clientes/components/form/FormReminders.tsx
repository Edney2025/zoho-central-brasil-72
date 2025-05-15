
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { UseFormReturn } from "react-hook-form";
import { ClienteFormValues } from "./schema";

interface FormRemindersProps {
  form: UseFormReturn<ClienteFormValues>;
}

const FormReminders: React.FC<FormRemindersProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h4 className="text-sm font-medium">Próximo Contato</h4>
        <p className="text-xs text-muted-foreground">
          Agende o próximo contato com este cliente
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="proximoContato"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data do Próximo Contato</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP", { locale: ptBR })
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => field.onChange(date?.toISOString() ?? "")}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lembreteTipo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Contato</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de contato" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ligacao">Ligação Telefônica</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="reuniao">Reunião Presencial</SelectItem>
                  <SelectItem value="videoconferencia">Videoconferência</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-1 md:col-span-2">
          <FormField
            control={form.control}
            name="lembreteDescricao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Descrição ou objetivo do próximo contato" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default FormReminders;
