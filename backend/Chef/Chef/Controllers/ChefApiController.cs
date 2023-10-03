using Chef.Models;
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
                    Instructions = StringUtil.CleanStringArray(recipe.Instructions),
                    Tags = StringUtil.CleanStringArray(recipe.Tags),
                    ImageUrl = payloadImageUrl,
                    Favourite = recipe.Favourite
                };
                var latestCreatedRecipeId = _chefDatabase.CreateRecipe(newRecipe);
                newRecipe.Id = latestCreatedRecipeId.ToString();
                return newRecipe;
            }
            catch (Exception ex)
            {
                return BadRequest("Error: " + ex);
            }
        }

        [HttpPut("update-recipe/{recipeId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<RecipeData> UpdateRecipe(int recipeId, FrontEndPayloadRecipe recipe)
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
                _chefDatabase.UpdateRecipe(recipeId, recipeData);
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
    }
}