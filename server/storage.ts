import { type Recipe, type InsertRecipe } from "@shared/schema";

export interface IStorage {
  createRecipe(recipe: InsertRecipe): Promise<Recipe>;
  getRecipes(): Promise<Recipe[]>;
  getRecipe(id: number): Promise<Recipe | undefined>;
  upvoteRecipe(id: number): Promise<Recipe | undefined>;
}

export class MemStorage implements IStorage {
  private recipes: Map<number, Recipe>;
  private currentId: number;

  constructor() {
    this.recipes = new Map();
    this.currentId = 1;
  }

  async createRecipe(insertRecipe: InsertRecipe): Promise<Recipe> {
    const id = this.currentId++;
    const recipe: Recipe = { ...insertRecipe, id, votes: 0 };
    this.recipes.set(id, recipe);
    return recipe;
  }

  async getRecipes(): Promise<Recipe[]> {
    return Array.from(this.recipes.values());
  }

  async getRecipe(id: number): Promise<Recipe | undefined> {
    return this.recipes.get(id);
  }

  async upvoteRecipe(id: number): Promise<Recipe | undefined> {
    const recipe = this.recipes.get(id);
    if (recipe) {
      const updated = { ...recipe, votes: recipe.votes + 1 };
      this.recipes.set(id, updated);
      return updated;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
