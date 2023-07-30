import React, { useEffect, useState } from "react";
import { Search, SearchProps, SearchResultData } from "semantic-ui-react";
import _ from "lodash";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { RecipePayload } from "./RecipePayload";
import { useNavigate } from "react-router-dom";

interface RecipeDropdown {
  id: string;
  title: string;
  description: string;
  image: string;
}

const SearchRecipe: React.FC = () => {
  const { data } = useTypedSelector((state) => state.results);
  const [results, setResults] = useState<RecipeDropdown[]>();
  const [value, setValue] = useState<string>();
  const [recipes, setRecipes] = useState<RecipePayload[]>();
  let navigate = useNavigate();

  const onResultSelect = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    data: SearchResultData
  ) => {
    if (data.result !== undefined) {
      const recipe = data.result as RecipeDropdown;
      navigate(`/recipe/${recipe.id}`);
    }
  };

  const handleSearchChange = React.useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>, data: SearchProps) => {
      if (data.value !== undefined || data.value !== "") {
        setValue(data.value ?? "");
        const re = new RegExp(_.escapeRegExp(data.value), "i");
        const isMatch = (result: Object) => {
          const recipeJson = JSON.parse(JSON.stringify(result));
          return (
            re.test(recipeJson.name) ||
            re.test(recipeJson.description) ||
            re.test(recipeJson.tags)
          );
        };
        const results = _.filter(recipes, isMatch);
        const recipesList: RecipeDropdown[] = results.map(
          (recipe: RecipePayload) => {
            return {
              id: recipe.id,
              title: recipe.name,
              description: recipe.description,
              image: recipe.image,
            } as RecipeDropdown;
          }
        );
        setResults(recipesList);
      }
    },
    [recipes]
  );

  useEffect(() => {
    const recipes = JSON.parse(JSON.stringify(data)) as RecipePayload[];
    setRecipes(recipes);
  }, [data]);

  return (
    <Search
      size="mini"
      loading={false}
      placeholder="Search recipe..."
      onResultSelect={onResultSelect}
      onSearchChange={handleSearchChange}
      results={results}
      value={value}
    />
  );
};
export default SearchRecipe;
