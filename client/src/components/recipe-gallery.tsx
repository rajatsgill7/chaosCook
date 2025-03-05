import { useQuery } from "@tanstack/react-query";
import { Recipe } from "@shared/schema";
import { RecipeCard } from "./recipe-card";
import { Skeleton } from "@/components/ui/skeleton";

export function RecipeGallery() {
  const { data: recipes, isLoading } = useQuery<Recipe[]>({
    queryKey: ["/api/recipes"]
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[400px]" />
        ))}
      </div>
    );
  }

  if (!recipes?.length) {
    return (
      <div className="text-center text-muted-foreground">
        No recipes yet! Add some ingredients to get started.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
