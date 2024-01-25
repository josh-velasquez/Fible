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
import { ImageOptions } from "./AddRecipe";

// TODO: Optimize this component as its the same as EditRecipe
const EditRecipe: React.FC = (): JSX.Element => {
  const [recipeId, setRecipeId] = useState<string>("");
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [ingredient, setIngredient] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<string[]>([]);
  const [instruction, setInstruction] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [favourite, setFavourite] = useState<boolean>(false);
  const [image, setImage] = useState<File>();
  const [currentImage, setCurrentImage] = useState<string>("");
  const [newImageSelected, setNewImageSelected] = useState<boolean>(false);
  const { tags } = useTypedSelector((state) => state.tags);
  const { recipesData } = useTypedSelector((state) => state.results);
  const [selectedImageOption, setSelectedImageOption] = useState<ImageOptions>(
    ImageOptions.None
  );
  const [updatedRecipe, setUpdatedRecipe] = useState<boolean>(false);
  const { recipeInfo, loading, error } = useTypedSelector(
    (state) => state.recipe
  );
  const { getRecipeListApi, getTagsListApi, updateRecipeApi } = useActions();

  const { id } = useParams<string>();

  let navigate = useNavigate();

  const onUploadImage = (file: File) => {
    setImage(file);
    setNewImageSelected(true);
  };

  const onResetImage = () => {
    setImage(undefined);
    setNewImageSelected(false);
  };

  const onRemoveInstruction = (id: number) => {
    setInstructions(instructions.filter((_, index) => index !== id));
  };

  const onRemoveIngredient = (id: number) => {
    setIngredients(ingredients.filter((_, index) => index !== id));
  };

  const onAddTags = (
    _: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    if (data.value === null) {
      return;
    }
    if (typeof data.value === "object") {
      const newTags: string[] = data.value.map((tag) => {
        if (typeof tag === "string" && tags) {
          return tag;
        }
        return "";
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

  const onEnterIngredientPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      updateIngredients();
    }
  };

  const updateIngredients = (
    event?: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    if (event) {
      event.preventDefault();
    }
    if (ingredient !== "") {
      setIngredients([...ingredients, ingredient]);
      setIngredient("");
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
    tags,
    (keyword: string, index: number) => ({
      key: index,
      text: keyword,
      value: keyword,
    })
  );

  const imageDropdownOptions: DropdownItemProps[] = _.map(
    ImageOptions,
    (keyword: string, index: string) => ({
      key: index,
      text: keyword,
      value: index,
    })
  );

  const renderImageOptions = () => {
    switch (selectedImageOption) {
      case ImageOptions.ImageUpload:
        return (
          <Form.Field>
            <Label>Upload image</Label>
            <UploadImage
              image={image}
              onResetImage={onResetImage}
              onUploadImage={onUploadImage}
            />
          </Form.Field>
        );
      case ImageOptions.ImageUrl:
        return (
          <Form.Field>
            <Label>Image Url</Label>
            <Input
              placeholder="Image url"
              onChange={(e) => setCurrentImage(e.target.value)}
            />
          </Form.Field>
        );
      default:
        return <></>;
    }
  };

  const onSelectImageUpload = (
    _: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    if (data.value === null) {
      return;
    }
    if (typeof data.value === "string") {
      const selectedValue = data.value;
      const matchingEnumKey = Object.keys(ImageOptions).find(
        (key) => key === selectedValue
      );
      if (matchingEnumKey) {
        setSelectedImageOption(
          ImageOptions[matchingEnumKey as keyof typeof ImageOptions]
        );
      }
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onResetImage();
    if (
      (image !== undefined || currentImage !== undefined) &&
      selectedTags !== undefined
    ) {
      updateRecipeApi({
        id: recipeId,
        name: recipeName,
        description: description,
        ingredients: ingredients,
        time: prepTime,
        instructions: instructions,
        tags: selectedTags,
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
      const recipe = recipesData.find((recipe: RecipeInfo) => recipe.id === id);
      if (recipe && tags) {
        const selectedTagIndices = recipe.tags.map((tag: string) =>
          tags.findIndex((option) => option === tag)
        );
        const newTags: string[] = selectedTagIndices.map((index) => {
          if (typeof index === "number") {
            return tags[index];
          }
          return "";
        });
        setRecipeId(recipe.id);
        setRecipeName(recipe.name);
        setDescription(recipe.description);
        setIngredients(recipe.ingredients);
        setPrepTime(recipe.time);
        setInstructions(recipe.instructions);
        setSelectedTags(newTags);
        setFavourite(recipe.favourite);
        setCurrentImage(recipe.image as string);
      }
    }
  }, [id, recipesData, tags]);

  useEffect(() => {
    if (!tags) {
      getTagsListApi();
    }
    if (recipesData) {
      getRecipeListApi();
    }
  }, []);

  useEffect(() => {
    if (!loading && !error && recipeInfo && updatedRecipe) {
      navigate(`/recipe/${recipeInfo.id}`, { replace: true });
    }
  }, [recipeInfo, error, loading, updatedRecipe, navigate]);

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
            <Label>Ingredients</Label>
            <Input
              action={{
                icon: "add",
                onClick: (
                  event: React.MouseEvent<HTMLInputElement, MouseEvent>
                ) => updateInstructions(event),
              }}
              placeholder="Add ingredient..."
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              onKeyPress={onEnterIngredientPress}
            />
            {ingredients.length !== 0 && (
              <Segment>
                <List divided animated ordered>
                  {ingredients.map((ingredient: string, index: number) => {
                    return (
                      <List.Item key={index}>
                        {ingredient}
                        <Button
                          onClick={() => onRemoveIngredient(index)}
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
                          onClick={() => onRemoveInstruction(index)}
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
            <Label>Image</Label>
            <Dropdown
              className="icon input-styling"
              floating
              selectOnBlur={true}
              labeled
              defaultValue={ImageOptions.None}
              onChange={onSelectImageUpload}
              selection
              options={imageDropdownOptions}
            />
          </Form.Field>
          {renderImageOptions()}
          {!newImageSelected && (
            <Image
              style={{ maxWidth: 500, maxHeight: 500 }}
              className="preview"
              src={currentImage}
              alt=""
            />
          )}
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
