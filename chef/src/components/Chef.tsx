import React, { useEffect } from "react";
import FavouritesList from "./FavouritesList";
import RecipeList from "./RecipeList";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { Dimmer, Loader, Segment } from "semantic-ui-react";
import { RecipePayload } from "./RecipePayload";

const Chef: React.FC = () => {
  const { data, error, loading } = useTypedSelector((state) => state.results);
  const { getRecipeListApi } = useActions();

  useEffect(() => {
    getRecipeListApi();
  }, []);

  return (
    <React.Fragment>
      {loading && (
        <Segment style={{ padding: 50 }}>
          <Dimmer active inverted>
            <Loader>Fetching recipes...</Loader>
          </Dimmer>
        </Segment>
      )}
      {!error && !loading && data && (
        <>
          <FavouritesList
            recipes={JSON.parse(JSON.stringify(data)) as RecipePayload[]}
          />
          <RecipeList
            recipes={JSON.parse(JSON.stringify(data)) as RecipePayload[]}
          />
        </>
      )}
    </React.Fragment>
  );
};

export default Chef;
