import { MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Container,
  Divider,
  Header,
  Label,
  List,
  ListItemProps,
} from "semantic-ui-react";
import { RecipeInfo, RecipesData } from "../state/actions";

interface FavouritesListProps {
  recipesData: RecipesData;
}

const FavouritesList: React.FC<FavouritesListProps> = ({ recipesData }) => {
  const [favouritesList, setFavouritesList] = useState<RecipeInfo[]>([]);
  let navigate = useNavigate();

  useEffect(() => {
    setFavouritesList(
      recipesData.recipes.filter((recipe: RecipeInfo) => recipe.favourite)
    );
  }, [recipesData, setFavouritesList]);

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

  return (
    <Container textAlign="center">
      <Header textAlign="center">Favourites List</Header>
      <Divider />
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
        {favouritesList.map((recipe: RecipeInfo) => {
          return (
            <List.Item id={recipe.id} onClick={onSelectRecipe} key={recipe.id}>
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
                description={concatDescription(recipe.description)}
                extra={recipe.time}
              />
            </List.Item>
          );
        })}
      </List>
    </Container>
  );
};
export default FavouritesList;
