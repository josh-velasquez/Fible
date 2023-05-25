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

interface RecipeObject {
  recipe: Object;
}

// TODO: make a create store and mapstate to props
const Recipe: React.FC<RecipeObject> = () => {
  const recipe = JSON.parse(JSON.stringify(recipePayload));
  const recipeJson = recipe.data.recipeList[0];

  // TODO: Add timer here? We need to have an alarm set for baking etc...
  // TODO: Update wording for payloads
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
                <Label key={tag} tag color="olive" size="mini">
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
