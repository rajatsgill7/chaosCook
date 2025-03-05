import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const recipes = pgTable("recipes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  ingredients: text("ingredients").array().notNull(),
  instructions: text("instructions").array().notNull(),
  commentary: text("commentary").notNull(),
  votes: integer("votes").notNull().default(0),
});

export const insertRecipeSchema = createInsertSchema(recipes).omit({ 
  id: true,
  votes: true 
});

export const ingredientsSchema = z.object({
  ingredients: z.array(z.string()).min(1, "At least one ingredient required")
});

export type InsertRecipe = z.infer<typeof insertRecipeSchema>;
export type Recipe = typeof recipes.$inferSelect;
