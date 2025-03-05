import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, Share2 } from "lucide-react";
import { type Recipe } from "@shared/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const upvote = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", `/api/recipes/${recipe.id}/upvote`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/recipes"] });
    }
  });

  const shareRecipe = async () => {
    try {
      await navigator.share({
        title: recipe.name,
        text: `Check out this chaotic recipe: ${recipe.name}`,
        url: window.location.href
      });
    } catch {
      toast({ 
        title: "Copied to clipboard!", 
        description: "Share this chaotic creation with your friends!" 
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            {recipe.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Ingredients:</h3>
            <ul className="list-disc list-inside">
              {recipe.ingredients.map((ingredient, i) => (
                <li key={i}>{ingredient}</li>
              ))}
            </ul>
          </div>
          
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Instructions:</h3>
            <ol className="list-decimal list-inside">
              {recipe.instructions.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold mb-2">Commentary:</h3>
            <p className="italic text-muted-foreground">{recipe.commentary}</p>
          </div>

          <div className="mt-auto flex justify-between items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => upvote.mutate()}
              disabled={upvote.isPending}
            >
              <ThumbsUp className="h-4 w-4 mr-2" />
              {recipe.votes} votes
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={shareRecipe}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
