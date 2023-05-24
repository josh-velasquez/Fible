namespace Chef.Models
{
    public class Recipe
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public string Time { get; set; }
        public string Description { get; set; }
        public string[] Instructions { get; set; }
        public string[] Tags { get; set; }
        public string Image { get; set; }
        public bool Favourite { get; set; }
    }
}