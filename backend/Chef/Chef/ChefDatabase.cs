using Chef.Models;
using Microsoft.Data.Sqlite;

namespace Chef
{
    public class ChefDatabase
    {
        private readonly string _connectionString;
        public ChefDatabase(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void CreateTable()
        {

            // Create recipe table
            using (var command = new SqliteCommand())
            {
                command.CommandText = "CREATE TABLE IF NOT EXISTS Recipes (Id INTEGER PRIMARY KEY, Name TEXT, Time TEXT, Description TEXT, Instructions TEXT, Tags TEXT, Image TEXT, Favourite INTEGER)";
                ExecuteDatabaseCommand(command);
            }

            // Create tags table
            using (var command = new SqliteCommand())
            {
                command.CommandText = "CREATE TABLE IF NOT EXISTS Tags (Id INTEGER PRIMARY KEY, Name TEXT)";
                ExecuteDatabaseCommand(command);
            }
        }


        public void CreateTag(string tagName)
        {
            using (var command = new SqliteCommand())
            {
                command.CommandText = "INSERT INTO Tags (Name) VALUES (@Name)";
                command.Parameters.AddWithValue("@Name", tagName);
                ExecuteDatabaseCommand(command);
            }
        }

        public void CreateRecipe(RecipeData recipe)
        {
            using (var command = new SqliteCommand())
            {
                command.CommandText = "INSERT INTO Recipes (Name, Time, Description, Instructions, Tags, Image, Favourite) VALUES (@Name, @Time, @Description, @Instructions, @Tags, @Image, @Favourite)";
                command.Parameters.AddWithValue("@Name", recipe.Name);
                command.Parameters.AddWithValue("@Time", recipe.Time);
                command.Parameters.AddWithValue("@Description", recipe.Description);
                command.Parameters.AddWithValue("@Instructions", recipe.Instructions);
                command.Parameters.AddWithValue("@Tags", recipe.Tags);
                command.Parameters.AddWithValue("@Image", recipe.ImageUrl);
                command.Parameters.AddWithValue("@Favourite", recipe.Favourite);
                ExecuteDatabaseCommand(command);
            }

        }

        public void DeleteRecipe(int recipeId)
        {
            using (var command = new SqliteCommand())
            {
                command.CommandText = @"
                        DELETE FROM Recipes
                        WHERE Id = @RecipeId;";
                command.Parameters.AddWithValue("@RecipeId", recipeId); // Specify the Recipe Id to delete
                ExecuteDatabaseCommand(command);
            }
        }

        public void DeleteTag(int tagId)
        {
            using (var command = new SqliteCommand())
            {
                command.CommandText = @"
                        DELETE FROM Tags
                        WHERE Id = @TagId;";
                command.Parameters.AddWithValue("@TagId", tagId);
                ExecuteDatabaseCommand(command);
            }
        }

        public RecipeData UpdateRecipe(int recipeIdToUpdate, RecipeData newRecipe)
        {
            using (var command = new SqliteCommand())
            {
                command.CommandText = @"
                        UPDATE Recipes
                        SET
                            Name = @NewName,
                            Time = @NewTime,
                            Description = @NewDescription,
                            Instructions = @NewInstructions,
                            Tags = @NewTags,
                            Image = @NewImage,
                            Favourite = @NewFavourite
                        WHERE
                            Id = @RecipeId;";

                command.Parameters.AddWithValue("@NewName", newRecipe.Name);
                command.Parameters.AddWithValue("@NewTime", newRecipe.Time);
                command.Parameters.AddWithValue("@NewDescription", newRecipe.Description);
                command.Parameters.AddWithValue("@NewInstructions", newRecipe.Instructions);
                command.Parameters.AddWithValue("@NewTags", newRecipe.Tags);
                command.Parameters.AddWithValue("@NewImage", newRecipe.ImageUrl);
                command.Parameters.AddWithValue("@NewFavourite", newRecipe.Favourite); // Updated Favourite value
                command.Parameters.AddWithValue("@RecipeId", recipeIdToUpdate); // Specify the Recipe Id to update
                ExecuteDatabaseCommand(command);
                return newRecipe;
            }
        }

        public IEnumerable<string> GetTags()
        {
            var tags = new List<string>();
            using (var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "SELECT Id, Name FROM Tags";

                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var tag = reader.GetString(1);
                            tags.Add(tag);
                        }
                    }
                }
            }

            return tags;
        }


        public IEnumerable<RecipeData> GetRecipes()
        {
            var recipes = new List<RecipeData>();

            using (var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "SELECT Id, Name, Time, Description, Instructions, Tags, Image, Favourite FROM Recipes";

                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var recipe = new RecipeData
                            {
                                Name = reader.GetString(1),
                                Time = reader.GetString(2),
                                Description = reader.GetString(3),
                                Instructions = reader.GetString(4),
                                Tags = reader.GetString(5),
                                ImageUrl = reader.GetString(6),
                                Favourite = reader.GetInt32(7) == 0 ? false : true
                            };
                            recipes.Add(recipe);
                        }
                    }
                }
            }

            return recipes;
        }

        private void ExecuteDatabaseCommand(SqliteCommand sqliteCommand)
        {
            using (var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();
                sqliteCommand.Connection = connection;
                try
                {
                    sqliteCommand.ExecuteNonQuery();
                }
                catch (Exception e)
                {
                    Console.WriteLine("Error running database command: " + e.Data);
                }
            }
        }
    }
}

