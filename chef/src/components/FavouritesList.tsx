import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Container,
  Label,
  List,
  ListItemProps,
} from "semantic-ui-react";

interface FavouritesListProps {
  recipes: Object[];
}

const FavouritesList: React.FC<FavouritesListProps> = ({ recipes }) => {
  let navigate = useNavigate();
  const onSelectRecipe = (
    event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
    data: ListItemProps
  ) => {
    navigate(`/recipe/${event.currentTarget.id}`);
  };
  // TODO: set max text length so all cards are the same height
  return (
    <Container textAlign="center">
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
        {recipes &&
          recipes.map((recipe: Object) => {
            const recipeJson = JSON.parse(JSON.stringify(recipe));
            if (recipeJson.favourite) {
              return (
                <List.Item
                  id={recipeJson.id}
                  onClick={onSelectRecipe}
                  key={recipes.indexOf(recipe)}
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
                    description={recipeJson.description}
                    extra={recipeJson.time}
                  />
                </List.Item>
              );
            }
          })}
      </List>
    </Container>
  );
};
export default FavouritesList;
