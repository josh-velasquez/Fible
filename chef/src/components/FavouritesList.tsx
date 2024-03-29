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
  Segment,
} from "semantic-ui-react";
import { RecipeInfo } from "../state/actions";

interface FavouritesListProps {
  recipesData: RecipeInfo[];
}

const FavouritesList: React.FC<FavouritesListProps> = ({ recipesData }) => {
  const MAX_TAGS_TO_DISPLAY = 3;
  const MAX_CHAR_DESCRIPTION_TO_DISPLAY = 28;
  const [favouritesList, setFavouritesList] = useState<RecipeInfo[]>([]);
  let navigate = useNavigate();

  useEffect(() => {
    setFavouritesList(
      recipesData.filter((recipe: RecipeInfo) => recipe.favourite)
    );
  }, [recipesData, setFavouritesList]);

  const concatDescription = (description: string): string => {
    // only show up to 28 characters in the description
    if (description.length <= MAX_CHAR_DESCRIPTION_TO_DISPLAY) {
      return description;
    }
    return description.slice(0, MAX_CHAR_DESCRIPTION_TO_DISPLAY - 3) + "...";
  };

  const onSelectRecipe = (
    event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
    _: ListItemProps
  ) => {
    navigate(`/recipe/${event.currentTarget.id}`);
  };

  return (
    <Container textAlign="center" style={{ width: "1000px" }}>
      <Header textAlign="center">Favourites List</Header>
      <Divider />
      <List
        horizontal
        size="big"
        style={{
          maxHeight: 700,
          backgroundColor: "#e9edc9",
          overflowY: "scroll",
          paddingTop: 20,
          padding: 10,
        }}
      >
        {favouritesList.length > 0 ? (
          favouritesList.map((recipe: RecipeInfo) => {
            return (
              <List.Item
                id={recipe.id}
                onClick={onSelectRecipe}
                key={recipe.id}
              >
                <Card style={{ minHeight: "450px" }}>
                  <Image
                    src={recipe.image}
                    style={{ height: "250px", objectFit: "cover" }}
                    alt={recipe.name}
                  />
                  <Card.Content style={{ maxHeight: "200px" }}>
                    <Card.Header>{recipe.name}</Card.Header>
                    <Card.Meta>
                      <Container
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        {recipe.tags
                          .slice(0, MAX_TAGS_TO_DISPLAY)
                          .map((tag, index) => (
                            <div key={index}>
                              <Label key={tag} color="olive" size="mini">
                                {tag}
                              </Label>
                              {index === MAX_TAGS_TO_DISPLAY - 1 &&
                                recipe.tags.length > MAX_TAGS_TO_DISPLAY && (
                                  <span>...</span>
                                )}
                            </div>
                          ))}
                      </Container>
                    </Card.Meta>
                    <Card.Description>
                      {concatDescription(recipe.description)}
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>{recipe.time}</Card.Content>
                </Card>
              </List.Item>
            );
          })
        ) : (
          <Segment piled>
            No favourite recipes available. Like some recipes first!
          </Segment>
        )}
      </List>
    </Container>
  );
};
export default FavouritesList;
