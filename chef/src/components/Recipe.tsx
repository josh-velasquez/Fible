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
import recipePayload from "../samplePayload.json";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getRecipeApi } from "../state/action-creators";
import { useTypedSelector } from "../hooks/useTypedSelector";

const Recipe: React.FC = () => {
  const recipe = JSON.parse(JSON.stringify(recipePayload));
  const recipeJson = recipe.data.recipeList[0];
  const { data, error, loading } = useTypedSelector((state) => state.results);

  // TODO: Add timer here? We need to have an alarm set for baking etc...
  // TODO: Update wording for payloads

  // fetch the id from the nav bar
  const { id } = useParams<string>();
  console.warn(id);

  useEffect(() => {
    // fetch recipe by id
    getRecipeApi(id ?? "");
    if (error) {
      console.warn("error")
    } else if (loading) {
      console.warn("loading")
    } else if (!error && !loading && data) {
      console.warn("data")
    }
  }, []);
  // send request to server
  return (
    <Container textAlign="center">
      <Header as="h1">{recipeJson.name}</Header>
      <Image centered src={recipeJson.image} size="large" />
      <Header as="h4">{recipeJson.description}</Header>
      <Grid centered relaxed="very">
        <Grid.Row>
          {recipeJson.tags &&
            recipeJson.tags.map((tag: string) => {
              return (
                <Label key={tag} color="olive" size="mini">
                  {tag}
                </Label>
              );
            })}
        </Grid.Row>
        <Grid.Row>
          <Label>
            <Icon name="time" />
            Prep Time: {recipeJson.time}
          </Label>
        </Grid.Row>
        <Grid.Row>
          <Checkbox label="Add to my favourites!" />
        </Grid.Row>
      </Grid>
      <Divider />
      <Segment textAlign="left" inverted>
        <List divided animated ordered inverted>
          {recipeJson.recipe.map((instruction: string) => {
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
    </Container>
  );
};

export default Recipe;
