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

const FavouritesList: React.FC = () => {
  const { data, error, loading } = useTypedSelector((state) => state.results);
  const { getFavouriteRecipes } = useActions();
  let navigate = useNavigate();

  const concatDescription = (description: string): string => {
    // only show up to 28 characters in the description
    if (description.length <= 28) {
      return description;
    }
    return description.slice(0, 25) + "...";
  };

  const onSelectRecipe = (
    event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
    _: ListItemProps
  ) => {
    navigate(`/recipe/${event.currentTarget.id}`);
  };

  useEffect(() => {
    getFavouriteRecipes();
  }, []);

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
      {!error && !loading && data && (
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
          {data.map((recipe: Object) => {
            const recipeJson = JSON.parse(
              JSON.stringify(recipe)
            ) as RecipePayload;
            if (recipeJson.favourite) {
              return (
                <List.Item
                  id={recipeJson.id}
                  onClick={onSelectRecipe}
                  key={recipeJson.id}
                >
                  <Card
                    key={recipeJson.id}
                    image={recipeJson.image}
                    header={recipeJson.name}
                    meta={() => {
                      return recipeJson.tags.map((tag: string) => {
                        return (
                          <Label key={tag} color="olive" size="mini">
                            {tag}
                          </Label>
                        );
                      });
                    }}
                    description={concatDescription(recipeJson.description)}
                    extra={recipeJson.time}
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
