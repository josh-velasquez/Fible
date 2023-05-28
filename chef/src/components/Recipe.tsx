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
import { useEffect, useState } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";

interface Recipe {
  id: string,
  name: string,
  date: string,
  time: string,
  description: string,
  instructions: string[],
  tags: string[],
  image: string,
  favourite: boolean
}

const Recipe: React.FC = () => {
  // const recipe = JSON.parse(JSON.stringify(recipePayload));
  // const recipeJson = recipe.data.recipeList[0];
  const [recipe, setRecipe] = useState<Recipe>();
  const { getRecipeApi } = useActions();
  const { data, error, loading } = useTypedSelector((state) => state.results);

  // TODO: Add timer here? We need to have an alarm set for baking etc...
  // TODO: Update wording for payloads

  // fetch the id from the nav bar
  const { id } = useParams<string>();
  console.warn(id);

  useEffect(() => {
    // fetch recipe by id
    getRecipeApi(id ?? "");
  }, []);

  useEffect(() => {
    if (error) {
      console.warn("error");
    } else if (loading) {
      console.warn("loading");
    } else if (!error && !loading && data) {
      if (data !== undefined) {
        var recipe = JSON.parse(JSON.stringify(data)) as Recipe;
        console.warn("DATAS: " + JSON.stringify(data))
        setRecipe(recipe);
      }
      
    }
  }, [recipe]);
  // send request to server
  return (
    <Container textAlign="center">
      <Header as="h1">{recipe?.name}</Header>
      <Image centered src={recipe?.image} size="large" />
      <Header as="h4">{recipe?.description}</Header>
      <Grid centered relaxed="very">
        <Grid.Row>
          {recipe?.tags &&
            recipe?.tags.map((tag: string) => {
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
    </Container>
  );
};

export default Recipe;
