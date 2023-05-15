import React from "react";
import {
  Button,
  Container,
  Form,
  Grid,
  Header,
  Segment,
} from "semantic-ui-react";

const AddRecipe: React.FC = () => {
  return (
    <Container>
      <Segment>
        <Form>
          <Form.Field>
            <label>Recipe Name</label>
            <input placeholder="Recipe Name" />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input placeholder="Description" />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </Segment>
    </Container>
  );
};

export default AddRecipe;
