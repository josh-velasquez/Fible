import React, { MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Divider,
  Image,
  List,
  ListItemProps,
  Pagination,
  PaginationProps,
} from "semantic-ui-react";

interface RecipeList {
  recipes: any[];
}

const RecipeListHelper: React.FC<RecipeList> = ({ recipes }) => {
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
	console.warn("ORIG: " + recipes.length)
    // const totalPageCount = Math.ceil(recipes.length / MAX_RECIPES_PER_PAGE);
    // setTotalPages(totalPageCount);
    const recipesCopy = JSON.parse(JSON.stringify(recipes));
	setActiveRecipeList(recipesCopy);
	// console.warn("THIS: " + recipesCopy.length)
    // const test = recipesCopy.splice(0, MAX_RECIPES_PER_PAGE);
    // console.warn(test.length);
    // setActiveRecipeList(test);
  }, []);

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default RecipeListHelper;
