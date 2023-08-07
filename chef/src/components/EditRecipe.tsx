import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  CheckboxProps,
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
import UploadImage from "./UploadImage";
import { useActions } from "../hooks/useActions";
import { useNavigate, useParams } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { NewRecipeInfo, RecipeInfo } from "../state/actions";
import { ErrorPage } from "./ErrorPage";
import { updateRecipeApi } from "../state/action-creators";

// TODO: Optimize this component as its the same as EditRecipe
const EditRecipe: React.FC = () => {
  const [recipe, setRecipe] = useState<RecipeInfo>();
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

  const { id } = useParams<string>();

  let navigate = useNavigate();

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
      // updateRecipeApi({
      //   name: recipeName,
      //   description: description,
      //   time: prepTime,
      //   instructions: instructions,
      //   tags: tags,
      //   favourite: favourite,
      //   image: image,
      // } as NewRecipeInfo);
    }
  };

  useEffect(() => {
    if (recipesData) {
      const recipe = recipesData.recipes.find(
        (recipe: RecipeInfo) => recipe.id === id
      );
      setRecipe(recipe);
    }
  }, [id, recipesData]);

  useEffect(() => {
    if (!loading && !error && recipeInfo) {
      navigate(`/recipe/${recipeInfo.id}`);
    }
  }, [recipeInfo, error, loading, navigate]);

  // TODO: Add form validation before submission
  return recipe ? (
    <Container>
      <Segment>
        <Form onSubmit={onSubmit}>
          <Form.Field>
            <label>Recipe Name</label>
            <input
              placeholder="Recipe Name"
              value={recipe?.name}
              onChange={(e) => setRecipeName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input
              placeholder="Description"
              value={recipe?.description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Prep time</label>
            <input
              placeholder="Prep time"
              value={recipe?.time}
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
            {recipe.instructions.length !== 0 && (
              <Segment>
                <List divided animated ordered>
                  {recipe.instructions.map((instruction: string) => {
                    return (
                      <List.Item key={recipe.instructions.indexOf(instruction)}>
                        {instruction}
                        <Button
                          onClick={() =>
                            onRemoveRecipe(
                              recipe.instructions.indexOf(instruction)
                            )
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
              // TODO: fix this default value to list of tags included
              defaultValue={0}
              onChange={onAddTags}
              options={tagsOptions}
            />
          </Form.Field>
          <Form.Field>
            <label>Upload image</label>
            <UploadImage
              image={recipe.image}
              onResetImage={onResetImage}
              onUploadImage={onUploadImage}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              label="Add to my favourites!"
              checked={recipe.favourite}
              onClick={onAddToFavourite}
            />
          </Form.Field>
          <Button positive type="submit">
            Save
          </Button>
        </Form>
      </Segment>
    </Container>
  ) : (
    <ErrorPage />
  );
};

export default EditRecipe;
