import React, { useEffect } from "react";
import FavouritesList from "./FavouritesList";
import RecipeList from "./RecipeList";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { Container, Dimmer, Loader, Segment } from "semantic-ui-react";

const Chef: React.FC = () => {
  const { recipesData, error, loading } = useTypedSelector(
    (state) => state.results
  );
  const { getRecipeListApi } = useActions();

  useEffect(() => {
    getRecipeListApi();
  }, []);

  return (
    <Container style={{ paddingTop: "30px" }}>
      {loading && (
        <Segment style={{ padding: 50 }}>
          <Dimmer active inverted>
            <Loader>Fetching recipes...</Loader>
          </Dimmer>
        </Segment>
      )}
      {(!recipesData || recipesData.length === 0) && (
        <Segment piled>
          No recipes available. Create some recipes first!
        </Segment>
      )}
      {!error && !loading && recipesData && (
        <>
          <FavouritesList recipesData={recipesData} />
          <RecipeList recipesData={recipesData} />
        </>
      )}
    </Container>
  );
};

export default Chef;
