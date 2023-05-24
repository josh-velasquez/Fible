namespace Chef.Models
{
    public class FrontEndPayloadRecipe
    {
        public string Name { get; set; }
        public string Time { get; set; }
        public string Description { get; set; }
        public string[] Instructions { get; set; }
        public string[] Tags { get; set; }
        public IFormFile Image { get; set; }
        public bool Favourite { get; set; }
    }
}