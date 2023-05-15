import React from "react";
import RecipesList from "./RecipesList";
import recipes from '../sampleRecipes.json'
import SearchResult from "./SearchResult";

const Chef: React.FC = () => {
  return (
    <React.Fragment>
      <SearchResult />
      <RecipesList recipes={recipes} />
    </React.Fragment>
  );
};

export default Chef;
