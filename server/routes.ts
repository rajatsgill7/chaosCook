import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import OpenAI from "openai";
import { ingredientsSchema } from "@shared/schema";
import { z } from "zod";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set");
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024
async function generateRecipe(ingredients: string[]) {
  const prompt = `Create a chaotic recipe using these ingredients: ${ingredients.join(", ")}. 
                 Make it funny and unhinged. Return as JSON with format:
                 { "name": string, "ingredients": string[], "instructions": string[], "commentary": string }`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" }
  });

  const content = response.choices[0].message.content;
  if (!content) {
    throw new Error("No content received from OpenAI");
  }

  return JSON.parse(content);
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/recipes/generate", async (req, res) => {
    try {
      const { ingredients } = ingredientsSchema.parse(req.body);
      const recipe = await generateRecipe(ingredients);
      const savedRecipe = await storage.createRecipe(recipe);
      res.json(savedRecipe);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        console.error("Recipe generation error:", error);
        res.status(500).json({ message: "Failed to generate recipe" });
      }
    }
  });

  app.get("/api/recipes", async (_req, res) => {
    const recipes = await storage.getRecipes();
    res.json(recipes);
  });

  app.post("/api/recipes/:id/upvote", async (req, res) => {
    const id = parseInt(req.params.id);
    const recipe = await storage.upvoteRecipe(id);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  });

  return createServer(app);
}