import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  DropdownItemProps,
  DropdownProps,
  Form,
  Icon,
  Input,
  List,
  Segment,
} from "semantic-ui-react";
import * as _ from "lodash";
import chefPayloadTags from "../samplePayload.json";
import UploadImage from "./UploadImage";
import { useActions } from "../hooks/useActions";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { RecipePayload } from "./RecipePayload";
import { getRecipeListApi } from "../state/action-creators";

const AddRecipe: React.FC = () => {
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [instructions, setInstructions] = useState<string[]>([]);
  const [instruction, setInstruction] = useState<string>();
  const [tags, setTags] = useState<string[]>();
  const [image, setImage] = useState<File>();
  const tagsAvailable: string[] = Object.values(chefPayloadTags.data.tagsList);
  const { data, loading, error } = useTypedSelector((state) => state.recipe);
  let navigate = useNavigate();
  const { createNewRecipeApi } = useActions();

  const onUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setImage(files[0]);
    }
  };

  const onResetImage = () => {
    setImage(undefined);
  };

  const onRemoveRecipe = (id: number) => {
    setInstructions(instructions.filter((_, index) => index !== id));
  };

  const onAddTags = (
    _: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    if (data.value === null) {
      return;
    }
    if (typeof data.value === "object") {
      const newTags: string[] = data.value.map((index) => {
        if (typeof index === "number") {
          return tagsAvailable[index];
        }
        return "";
      });
      setTags(newTags);
    }
  };

  const onAddInstructionClick = () => {
    if (instruction !== undefined) {
      setInstructions(instructions.concat(instruction));
    }
  };

  const tagsOptions: DropdownItemProps[] = _.map(
    tagsAvailable,
    (keyword: string, index: number) => ({
      key: index,
      text: keyword,
      value: index,
    })
  );

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onResetImage();
    if (image !== undefined && tags !== undefined) {
      createNewRecipeApi(
        recipeName,
        description,
        prepTime,
        instructions,
        tags,
        image
      );
    }
  };
  useEffect(() => {
    if (data && !loading && !error) {
      const recipe = JSON.parse(JSON.stringify(data)) as RecipePayload;
      navigate(`/recipe/${recipe.id}`);
    }
  }, [data, error, loading, navigate]);
  // TODO: Add form validation before submission
  return (
    <Container>
      <Segment>
        <Form onSubmit={onSubmit}>
          <Form.Field>
            <label>Recipe Name</label>
            <input
              placeholder="Recipe Name"
              onChange={(e) => setRecipeName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Prep time</label>
            <input
              placeholder="Prep time"
              onChange={(e) => setPrepTime(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Instructions</label>
            {/* TODO: make this input field clearable after pressing add */}
            <Input
              action={{ icon: "add", onClick: () => onAddInstructionClick() }}
              placeholder="Add recipe..."
              onChange={(e) => setInstruction(e.target.value)}
            />
            {instructions.length !== 0 && (
              <Segment>
                <List divided animated ordered>
                  {instructions.map((instruction) => {
                    return (
                      <List.Item key={instructions.indexOf(instruction)}>
                        {instruction}
                        <Button
                          onClick={() =>
                            onRemoveRecipe(instructions.indexOf(instruction))
                          }
                          size="mini"
                          floated="right"
                          color="red"
                          icon
                        >
                          <Icon name="remove" />
                        </Button>
                      </List.Item>
                    );
                  })}
                </List>
              </Segment>
            )}
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
              onChange={onAddTags}
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
