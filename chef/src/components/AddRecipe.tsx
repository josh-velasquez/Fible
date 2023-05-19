import React, { ChangeEvent, useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  DropdownItemProps,
  Form,
  Segment,
} from "semantic-ui-react";
import * as _ from "lodash";
import chefPayloadTags from "../samplePayload.json";
import UploadImage from "./UploadImage";
import { requestApi } from "../state/action-creators";

const AddRecipe: React.FC = () => {
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [instructions, setInstructions] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>(chefPayloadTags.data.tagsList);
  const [image, setImage] = useState<File>();
  const onUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setImage(files[0]);
    }
  };
  const onResetImage = () => {
    setImage(undefined);
  };

  const tagsOptions: DropdownItemProps[] = _.map(
    tags,
    (keyword: string, index: number) => ({
      key: index,
      text: keyword,
      value: index,
    })
  );
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onResetImage();
    if (image !== undefined) {
      requestApi(recipeName, description, prepTime, instructions, tags, image);
    }
  };
  return (
    <Container>
      <Segment>
        <Form onSubmit={onSubmit}>
          <Form.Field>
            <label>Recipe Name</label>
            <input placeholder="Recipe Name" content={recipeName} />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input placeholder="Description" content={description} />
          </Form.Field>
          <Form.Field>
            <label>Prep time</label>
            <input placeholder="Prep time" />
          </Form.Field>
          <Form.Field>
            <label>Instructions</label>
          </Form.Field>
          <Form.Field>
            <label>Tags</label>
            <Dropdown
              button
              multiple
              className="icon input-styling"
              floating
              selection
              search
              selectOnBlur={true}
              labeled
              icon="tag"
              defaultValue={0}
              options={tagsOptions}
            />
          </Form.Field>
          <Form.Field>
            <label>Upload image</label>
            <UploadImage
              image={image}
              onResetImage={onResetImage}
              onUploadImage={onUploadImage}
            />
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
        </Form>
      </Segment>
    </Container>
  );
};

export default AddRecipe;
