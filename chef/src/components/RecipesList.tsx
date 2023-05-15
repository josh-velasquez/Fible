import { Card, Container, List } from "semantic-ui-react";
// import recipes from "../sampleRecipes.json";

interface RecipeListProps {
  recipes: Object[];
}

const RecipesList: React.FC<RecipeListProps> = ({ recipes }) => {
  return (
    <Container textAlign="center">
      <List
        horizontal
        size="big"
        style={{
          maxHeight: 600,
          backgroundColor: "#E5DADA",
          overflowY: "scroll",
          paddingTop: 30,
        }}
      >
        {recipes.map((recipe: Object) => {
          const recipeJson = JSON.parse(JSON.stringify(recipe));
          return (
            <List.Item>
              <Card
                image={recipeJson.image}
                header={recipeJson.name}
                meta={recipeJson.tags.join(", ")}
                description={recipeJson.description}
                extra={recipeJson.time}
              />
            </List.Item>
          );
        })}
      </List>
    </Container>
  );
};
export default RecipesList;
