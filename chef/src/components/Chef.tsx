import React from "react";
import FavouritesList from "./FavouritesList";
import chefPayload from "../samplePayload.json";
import RecipeList from "./RecipeList";
import { Header } from "semantic-ui-react";

const Chef: React.FC = () => {
  return (
    <React.Fragment>
      <Header textAlign="center">Favourites List</Header>
      <FavouritesList recipes={chefPayload.data.recipeList} />
      <RecipeList recipes={chefPayload.data.recipeList} />
    </React.Fragment>
  );
};

export default Chef;
