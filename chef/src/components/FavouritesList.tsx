import { MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Container,
  Dimmer,
  Divider,
  Header,
  Label,
  List,
  ListItemProps,
  Loader,
  Segment,
} from "semantic-ui-react";
import { RecipePayload } from "./RecipePayload";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { RecipeListPayload } from "./RecipeListPayload";

const FavouritesList: React.FC = () => {
  const [favouriteRecipes, setFavouriteRecipes] = useState<RecipePayload[]>();
  const { data, error, loading } = useTypedSelector((state) => state.results);
  const { getFavouriteRecipes } = useActions();
  let navigate = useNavigate();
  const onSelectRecipe = (
    event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
    _: ListItemProps
  ) => {
    navigate(`/recipe/${event.currentTarget.id}`);
  };

  const getFavouritesRecipesList = () => {
    getFavouriteRecipes();
    if (error) {
      console.warn("error");
    } else if (loading) {
      console.warn("loading");
    } else if (!error && !loading && data) {
      if (data !== undefined) {
        const recipesPayload = JSON.parse(
          JSON.stringify(data)
        ) as RecipeListPayload;
        const recipes = recipesPayload.recipes;
        setFavouriteRecipes(recipes);
      }
    }
  };

  useEffect(() => {
    getFavouritesRecipesList();
  }, []);

  // TODO: set max text length so all cards are the same height
  return (
    <Container textAlign="center">
      <Header textAlign="center">Favourites List</Header>
      <Divider />
      {loading && (
        <Segment style={{ padding: 50 }}>
          <Dimmer active inverted>
            <Loader>Fetching favourite recipes...</Loader>
          </Dimmer>
        </Segment>
      )}
      {!error && !loading && favouriteRecipes && (
        <List
          horizontal
          size="big"
          style={{
            maxHeight: 600,
            backgroundColor: "#e9edc9",
            overflowY: "scroll",
            paddingTop: 30,
          }}
        >
          {favouriteRecipes.map((recipe: RecipePayload) => {
            if (recipe.favourite) {
              return (
                <List.Item
                  id={recipe.id}
                  onClick={onSelectRecipe}
                  key={favouriteRecipes.indexOf(recipe)}
                >
                  <Card
                    key={recipe.id}
                    image={recipe.image}
                    header={recipe.name}
                    meta={() => {
                      return recipe.tags.map((tag: string) => {
                        return (
                          <Label key={tag} color="olive" size="mini">
                            {tag}
                          </Label>
                        );
                      });
                    }}
                    description={recipe.description}
                    extra={recipe.time}
                  />
                </List.Item>
              );
            }
          })}
        </List>
      )}
    </Container>
  );
};
export default FavouritesList;
