import {
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
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { RecipePayload } from "./RecipePayload";
import { getRecipeListApi } from "../state/action-creators";

const Recipe: React.FC = (): JSX.Element => {
  const [recipe, setRecipe] = useState<RecipePayload>();
  const { data } = useTypedSelector((state) => state.results);

  // TODO: Add timer here? We need to have an alarm set for baking etc...
  // TODO: Update wording for payloads

  // fetch the id from the nav bar
  const { id } = useParams<string>();

  useEffect(() => {
    if (data.length === 0) {
      console.warn("FAIL")
      getRecipeListApi()
    }
    console.warn("HERE: " + JSON.stringify(data))
    const recipes = JSON.parse(JSON.stringify(data)) as RecipePayload[];
    setRecipe(recipes.find((recipe: RecipePayload) => recipe.id === id));
  }, [id, data, getRecipeListApi]);

  return (
    <Container style={{ paddingTop: "30px" }} textAlign="center">
      {recipe && (
        <React.Fragment>
          <Header as="h1">{recipe.name}</Header>
          <Divider />
          <Image centered src={recipe.image} size="large" />
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
              <Checkbox label="Add to my favourites!" />
            </Grid.Row>
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
