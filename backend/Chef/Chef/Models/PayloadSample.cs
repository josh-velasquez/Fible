namespace Chef.Models
{
    public class PayloadSample
    {
        public List<Recipe> Recipes { get; set; }
        public List<string> TagsList { get; set; }
        public DateTime Date { get; set; }
        public Guid Id { get; set; }
    }
}