import React, { useEffect, useState } from "react";
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
  Label,
  List,
  Segment,
} from "semantic-ui-react";
import * as _ from "lodash";
import UploadImage from "./UploadImage";
import { useActions } from "../hooks/useActions";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { NewRecipeInfo } from "../state/actions";

export enum ImageOptions {
  ImageUpload = "Image Upload",
  ImageUrl = "Image Url",
  None = "None",
}

const AddRecipe: React.FC = () => {
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [ingredient, setIngredient] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<string[]>([]);
  const [instruction, setInstruction] = useState<string>("");
  const [tagsList, setTagsList] = useState<string[]>();
  const [favourite, setFavourite] = useState<boolean>(false);
  const [image, setImage] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [addedRecipe, setAddedRecipe] = useState<boolean>(false);
  const [selectedImageOption, setSelectedImageOption] = useState<ImageOptions>(
    ImageOptions.None
  );
  const { tags } = useTypedSelector((state) => state.tags);

  // after creating the new recipe this gets triggered
  const { recipeInfo, loading, error } = useTypedSelector(
    (state) => state.recipe
  );
  let navigate = useNavigate();
  const { getTagsListApi, createNewRecipeApi } = useActions();

  const onUploadImage = (file: File) => {
    setImage(file);
  };

  const onResetImage = () => {
    setImage(undefined);
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
      const newTags: string[] = data.value.map((index) => {
        if (typeof index === "number" && tags) {
          return tags[index];
        }
        return "";
      });
      setTagsList(newTags);
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
      setInstructions((prevInstructions) => [...prevInstructions, instruction]);
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
      value: index,
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
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </Form.Field>
        );
      default:
        return <></>;
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onResetImage();
    if (
      (image !== undefined || imageUrl !== undefined) &&
      tagsList !== undefined
    ) {
      createNewRecipeApi({
        name: recipeName,
        description: description,
        time: prepTime,
        ingredients: ingredients,
        instructions: instructions,
        tags: tagsList,
        favourite: favourite,
        // TODO: Make this optional and fix which to check
        image: image,
        imageUrl: imageUrl,
      } as NewRecipeInfo);
      setAddedRecipe(true);
    }
  };

  useEffect(() => {
    getTagsListApi();
  }, []);

  useEffect(() => {
    if (!loading && !error && recipeInfo && addedRecipe) {
      navigate(`/recipe/${recipeInfo.id}`, { replace: true });
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
            <Label>Recipe Name</Label>
            <Input
              placeholder="Recipe Name"
              onChange={(e) => setRecipeName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <Label>Description</Label>
            <Input
              placeholder="Description"
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
              placeholder="Add instruction..."
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
              defaultValue={0}
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
