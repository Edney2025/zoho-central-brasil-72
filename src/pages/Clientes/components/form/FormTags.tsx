
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ClienteFormValues } from "./schema";

interface FormTagsProps {
  form: UseFormReturn<ClienteFormValues>;
}

const FormTags: React.FC<FormTagsProps> = ({ form }) => {
  const [newTag, setNewTag] = useState("");
  const tags = form.watch("tags") || [];

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      const updatedTags = [...tags, newTag.trim()];
      form.setValue("tags", updatedTags, { shouldValidate: true });
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    form.setValue("tags", updatedTags, { shouldValidate: true });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium">Etiquetas</label>
        <p className="text-xs text-muted-foreground">
          Adicione etiquetas para categorizar o cliente
        </p>
        <div className="flex gap-2">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Nova etiqueta"
            className="flex-1"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addTag();
              }
            }}
          />
          <Button 
            type="button" 
            onClick={addTag} 
            size="sm" 
            variant="secondary"
            disabled={!newTag.trim()}
          >
            <Plus className="h-4 w-4 mr-1" /> Adicionar
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhuma etiqueta adicionada</p>
        ) : (
          tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="px-2 py-1 text-xs gap-1">
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1 hover:text-destructive focus:outline-none"
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remover</span>
              </button>
            </Badge>
          ))
        )}
      </div>
    </div>
  );
};

export default FormTags;
