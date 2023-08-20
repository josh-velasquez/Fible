import { MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Container,
  Divider,
  Header,
  Image,
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
          paddingTop: 20,
          padding: 20,
        }}
      >
        {favouritesList.map((recipe: RecipeInfo) => {
          return (
            <List.Item id={recipe.id} onClick={onSelectRecipe} key={recipe.id}>
              <Card>
                <Image
                  src={recipe.image}
                  style={{ height: "250px", objectFit: "cover" }}
                  alt={recipe.name}
                />
                <Card.Content>
                  <Card.Header>{recipe.name}</Card.Header>
                  <Card.Meta>
                    {recipe.tags.map((tag) => (
                      <Label key={tag} color="olive" size="mini">
                        {tag}
                      </Label>
                    ))}
                  </Card.Meta>
                  <Card.Description>
                    {concatDescription(recipe.description)}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>{recipe.time}</Card.Content>
              </Card>
            </List.Item>
          );
        })}
      </List>
    </Container>
  );
};
export default FavouritesList;
