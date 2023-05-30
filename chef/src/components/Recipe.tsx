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
import React, { ReactNode, useEffect, useState } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { RecipePayload } from "./RecipePayload";

const Recipe: React.FC = () => {
  const [recipe, setRecipe] = useState<RecipePayload>();
  const { getRecipeApi } = useActions();
  const { data, error, loading } = useTypedSelector((state) => state.results);

  // TODO: Add timer here? We need to have an alarm set for baking etc...
  // TODO: Update wording for payloads

  // fetch the id from the nav bar
  const { id } = useParams<string>();

  const getRecipe = () => {
    if (id === undefined) {
      return;
    }
    getRecipeApi(id);

    // if (error) {
    //   console.warn("error");
    // } else if (loading) {
    //   console.warn("loading");
    // } else if (!error && !loading && data) {
    //   var recipe = JSON.parse(JSON.stringify(data)) as RecipePayload;
    //   console.warn("RECIPE THIS: " + JSON.stringify(recipe));
    //   if (recipe !== undefined && recipe.tags !== undefined) {
    //     console.warn("DATAS: " + JSON.stringify(data));
    //     setRecipe(recipe);
    //   }
    // }
  };

  const renderValues = (): ReactNode => {
    return <div>test</div>;
  };

  useEffect(() => {
    // fetch recipe by id
    getRecipe();
  }, []);

  return (
    <Container textAlign="center">
      {!error && !loading && data && (
        <React.Fragment>
          <Header as="h1">{data.name}</Header>
          <Divider />
          <Image centered src={recipe?.image} size="large" />
          <Header as="h4">{recipe?.description}</Header>
          <Grid centered relaxed="very">
            <Grid.Row>
              {recipe?.tags &&
                recipe?.tags.map((tag: string) => {
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
                Prep Time: {recipe?.time}
              </Label>
            </Grid.Row>
            <Grid.Row>
              <Checkbox label="Add to my favourites!" />
            </Grid.Row>
          </Grid>
          <Divider />
          <Segment textAlign="left" inverted>
            <List divided animated ordered inverted>
              {recipe?.instructions.map((instruction: string) => {
                return (
                  <List.Item>
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
