import React, { useEffect } from "react";
import FavouritesList from "./FavouritesList";
import RecipeList from "./RecipeList";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { Container, Dimmer, Loader, Segment } from "semantic-ui-react";

const Chef: React.FC = () => {
  const { data, error, loading } = useTypedSelector((state) => state.results);
  const { getRecipeListApi } = useActions();

  useEffect(() => {
    getRecipeListApi();
  }, []);

  // TODO: Show an error page if server is down
  return (
    <Container style={{ paddingTop: "30px" }}>
      {loading && (
        <Segment style={{ padding: 50 }}>
          <Dimmer active inverted>
            <Loader>Fetching recipes...</Loader>
          </Dimmer>
        </Segment>
      )}
      {Object.keys(data).length === 0 && (
        <Segment piled>
          No recipes available. Create some recipes first!
        </Segment>
      )}
      {!error && !loading && Object.keys(data).length !== 0 && (
        <>
          <FavouritesList recipesData={data} />
          <RecipeList recipesData={data} />
        </>
      )}
    </Container>
  );
};

export default Chef;
