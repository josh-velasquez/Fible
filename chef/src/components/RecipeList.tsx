import React, { MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Divider,
  Header,
  Image,
  List,
  ListItemProps,
  Pagination,
  PaginationProps,
} from "semantic-ui-react";

interface RecipeListProps {
  recipes: Object[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  const MAX_RECIPES_PER_PAGE = 10;
  const [activeRecipeList, setActiveRecipeList] = useState<
    Object[] | undefined
  >();
  const [totalPages, setTotalPages] = useState<number>();
  const onPageChange = (
    _: React.MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
    data: PaginationProps
  ) => {
    if (typeof data.activePage === "number") {
      const start =
        data.activePage * MAX_RECIPES_PER_PAGE - MAX_RECIPES_PER_PAGE;
      const end = data.activePage * MAX_RECIPES_PER_PAGE;
      const recipeCopy = JSON.parse(JSON.stringify(recipes));
      setActiveRecipeList(recipeCopy.splice(start, end - start));
    }
  };
  let navigate = useNavigate();
  const onSelectRecipe = (
    event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
    _: ListItemProps
  ) => {
    navigate(`/recipe/${event.currentTarget.id}`);
  };

  useEffect(() => {
    const recipeCopy = JSON.parse(JSON.stringify(recipes));
    setActiveRecipeList(recipeCopy.splice(0, MAX_RECIPES_PER_PAGE));
    const totalPageCount = Math.ceil(recipes.length / MAX_RECIPES_PER_PAGE);
    setTotalPages(totalPageCount);
  }, []);

  return (
    <Container style={{ padding: 50 }}>
      <Header>Recipes List</Header>
      <Divider />
      <List>
        {activeRecipeList &&
          activeRecipeList.map((recipe: Object) => {
            const recipeJson = JSON.parse(JSON.stringify(recipe));
            return (
              <List.Item
                id={recipeJson.id}
                key={recipeJson.id}
                onClick={onSelectRecipe}
              >
                <Image avatar src={recipeJson.image} />
                <List.Content>
                  <List.Header as="a">{recipeJson.name}</List.Header>
                  <List.Description>{recipeJson.description}</List.Description>
                </List.Content>
                <Divider />
              </List.Item>
            );
          })}
      </List>
      <Pagination
        floated="right"
        defaultActivePage={1}
        totalPages={totalPages ?? 0}
        onPageChange={onPageChange}
      />
    </Container>
  );
};

export default RecipeList;
