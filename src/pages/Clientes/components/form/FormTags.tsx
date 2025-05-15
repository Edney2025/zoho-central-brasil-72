
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Tag, Plus } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FormTagsProps {
  defaultTags?: string[];
}

const FormTags: React.FC<FormTagsProps> = ({ defaultTags = [] }) => {
  const { setValue, watch } = useFormContext();
  const [newTag, setNewTag] = useState("");
  const tags = watch("tags") || defaultTags;

  const handleAddTag = () => {
    if (!newTag.trim()) return;

    // Prevenir duplicatas
    if (tags.includes(newTag.trim())) {
      setNewTag("");
      return;
    }

    setValue("tags", [...tags, newTag.trim()], { shouldValidate: true, shouldDirty: true });
    setNewTag("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setValue(
      "tags",
      tags.filter((tag: string) => tag !== tagToRemove),
      { shouldValidate: true, shouldDirty: true }
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Tag className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Adicionar etiqueta..."
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={handleKeyPress}
            className="pl-8"
          />
        </div>
        <Button
          type="button"
          size="sm"
          onClick={handleAddTag}
          disabled={!newTag.trim()}
        >
          <Plus className="h-4 w-4 mr-1" />
          Adicionar
        </Button>
      </div>

      <ScrollArea className="h-auto max-h-28">
        <div className="flex flex-wrap gap-1.5">
          {tags.length > 0 ? (
            tags.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="px-2 py-1 gap-1">
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))
          ) : (
            <p className="text-sm text-muted-foreground italic">
              Nenhuma etiqueta adicionada
            </p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FormTags;
