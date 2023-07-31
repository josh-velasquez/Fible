using System;
using Chef.Models;
using Microsoft.AspNetCore.Mvc;
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
                Recipe[] recipes = JsonConvert.DeserializeObject<Recipe[]>(fileContent) ?? Array.Empty<Recipe>();

                List<Recipe> recipesList = recipes.ToList();
                recipesList.Add(recipe);
                Recipe[] updatedRecipe = recipesList.ToArray();
                string jsonData = JsonConvert.SerializeObject(updatedRecipe, Formatting.Indented);
                File.WriteAllText(filePath, jsonData);
            } catch(IOException ex)
			{
				Console.WriteLine("Failed to write new recipe: " + ex);
			}
		}

		public static string SaveImageToServer(IFormFile file, string imagesPath)
		{
			// TODO: Update the filename to be unique (so date time only to avoid file conflict
			var imageFilePath = Path.Combine(imagesPath, file.FileName);
			using (var stream = new FileStream(imageFilePath, FileMode.Create))
			{
				file.CopyTo(stream);
			}
			return "~/Images/" + file.FileName;
		}

		public static void EditRecipeFromJson(Recipe recipe, string filePath)
		{
			// TODO: edit recipe here
		}
	}
}

