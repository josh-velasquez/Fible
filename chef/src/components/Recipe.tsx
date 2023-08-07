import {
  Button,
  Checkbox,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Label,
  List,
  Segment,
} from "semantic-ui-react";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { RecipeInfo } from "../state/actions";

const Recipe: React.FC = (): JSX.Element => {
  const [recipe, setRecipe] = useState<RecipeInfo>();
  const { recipesData } = useTypedSelector((state) => state.results);
  let navigate = useNavigate();

  // TODO: Add timer here? We need to have an alarm set for baking etc...
  // TODO: Update wording for payloads

  const { id } = useParams<string>();

  const editRecipe = () => {
    if (recipe) {
      navigate(`/editRecipe/${recipe.id}`);
    }
  };

  const deleteRecipe = () => {
    console.warn("DELETE");
  };

  useEffect(() => {
    if (recipesData) {
      const recipe = recipesData.recipes.find(
        (recipe: RecipeInfo) => recipe.id === id
      );
      setRecipe(recipe);
    }
  }, [id, recipesData]);

  return (
    <Container style={{ paddingTop: "30px" }} textAlign="center">
      {recipe && (
        <React.Fragment>
          <Header as="h1">{recipe.name}</Header>
          <Divider />
          <Image centered src={recipe.image} size="large" alt="Recipe Image" />
          <Header as="h4">{recipe.description}</Header>
          <Grid centered relaxed="very">
            <Grid.Row>
              {recipe.tags &&
                recipe.tags.map((tag: string) => {
                  return (
                    <Label
                      key={recipe.tags.indexOf(tag)}
                      color="olive"
                      size="mini"
                    >
                      {tag}
                    </Label>
                  );
                })}
            </Grid.Row>
            <Grid.Row>
              <Label>
                <Icon name="time" />
                Prep Time: {recipe.time}
              </Label>
            </Grid.Row>
            <Grid.Row>
              <Button size="large" color="red" icon onClick={editRecipe}>
                <Icon name="edit" />
              </Button>
              <Button size="large" color="red" icon onClick={deleteRecipe}>
                {/* TODO: add a pop up modal that asks if they want to delete the recipe */}
                <Icon name="delete" />
              </Button>
            </Grid.Row>
            {recipe.favourite && (
              <Grid.Row>
                <Icon name="heart" />
              </Grid.Row>
            )}
          </Grid>
          <Divider />
          <Segment textAlign="left" inverted>
            <List divided animated ordered inverted>
              {recipe.instructions.map((instruction: string, index: number) => {
                return (
                  <List.Item key={index}>
                    <List.Content>{instruction}</List.Content>
                    <List.Content floated="right">
                      <Checkbox />
                    </List.Content>
                  </List.Item>
                );
              })}
            </List>
          </Segment>
        </React.Fragment>
      )}
    </Container>
  );
};

export default Recipe;
