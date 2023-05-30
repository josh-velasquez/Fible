import React, { MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Dimmer,
  Divider,
  Header,
  Image,
  List,
  ListItemProps,
  Loader,
  Pagination,
  PaginationProps,
  Segment,
} from "semantic-ui-react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";

const RecipeList: React.FC = () => {
  const { data, error, loading } = useTypedSelector((state) => state.results);
  const { getRecipeListApi } = useActions();
  const MAX_RECIPES_PER_PAGE = 10;
  const [activeRecipeList, setActiveRecipeList] = useState<
    string[] | undefined
  >();
  const [totalPages, setTotalPages] = useState<number>();

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
      if (data !== undefined) {
        const start =
          paginationData.activePage * MAX_RECIPES_PER_PAGE -
          MAX_RECIPES_PER_PAGE;
        const end = paginationData.activePage * MAX_RECIPES_PER_PAGE;
        setActiveRecipeList(data.splice(start, end - start));
      }
    }
  };

  const getRecipeLists = () => {
    getRecipeListApi();
    if (data !== undefined) {
      const recipesPayload = JSON.parse(JSON.stringify(data));
      const recipes = recipesPayload.recipes;
      if (recipes !== undefined) {
        // setRecipes(recipes);
        setActiveRecipeList(recipes.splice(0, MAX_RECIPES_PER_PAGE));
        const totalPageCount = Math.ceil(recipes.length / MAX_RECIPES_PER_PAGE);
        setTotalPages(totalPageCount);
      }
    }
  };

  useEffect(() => {
    getRecipeLists();
    setActiveRecipeList(data);
  }, []);

  return (
    <Container style={{ padding: 50 }}>
      <Header>Recipes List</Header>
      <Divider />
      {loading && (
        <Segment style={{ padding: 50 }}>
          <Dimmer active inverted>
            <Loader>Fetching recipes...</Loader>
          </Dimmer>
        </Segment>
      )}
      {!error && !loading && activeRecipeList && (
        <React.Fragment>
          <List>
            {activeRecipeList.map((recipe: Object) => {
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
                    <List.Description>
                      {recipeJson.description}
                    </List.Description>
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
        </React.Fragment>
      )}
    </Container>
  );
};

export default RecipeList;
