import React, { useEffect } from "react";
import {
  Container,
  Dimmer,
  Divider,
  Header,
  Loader,
  Segment,
} from "semantic-ui-react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import RecipeListHelper from "./RecipeListHelper";

const RecipeList: React.FC = () => {
  const { data, error, loading } = useTypedSelector((state) => state.results);
  const { getRecipeListApi } = useActions();

  useEffect(() => {
    getRecipeListApi();
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
      {!error && !loading && data && <RecipeListHelper recipes={data} />}
    </Container>
  );
};

export default RecipeList;
