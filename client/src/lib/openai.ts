import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Required for client-side usage
});

export type RecipeGenerationResponse = {
  name: string;
  ingredients: string[];
  instructions: string[];
  commentary: string;
};

export async function generateRecipe(ingredients: string[]): Promise<RecipeGenerationResponse> {
  try {
    const prompt = `Create a chaotic recipe using these ingredients: ${ingredients.join(", ")}. 
                   Make it funny, absurd, and totally unhinged but technically possible to make.
                   The recipe should be wild but not dangerous or inedible.
                   Return as JSON with exact format:
                   {
                     "name": "creative and funny name",
                     "ingredients": ["list", "of", "ingredients"],
                     "instructions": ["step 1", "step 2", "etc"],
                     "commentary": "unhinged commentary about the recipe"
                   }`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a chaotic chef who creates absurd but technically edible recipes. Your style is humorous and unhinged, but you never suggest anything dangerous or inedible."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    });

    const recipe = JSON.parse(response.choices[0].message.content!) as RecipeGenerationResponse;

    // Validate the response structure
    if (!recipe.name || !Array.isArray(recipe.ingredients) || !Array.isArray(recipe.instructions) || !recipe.commentary) {
      throw new Error("Invalid recipe format received from OpenAI");
    }

    return recipe;
  } catch (error) {
    console.error("Error generating recipe:", error);
    throw new Error("Failed to generate recipe. Please try again with different ingredients!");
  }
}

export function validateApiKey(): boolean {
  return Boolean(process.env.OPENAI_API_KEY);
}