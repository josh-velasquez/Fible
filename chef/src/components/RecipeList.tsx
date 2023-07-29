import React, { MouseEvent, useEffect, useState } from "react";
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
import { RecipePayload } from "./RecipePayload";
import { useNavigate } from "react-router-dom";

interface RecipeListProps {
  recipes: RecipePayload[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  const [totalPages, setTotalPages] = useState<number>(0);
  const MAX_RECIPES_PER_PAGE = 5;
  const [activeRecipeList, setActiveRecipeList] = useState<
    string[] | undefined
  >();

  let navigate = useNavigate();
  const onSelectRecipe = (
    event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
    _: ListItemProps
  ) => {
    navigate(`/recipe/${event.currentTarget.id}`);
  };

  const onPageChange = (
    _: React.MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
    paginationData: PaginationProps
  ) => {
    if (typeof paginationData.activePage === "number") {
      const start =
        paginationData.activePage * MAX_RECIPES_PER_PAGE - MAX_RECIPES_PER_PAGE;
      const end = paginationData.activePage * MAX_RECIPES_PER_PAGE;
      const recipeCopy = JSON.parse(JSON.stringify(recipes));
      setActiveRecipeList(recipeCopy.splice(start, end - start));
    }
  };

  useEffect(() => {
    const totalPageCount = Math.ceil(recipes.length / MAX_RECIPES_PER_PAGE);
    setTotalPages(totalPageCount);
    const recipesCopy = JSON.parse(JSON.stringify(recipes));
    const activeRecipes = recipesCopy.splice(0, MAX_RECIPES_PER_PAGE);
    setActiveRecipeList(activeRecipes);
  }, [recipes, setTotalPages]);

  return (
    <Container style={{ padding: 50 }}>
      <Header>Recipes List</Header>
      <Divider />
      <List>
        {activeRecipeList &&
          activeRecipeList.map((recipe: any) => {
            return (
              <List.Item
                id={recipe.id}
                key={recipe.id}
                onClick={onSelectRecipe}
              >
                <Image avatar src={recipe.image} />
                <List.Content>
                  <List.Header as="a">{recipe.name}</List.Header>
                  <List.Description>{recipe.description}</List.Description>
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
