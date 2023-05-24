using Chef.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

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
                using StreamReader reader = new(@"D:\Repository\Chef\backend\Chef\Chef\SamplePayloads\RecipeList.json");
                var json = reader.ReadToEnd();
                PayloadSample payload = JsonConvert.DeserializeObject<PayloadSample>(json) ?? new PayloadSample();

                return new RecipePayload
                {
                    Id = Guid.NewGuid(),
                    Date = DateTime.Now,
                    Recipes = payload.Recipes.ToArray()
                };
            }
            catch (Exception ex)
            {
                return BadRequest("Error: " + ex);
            }
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
                return new Recipe
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