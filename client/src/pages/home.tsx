import { motion } from "framer-motion";
import { IngredientForm } from "@/components/ingredient-form";
import { RecipeGallery } from "@/components/recipe-gallery";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-8"
      >
        <header className="text-center mb-12">
          <motion.h1 
            className="text-5xl font-bold mb-4 text-primary animate-glitch"
            whileHover={{ scale: 1.05 }}
          >
            ChaosCook
          </motion.h1>
          <p className="text-xl text-muted-foreground">
            Turn your random ingredients into culinary chaos!
          </p>
        </header>

        <div className="max-w-2xl mx-auto mb-12">
          <IngredientForm />
        </div>

        <RecipeGallery />
      </motion.div>
    </div>
  );
}
