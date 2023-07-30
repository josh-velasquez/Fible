using System;
using Chef.Models;
using Newtonsoft.Json;

namespace Chef.Util
{
	public static class DataUtil
	{
		public static void SaveRecipeToJson(Recipe recipe, string filePath)
		{
			try
			{
                string recipesFilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "RecipesTest.json");
                string fileContent = System.IO.File.ReadAllText(recipesFilePath);
                Recipe[] recipes = JsonConvert.DeserializeObject<Recipe[]>(fileContent) ?? new Recipe[] { };

                List<Recipe> recipesList = recipes.ToList();
                recipesList.Add(recipe);
                Recipe[] updatedRecipe = recipesList.ToArray();
                string jsonData = JsonConvert.SerializeObject(updatedRecipe, Formatting.Indented);
				Console.WriteLine("DATA: " + jsonData);
				// TODO: Writing to the storage is not working
                File.WriteAllText(filePath, jsonData);
            } catch(IOException ex)
			{
				Console.WriteLine("Failed to write new recipe.");
			}
            
		}

		public static void EditRecipeFromJson(Recipe recipe, string filePath)
		{
			// TODO: edit recipe here
		}
	}
}

