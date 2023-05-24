import React, { useEffect, useState } from "react";
import {
  Container,
  Divider,
  Header,
  Image,
  List,
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
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
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

  useEffect(() => {
    const recipeCopy = JSON.parse(JSON.stringify(recipes));
    setActiveRecipeList(recipeCopy.splice(0, MAX_RECIPES_PER_PAGE));
    const totalPageCount = Math.ceil(recipes.length / MAX_RECIPES_PER_PAGE);
    setTotalPages(totalPageCount);
  }, []);

  // TODO: handle paging for numerous pages
  return (
    <Container style={{ padding: 50 }}>
      <Header>Recipes List</Header>
      <Divider />
      <List>
        {activeRecipeList &&
          activeRecipeList.map((recipe: Object) => {
            const recipeJson = JSON.parse(JSON.stringify(recipe));
            return (
              <List.Item key={recipeJson.id}>
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
