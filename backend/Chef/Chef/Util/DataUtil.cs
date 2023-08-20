using System;
using Chef.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using static System.Net.Mime.MediaTypeNames;

namespace Chef.Util
{
	public static class DataUtil
	{
		public static void SaveRecipeToJson(Recipe recipe, string filePath)
		{
			try
			{
                //string recipesFilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "RecipesTest.json");
                string fileContent = System.IO.File.ReadAllText(filePath);
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

		public static void UpdateRecipe(Recipe recipe, string filePath)
		{
			try
            {
                string fileContent = System.IO.File.ReadAllText(filePath);
                Recipe[] recipes = JsonConvert.DeserializeObject<Recipe[]>(fileContent) ?? Array.Empty<Recipe>();
                List<Recipe> recipesList = recipes.ToList();

                int recipeIndex = recipesList.FindIndex(r => r.Id == recipe.Id);
				if (recipeIndex != -1)
				{
					recipesList[recipeIndex] = recipe;
				}
				Recipe[] updatedRecipe = recipesList.ToArray();
				string jsonData = JsonConvert.SerializeObject(updatedRecipe, Formatting.Indented);
				File.WriteAllText(filePath, jsonData);

            } catch(IOException ex)
			{
				Console.WriteLine("Failed to update new recipe: " + ex);
			}
		}

		public static string SaveImageToServer(string imagesPath, IFormFile file)
		{
            string uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            string filePath = Path.Combine(imagesPath, uniqueFileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
			{
				file.CopyTo(stream);
			}
			return uniqueFileName;
		}

		public static void EditRecipeFromJson(Recipe recipe, string filePath)
		{
			// TODO: edit recipe here
		}
	}
}

