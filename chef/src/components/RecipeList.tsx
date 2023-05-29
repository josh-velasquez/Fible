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
import { RecipePayload } from "./RecipePayload";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { RecipeListPayload } from "./RecipeListPayload";

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<RecipePayload[]>();
  const { data, error, loading } = useTypedSelector((state) => state.results);
  const { getRecipeListApi } = useActions();
  const MAX_RECIPES_PER_PAGE = 10;
  const [activeRecipeList, setActiveRecipeList] = useState<
    RecipePayload[] | undefined
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
      if (recipes !== undefined) {
        const start =
          paginationData.activePage * MAX_RECIPES_PER_PAGE -
          MAX_RECIPES_PER_PAGE;
        const end = paginationData.activePage * MAX_RECIPES_PER_PAGE;
        setActiveRecipeList(recipes.splice(start, end - start));
      }
    }
  };

  const getRecipeLists = () => {
    getRecipeListApi();
    if (error) {
      console.warn("error");
    } else if (loading) {
      console.warn("loading");
    } else if (!error && !loading && data) {
      if (data !== undefined) {
        const recipesPayload = JSON.parse(
          JSON.stringify(data)
        ) as RecipeListPayload;
        const recipes = recipesPayload.recipes;
        if (recipes !== undefined) {
          setRecipes(recipes);
          setActiveRecipeList(recipes.splice(0, MAX_RECIPES_PER_PAGE));
          const totalPageCount = Math.ceil(
            recipes.length / MAX_RECIPES_PER_PAGE
          );
          setTotalPages(totalPageCount);
        }
      }
    }
  };

  useEffect(() => {
    getRecipeLists();
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
            {activeRecipeList.map((recipe: RecipePayload) => {
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
        </React.Fragment>
      )}
    </Container>
  );
};

export default RecipeList;
