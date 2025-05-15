
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormAdditionalInfo from "./FormAdditionalInfo";
import FormTags from "./FormTags";
import FormNotes from "./FormNotes";
import FormReminders from "./FormReminders";
import { UseFormReturn } from "react-hook-form";
import { ClienteFormValues } from './schema';

interface FormPersonalTabsProps {
  form: UseFormReturn<ClienteFormValues>;
  activeTab: string;
  onTabChange: (value: string) => void;
}

const FormPersonalTabs: React.FC<FormPersonalTabsProps> = ({
  form,
  activeTab,
  onTabChange
}) => {
  return (
    <div className="mt-6 border-t pt-4">
      <h3 className="text-lg font-medium mb-4">Informações Adicionais</h3>
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="info">Informações</TabsTrigger>
          <TabsTrigger value="tags">Etiquetas</TabsTrigger>
          <TabsTrigger value="notes">Notas</TabsTrigger>
          <TabsTrigger value="reminders">Lembretes</TabsTrigger>
        </TabsList>
        <TabsContent value="info" className="pt-2">
          <FormAdditionalInfo form={form} />
        </TabsContent>
        <TabsContent value="tags" className="pt-2">
          <FormTags form={form} />
        </TabsContent>
        <TabsContent value="notes" className="pt-2">
          <FormNotes form={form} />
        </TabsContent>
        <TabsContent value="reminders" className="pt-2">
          <FormReminders form={form} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormPersonalTabs;
