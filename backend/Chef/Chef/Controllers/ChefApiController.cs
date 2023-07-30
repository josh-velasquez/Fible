using Chef.Models;
using Chef.Util;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.IO;
using System;

namespace Chef.Controllers
{
    [Route("api/chef")]
    [ProducesResponseType(StatusCodes.Status202Accepted)]
    public class ChefApiController : ControllerBase
    {
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<RecipePayload> GetRecipes()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                string recipesFilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "RecipesTest.json");
                string fileContent = System.IO.File.ReadAllText(recipesFilePath);
                if (!string.IsNullOrEmpty(fileContent))
                {
                    Recipe[] recipes = JsonConvert.DeserializeObject<Recipe[]>(fileContent) ?? new Recipe[] { };
                    return new RecipePayload
                    {
                        Id = Guid.NewGuid(),
                        Date = DateTime.Now,
                        Recipes = recipes.ToArray()
                    };
                }
            }
            catch(IOException ex)
            {
                return BadRequest("Error: " + ex);
            }
            catch (Exception ex)
            {
                return BadRequest("Error: " + ex);
            }
            return BadRequest("Error.");
        }

        [HttpPost("create-recipe")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        public ActionResult<Recipe> CreateRecipe([FromForm] FrontEndPayloadRecipe recipe)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {   
                var newRecipe = new Recipe
                {
                    Id = Guid.NewGuid(),
                    Name = recipe.Name,
                    Date = DateTime.Now,
                    Time = recipe.Time,
                    Description = recipe.Description,
                    Instructions = recipe.Instructions,
                    Tags = recipe.Tags,
                    Image = recipe.Image.FileName,
                    Favourite = recipe.Favourite,
                };
                string recipesFilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Recipes.json");
                DataUtil.SaveRecipeToJson(newRecipe, recipesFilePath);
                return newRecipe;
            }
            catch (Exception ex)
            {
                return BadRequest("Error: " + ex);
            }
        }

        [HttpPut("edit-recipe")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<Recipe> EditRecipe(FrontEndPayloadRecipe recipe)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            return BadRequest("Edited");
        }

        [HttpDelete("delete-recipe")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<Recipe> DeleteRecipe(int id)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            return BadRequest("Deleted");
        }
    }
}