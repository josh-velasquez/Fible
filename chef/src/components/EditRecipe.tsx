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
  Image,
  Input,
  Label,
  List,
  Segment,
} from "semantic-ui-react";
import * as _ from "lodash";
import UploadImage from "./UploadImage";
import { useNavigate, useParams } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { NewRecipeInfo, RecipeInfo } from "../state/actions";
import { useActions } from "../hooks/useActions";

// TODO: Optimize this component as its the same as EditRecipe
const EditRecipe: React.FC = (): JSX.Element => {
  const [recipeId, setRecipeId] = useState<string>("");
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [instructions, setInstructions] = useState<string[]>([]);
  const [instruction, setInstruction] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<number[]>();
  const [favourite, setFavourite] = useState<boolean>(false);
  const [image, setImage] = useState<File>();
  const [currentImage, setCurrentImage] = useState<string>("");
  const { recipesData } = useTypedSelector((state) => state.results);
  const { recipeInfo, loading, error } = useTypedSelector(
    (state) => state.recipe
  );
  const [updatedRecipe, setUpdatedRecipe] = useState<boolean>(false);
  const { updateRecipeApi } = useActions();

  const { id } = useParams<string>();

  let navigate = useNavigate();

  const onUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setImage(files[0]);
      // setCurrentImage("");
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
      const newTags: number[] = data.value.map((index) => {
        if (typeof index === "number" && recipesData) {
          return Number(index);
        }
        return -1;
      });
      setSelectedTags(newTags);
    }
  };

  const onEnterInstructionPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      updateInstructions();
    }
  };

  const updateInstructions = (
    event?: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    if (event) {
      event.preventDefault();
    }
    if (instruction !== "") {
      setInstructions([...instructions, instruction]);
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
    if (
      (image !== undefined || currentImage !== "") &&
      selectedTags !== undefined
    ) {
      const selectedTagValues = selectedTags.map(
        (index) => tagsOptions[index].text
      );
      updateRecipeApi({
        id: recipeId,
        name: recipeName,
        description: description,
        time: prepTime,
        instructions: instructions,
        tags: selectedTagValues,
        favourite: favourite,
        // TODO: Update this so we only set whatever is updated
        image: image,
        imageUrl: currentImage,
      } as NewRecipeInfo);
      setUpdatedRecipe(true);
    }
  };

  useEffect(() => {
    if (recipesData) {
      const recipe = recipesData.recipes.find(
        (recipe: RecipeInfo) => recipe.id === id
      );
      if (recipe) {
        const selectedTagIndices = recipe.tags.map((tag) =>
          recipesData.tags.findIndex((option) => option === tag)
        );
        setRecipeId(recipe.id);
        setRecipeName(recipe.name);
        setDescription(recipe.description);
        setPrepTime(recipe.time);
        setInstructions(recipe.instructions);
        setSelectedTags(selectedTagIndices);
        setFavourite(recipe.favourite);
        setCurrentImage(recipe.image as string);
      }
    }
  }, [id, recipesData]);

  useEffect(() => {
    if (!loading && !error && recipeInfo && updatedRecipe) {
      navigate(`/recipe/${recipeInfo.id}`, { replace: true });
    }
  }, [recipeInfo, error, loading, navigate, updatedRecipe]);

  // TODO: Add form validation before submission
  return (
    <Container>
      <Segment>
        <Header as="h2">
          <Icon name="food" />
          <Header.Content>{recipeName}</Header.Content>
        </Header>
        <Divider />
        <Form onSubmit={onSubmit}>
          <Form.Field>
            <Label>Recipe Name</Label>
            <Input
              placeholder="Recipe Name"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <Label>Description</Label>
            <Input
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <Label>Prep time</Label>
            <Input
              placeholder="Prep time"
              value={prepTime}
              onChange={(e) => setPrepTime(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <Label>Instructions</Label>
            <Input
              action={{
                icon: "add",
                onClick: (
                  event: React.MouseEvent<HTMLInputElement, MouseEvent>
                ) => updateInstructions(event),
              }}
              placeholder="Add recipe..."
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              onKeyPress={onEnterInstructionPress}
            />
            {instructions.length !== 0 && (
              <Segment>
                <List divided animated ordered>
                  {instructions.map((instruction: string, index: number) => {
                    return (
                      <List.Item key={index}>
                        {instruction}
                        <Button
                          onClick={() => onRemoveRecipe(index)}
                          size="mini"
                          floated="right"
                          color="red"
                          icon
                          type="button"
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
            <Label>Tags</Label>
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
              value={selectedTags}
              onChange={onAddTags}
              options={tagsOptions}
            />
          </Form.Field>
          <Form.Field>
            <Label>Upload image</Label>
            {image ? (
              <UploadImage
                image={image}
                onResetImage={onResetImage}
                onUploadImage={onUploadImage}
              />
            ) : currentImage ? (
              <Image
                src={currentImage}
                style={{ height: "250px", objectFit: "cover" }}
                alt={currentImage}
              />
            ) : (
              <UploadImage
                image={image}
                onResetImage={onResetImage}
                onUploadImage={onUploadImage}
              />
              // TODO: add link instead for url
            )}
          </Form.Field>
          <Form.Field>
            <Checkbox
              label="Add to my favourites!"
              checked={favourite}
              onClick={onAddToFavourite}
            />
          </Form.Field>
          <Button positive type="submit">
            Save
          </Button>
        </Form>
      </Segment>
    </Container>
  );
};

export default EditRecipe;
