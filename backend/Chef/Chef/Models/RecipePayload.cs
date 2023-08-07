namespace Chef.Models
{
    public class RecipePayload
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public Recipe[] Recipes { get; set; }
        public string[] Tags { get; set; }
    }
}