import { Card, Container, Label, List } from "semantic-ui-react";

interface FavouritesListProps {
  recipes: Object[];
}

const FavouritesList: React.FC<FavouritesListProps> = ({ recipes }) => {
  const onSelectRecipe = () => {
    console.warn("CLICKED");
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
        {recipes.map((recipe: Object) => {
          const recipeJson = JSON.parse(JSON.stringify(recipe));
          if (recipeJson.favourite) {
            return (
              <List.Item key={recipes.indexOf(recipe)}>
                <Card
                  key={recipeJson.id}
                  onClick={onSelectRecipe}
                  image={recipeJson.image}
                  header={recipeJson.name}
                  meta={() => {
                    return recipeJson.tags.map((tag: string) => {
                      return (
                        <Label key={tag} tag color="olive" size="mini">
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
