import { RecipePayload } from "./RecipePayload";

interface RecipeListPayload {
  id: string;
  date: string;
  recipes: RecipePayload[];
}
export type { RecipeListPayload };
