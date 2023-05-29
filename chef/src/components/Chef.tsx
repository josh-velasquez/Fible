import React from "react";
import FavouritesList from "./FavouritesList";
import RecipeList from "./RecipeList";

const Chef: React.FC = () => {
  return (
    <React.Fragment>
      <FavouritesList />
      <RecipeList />
    </React.Fragment>
  );
};

export default Chef;
