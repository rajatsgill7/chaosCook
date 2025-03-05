import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ingredientsSchema } from "@shared/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

type FormData = {
  ingredients: string[];
};

export function IngredientForm() {
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<FormData>({
    resolver: zodResolver(ingredientsSchema),
    defaultValues: { ingredients: [""] }
  });

  const generateRecipe = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await apiRequest("POST", "/api/recipes/generate", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/recipes"] });
      toast({ title: "Recipe generated!", description: "Check out your chaotic creation below!" });
    },
    onError: () => {
      toast({ 
        title: "Error", 
        description: "Failed to generate recipe. Try different ingredients!", 
        variant: "destructive" 
      });
    }
  });

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const removeIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const onSubmit = (data: FormData) => {
    generateRecipe.mutate(data);
  };

  return (
    <motion.form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {ingredients.map((_, index) => (
        <motion.div
          key={index}
          className="flex gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Input
            placeholder="Enter an ingredient"
            {...form.register(`ingredients.${index}`)}
            className="flex-1"
          />
          {ingredients.length > 1 && (
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => removeIngredient(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </motion.div>
      ))}

      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={addIngredient}
          className="flex gap-2"
        >
          <Plus className="h-4 w-4" /> Add Ingredient
        </Button>
        <Button 
          type="submit" 
          className="flex-1"
          disabled={generateRecipe.isPending}
        >
          {generateRecipe.isPending ? "Generating..." : "Generate Chaos!"}
        </Button>
      </div>
    </motion.form>
  );
}
