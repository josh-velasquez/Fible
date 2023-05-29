interface RecipePayload {
  id: string;
  name: string;
  date: string;
  time: string;
  description: string;
  instructions: string[];
  tags: string[];
  image: string;
  favourite: boolean;
}

export type { RecipePayload };
