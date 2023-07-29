import {
  Checkbox,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Label,
  List,
  Segment,
} from "semantic-ui-react";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";

const Recipe: React.FC = () => {
  const { getRecipeApi } = useActions();
  const { data, error, loading } = useTypedSelector((state) => state.recipe);

  // TODO: Add timer here? We need to have an alarm set for baking etc...
  // TODO: Update wording for payloads

  // fetch the id from the nav bar
  const { id } = useParams<string>();

  useEffect(() => {
    getRecipeApi(id ?? "");
  }, []);

  return (
    <Container textAlign="center">
      {!error && !loading && data && (
        <React.Fragment>
          <Header as="h1">{data.name}</Header>
          <Divider />
          <Image centered src={data.image} size="large" />
          <Header as="h4">{data.description}</Header>
          <Grid centered relaxed="very">
            <Grid.Row>
              {data.tags &&
                data.tags.map((tag: string) => {
                  return (
                    <Label
                      key={data.tags.indexOf(tag)}
                      color="olive"
                      size="mini"
                    >
                      {tag}
                    </Label>
                  );
                })}
            </Grid.Row>
            <Grid.Row>
              <Label>
                <Icon name="time" />
                Prep Time: {data.time}
              </Label>
            </Grid.Row>
            <Grid.Row>
              <Checkbox label="Add to my favourites!" />
            </Grid.Row>
          </Grid>
          <Divider />
          <Segment textAlign="left" inverted>
            <List divided animated ordered inverted>
              {data &&
                data.instructions.map((instruction: string) => {
                  return (
                    <List.Item>
                      <List.Content>{instruction}</List.Content>
                      <List.Content floated="right">
                        <Checkbox />
                      </List.Content>
                    </List.Item>
                  );
                })}
            </List>
          </Segment>
        </React.Fragment>
      )}
    </Container>
  );
};

export default Recipe;
