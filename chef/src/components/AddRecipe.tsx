import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  CheckboxProps,
  Container,
  Divider,
  Dropdown,
  DropdownItemProps,
  DropdownProps,
  Form,
  Header,
  Icon,
  Input,
  List,
  Segment,
} from "semantic-ui-react";
import * as _ from "lodash";
import UploadImage from "./UploadImage";
import { useActions } from "../hooks/useActions";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { NewRecipeInfo } from "../state/actions";

const AddRecipe: React.FC = () => {
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [instructions, setInstructions] = useState<string[]>([]);
  const [instruction, setInstruction] = useState<string>("");
  const [tags, setTags] = useState<string[]>();
  const [favourite, setFavourite] = useState<boolean>(false);
  const [image, setImage] = useState<File>();
  const { recipesData } = useTypedSelector((state) => state.results);
  const { recipeInfo, loading, error } = useTypedSelector(
    (state) => state.recipe
  );
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
        if (typeof index === "number" && recipesData) {
          return recipesData.tags[index];
        }
        return "";
      });
      setTags(newTags);
    }
  };

  const onAddInstructionClick = () => {
    if (instruction !== undefined) {
      setInstructions(instructions.concat(instruction));
      setInstruction("");
    }
  };

  const onAddToFavourite = (
    _: React.MouseEvent<HTMLInputElement, MouseEvent>,
    data: CheckboxProps
  ) => {
    if (data.checked) {
      setFavourite(data.checked);
    } else {
      setFavourite(false);
    }
  };

  const tagsOptions: DropdownItemProps[] = _.map(
    recipesData?.tags,
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
      createNewRecipeApi({
        name: recipeName,
        description: description,
        time: prepTime,
        instructions: instructions,
        tags: tags,
        favourite: favourite,
        image: image,
      } as NewRecipeInfo);
    }
  };

  useEffect(() => {
    if (!loading && !error && recipeInfo) {
      navigate(`/recipe/${recipeInfo.id}`);
    }
  }, [recipeInfo, error, loading, navigate]);
  // TODO: Add form validation before submission
  return (
    <Container>
      <Segment>
        <Header as="h2">
          <Icon name="food" />
          <Header.Content>New Recipe</Header.Content>
        </Header>
        <Divider />
        <Form onSubmit={onSubmit}>
          <Form.Field>
            <label>Recipe Name</label>
            <Input
              placeholder="Recipe Name"
              onChange={(e) => setRecipeName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <Input
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Prep time</label>
            <Input
              placeholder="Prep time"
              onChange={(e) => setPrepTime(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Instructions</label>
            <Input
              action={{ icon: "add", onClick: () => onAddInstructionClick() }}
              placeholder="Add recipe..."
              value={instruction}
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
          <Form.Field>
            <Checkbox
              label="Add to my favourites!"
              onClick={onAddToFavourite}
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
