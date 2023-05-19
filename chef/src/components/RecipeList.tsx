import React from "react";
import { Container, Divider, Header, Image, List } from "semantic-ui-react";

interface RecipeListProps {
  recipes: Object[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  // TODO: handle paging for numerous pages
  return (
    <Container style={{ padding: 50 }}>
      <Header>Recipes List</Header>
      <Divider />
      <List>
        {recipes.map((recipe: Object) => {
          const recipeJson = JSON.parse(JSON.stringify(recipe));
          return (
            <List.Item key={recipes.indexOf(recipe)}>
              <Image avatar src={recipeJson.image} />
              <List.Content>
                <List.Header as="a">{recipeJson.name}</List.Header>
                <List.Description>{recipeJson.description}</List.Description>
              </List.Content>
              <Divider />
            </List.Item>
          );
        })}
      </List>
    </Container>
  );
};

export default RecipeList;
