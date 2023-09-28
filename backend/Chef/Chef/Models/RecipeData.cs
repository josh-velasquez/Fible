using System;
namespace Chef.Models
{
	public class RecipeData
	{
        public string Name { get; set; }
        public string Time { get; set; }
        public string Description { get; set; }
        public string Instructions { get; set; }
        public string Tags { get; set; }
        public string ImageUrl { get; set; }
        public bool Favourite { get; set; }
    }
}

