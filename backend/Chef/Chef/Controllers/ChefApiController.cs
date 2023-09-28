﻿using Chef.Models;
using Chef.Util;
using Microsoft.AspNetCore.Mvc;

namespace Chef.Controllers
{
    [Route("api/chef")]
    [ProducesResponseType(StatusCodes.Status202Accepted)]
    public class ChefApiController : ControllerBase
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly string imagesFolder;
        private readonly ChefDatabase _chefDatabase;


        public ChefApiController(IWebHostEnvironment hostingEnvironment, ChefDatabase chefDatabase)
        {
            _hostingEnvironment = hostingEnvironment;
            // create images directory
            imagesFolder = Path.Combine(_hostingEnvironment.WebRootPath, "images");
            if (!Directory.Exists(imagesFolder))
            {
                Directory.CreateDirectory(imagesFolder);
            }
            _chefDatabase = chefDatabase;
        }

        [HttpGet("recipes")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<RecipeData>> GetRecipes()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var recipes = _chefDatabase.GetRecipes();
                return Ok(recipes);

            }
            catch (IOException ex)
            {
                return BadRequest("Error: " + ex);
            }
            catch (Exception ex)
            {
                return BadRequest("Error: " + ex);
            }
        }

        [HttpGet("tags")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<string>> GetTags()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var tags = _chefDatabase.GetTags();
                return Ok(tags);
            }
            catch (Exception ex)
            {
                return BadRequest("Error: " + ex);
            }
        }

        [HttpPost("create-tag")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<string> CreateTag(string tagName)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _chefDatabase.CreateTag(tagName);
            return tagName;
        }

        [HttpPost("create-recipe")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        public ActionResult<RecipeData> CreateRecipe([FromForm] FrontEndPayloadRecipe recipe)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var payloadImageUrl = "";
                if (recipe.Image != null)
                {
                    // TODO: Fix this url (make sure its https)
                    payloadImageUrl = "https://localhost:7091/images/" + DataUtil.SaveImageToServer(imagesFolder, recipe.Image);
                }
                else if (recipe.ImageUrl != null)
                {
                    // TODO: We can let user upload an image link from online (implement this on the FE)
                    payloadImageUrl = recipe.ImageUrl;
                }

                var newRecipe = new RecipeData
                {
                    Name = recipe.Name,
                    Time = recipe.Time,
                    Description = recipe.Description,
                    // TODO: Clean this up into a helper instead
                    Instructions = recipe.Instructions.Replace("\"", "").Replace("[", "").Replace("]", ""),
                    Tags = recipe.Tags.Replace("\"", "").Replace("[", "").Replace("]", ""),
                    ImageUrl = payloadImageUrl,
                    Favourite = recipe.Favourite
                };
                _chefDatabase.CreateRecipe(newRecipe);
                // TODO: create the recipe then get the newly added recipe instead so we can have a valid id
                return newRecipe;
            }
            catch (Exception ex)
            {
                return BadRequest("Error: " + ex);
            }
        }

        [HttpPut("update-recipe/{recipeId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<RecipeData> UpdateRecipe(FrontEndPayloadRecipe recipe)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            try
            {
                var payloadImageUrl = "";
                if (recipe.Image != null)
                {
                    // TODO: Fix this url (make sure its https)
                    payloadImageUrl = "https://localhost:7091/images/" + DataUtil.SaveImageToServer(imagesFolder, recipe.Image);
                }
                else if (recipe.ImageUrl != null)
                {
                    // TODO: We can let user upload an image link from online (implement this on the FE)
                    payloadImageUrl = recipe.ImageUrl;
                }

                var recipeData = new RecipeData
                {
                    Name = recipe.Name,
                    Time = recipe.Time,
                    Description = recipe.Description,
                    Instructions = recipe.Instructions,
                    Tags = recipe.Tags,
                    Favourite = recipe.Favourite,
                    ImageUrl = payloadImageUrl,
                };
                // TODO: Update this id from the params
                _chefDatabase.UpdateRecipe(2, recipeData);
                return recipeData;
            }
            catch (Exception ex)
            {
                return BadRequest("Error: " + ex);
            }
        }


        [HttpDelete("delete-recipe/{recipeId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<string> DeleteRecipe(int recipeId)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            try
            {
                // TODO: Update this to use Params instead
                //Console.WriteLine("ID: " + recipeId);
                _chefDatabase.DeleteRecipe(recipeId);
                return Ok("Deleted recipe id: " + recipeId);
            }
            catch (Exception ex)
            {
                return BadRequest("Error: " + ex);
            }
        }

        [HttpDelete("delete-tag/{tagId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<string> DeleteTag(int tagId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                _chefDatabase.DeleteTag(tagId);
                return Ok("Deleted tag id: " + tagId);
            }
            catch (Exception ex)
            {
                return BadRequest("Error: " + ex);
            }
        }


        //[HttpGet]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //public ActionResult<RecipePayload> GetRecipes()
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    try
        //    {
        //        // TODO: Update this to use local environment folder
        //        string recipesFilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "RecipesTest.json");
        //        string recipesFile = System.IO.File.ReadAllText(recipesFilePath);
        //        // TODO: Fix file path for tags list
        //        string tagsFilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "TagsList.json");
        //        string tagsFile = System.IO.File.ReadAllText(tagsFilePath);
        //        if (!string.IsNullOrEmpty(recipesFile) || !string.IsNullOrEmpty(tagsFilePath))
        //        {
        //            Recipe[] recipes = JsonConvert.DeserializeObject<Recipe[]>(recipesFile) ?? Array.Empty<Recipe>();
        //            string[] tags = JsonConvert.DeserializeObject<string[]>(tagsFile) ?? Array.Empty<string>();
        //            return new RecipePayload
        //            {
        //                Id = Guid.NewGuid(),
        //                Date = DateTime.Now,
        //                Recipes = recipes.ToArray(),
        //                Tags = tags
        //            };
        //        }
        //    }
        //    catch(IOException ex)
        //    {
        //        return BadRequest("Error: " + ex);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest("Error: " + ex);
        //    } 
        //    return BadRequest("Error.");
        //}



        //[HttpPost("create-recipe")]
        //[ProducesResponseType(StatusCodes.Status202Accepted)]
        //public ActionResult<Recipe> CreateRecipe([FromForm] FrontEndPayloadRecipe recipe)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }
        //    try
        //    {
        //        var payloadImageUrl = "";
        //        if (recipe.Image != null)
        //        {
        //            // TODO: Fix this url (make sure its https)
        //            payloadImageUrl = "https://localhost:7091/images/" + DataUtil.SaveImageToServer(imagesFolder, recipe.Image);
        //        }
        //        else if (recipe.ImageUrl != null)
        //        {
        //            // TODO: We can let user upload an image link from online (implement this on the FE)
        //            payloadImageUrl = recipe.ImageUrl;
        //        }

        //        string[] instructions = recipe.Instructions.Split(";");
        //        string[] tags = recipe.Tags.Split(";");
        //        var newRecipe = new Recipe
        //        {
        //            Id = Guid.NewGuid(),
        //            Name = recipe.Name,
        //            Date = DateTime.Now,
        //            Time = recipe.Time,
        //            Description = recipe.Description,
        //            Instructions = instructions,
        //            Tags = tags,
        //            Image = payloadImageUrl,
        //            Favourite = recipe.Favourite,
        //        };
        //        // TODO: Update this folder to user the local environments folder
        //        string recipesFilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "RecipesTest.json");
        //        DataUtil.SaveRecipeToJson(newRecipe, recipesFilePath);
        //        return newRecipe;
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest("Error: " + ex);
        //    }
        //}

        //[HttpPut("update-recipe")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //public ActionResult<Recipe> UpdateRecipe(FrontEndPayloadRecipe recipe)
        //{
        //    if (!ModelState.IsValid) { return BadRequest(ModelState); }
        //    try
        //    {
        //        var payloadImageUrl = "";
        //        if (recipe.Image != null)
        //        {
        //            // TODO: Fix this url (make sure its https)
        //            payloadImageUrl = "https://localhost:7091/images/" + DataUtil.SaveImageToServer(imagesFolder, recipe.Image);
        //        }
        //        else if (recipe.ImageUrl != null)
        //        {
        //            // TODO: We can let user upload an image link from online (implement this on the FE)
        //            payloadImageUrl = recipe.ImageUrl;
        //        }
        //        string[] instructions = recipe.Instructions.Split(";");
        //        string[] tags = recipe.Tags.Split(";");
        //        //Guid.TryParse(recipe.Id, out Guid guidValue);
        //        var updatedRecipe = new Recipe
        //        {
        //            //Id = guidValue,
        //            Name = recipe.Name,
        //            Time = recipe.Time,
        //            Description = recipe.Description,
        //            Instructions = instructions,
        //            Tags = tags,
        //            Favourite = recipe.Favourite,
        //            Image = payloadImageUrl
        //        };
        //        string recipesFilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "RecipesTest.json");
        //        DataUtil.UpdateRecipe(updatedRecipe, recipesFilePath);
        //        return updatedRecipe;
        //    }
        //    catch(Exception ex)
        //    {
        //        return BadRequest("Error: " + ex);
        //    }
        //}

        //[HttpDelete("delete-recipe")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //public ActionResult<Recipe> DeleteRecipe(Guid id)
        //{
        //    if (!ModelState.IsValid) { return BadRequest(ModelState); }

        //    try
        //    {
        //        string recipesFilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "RecipesTest.json");
        //        DataUtil.DeleteRecipe(id, recipesFilePath);
        //        return new Recipe();
        //    }
        //    catch(Exception ex)
        //    {
        //        return BadRequest("Error: " + ex);
        //    }

        //}
    }
}