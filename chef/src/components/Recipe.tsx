import {
  Button,
  ButtonProps,
  Checkbox,
  Container,
  Divider,
  Dropdown,
  DropdownItemProps,
  DropdownProps,
  Grid,
  Header,
  Icon,
  Image,
  Label,
  List,
  Segment,
} from "semantic-ui-react";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { RecipeInfo } from "../state/actions";
import DeleteModal from "./DeleteModal";
import { useActions } from "../hooks/useActions";
import Timer from "./Timer";
import Stopwatch from "./Stopwatch";
import _ from "lodash";

enum TimeOptions {
  None = "None",
  Timer = "Timer",
  Stopwatch = "Stopwatch",
}

const Recipe: React.FC = (): JSX.Element => {
  const [recipe, setRecipe] = useState<RecipeInfo>();
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const { recipesData } = useTypedSelector((state) => state.results);
  const [selectedTimeOption, setSelectedTimeOption] = useState<TimeOptions>(
    TimeOptions.None
  );
  let navigate = useNavigate();
  const { deleteRecipeApi } = useActions();

  const timerDropwdownOptions: DropdownItemProps[] = _.map(
    TimeOptions,
    (value: string, key: string) => ({
      key: key,
      text: value,
      value: key,
    })
  );

  const { id } = useParams<string>();

  const editRecipe = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ButtonProps
  ) => {
    event.preventDefault();
    if (recipe) {
      navigate(`/editRecipe/${recipe.id}`, { replace: true });
    }
  };

  const handleDeleteModalClose = () => {
    setOpenDeleteModal(false);
  };

  const handleDeleteRecipe = () => {
    deleteRecipeApi(id ?? "");
    navigate("/", { replace: true });
  };

  const handleOpenDeleteRecipe = () => {
    setOpenDeleteModal(true);
  };

  const onSelectTimeOption = (
    _: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    if (data.value === null) {
      return;
    }
    if (typeof data.value === "string") {
      const selectedValue = data.value;
      const matchingEnumKey = Object.keys(TimeOptions).find(
        (key) => key === selectedValue
      );
      if (matchingEnumKey) {
        setSelectedTimeOption(
          TimeOptions[matchingEnumKey as keyof typeof TimeOptions]
        );
      }
    }
  };

  const renderTimerOptions = (timer: string) => {
    // TODO: enforce time for minutes only
    const timerVal = parseInt(timer.split(" ")[0]);
    const seconds = timerVal * 60;
    switch (selectedTimeOption) {
      case TimeOptions.Timer:
        return <Timer startTime={seconds} timerDiameter={200} />;
      case TimeOptions.Stopwatch:
        return <Stopwatch />;
      default:
        return <></>;
    }
  };

  useEffect(() => {
    if (recipesData) {
      const recipe = recipesData.find((recipe: RecipeInfo) => recipe.id === id);
      setRecipe(recipe);
    }
  }, [id, recipesData]);

  return (
    <Container style={{ paddingTop: "30px" }} textAlign="center">
      {recipe && (
        <React.Fragment>
          <Header as="h1">{recipe.name}</Header>
          <Divider />
          <Image centered src={recipe.image} size="large" alt="Recipe Image" />
          <Header as="h4">{recipe.description}</Header>
          <Grid centered relaxed="very">
            <Grid.Row>
              {recipe.tags?.map((tag: string) => {
                return (
                  <Label
                    key={recipe.tags.indexOf(tag)}
                    color="olive"
                    size="medium"
                  >
                    {tag}
                  </Label>
                );
              })}
            </Grid.Row>
            <Grid.Row>
              <Label>
                <Icon name="time" />
                Prep Time: {recipe.time}
              </Label>
            </Grid.Row>
            <Grid.Row style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button size="tiny" color="twitter" icon onClick={editRecipe}>
                Edit Recipe
              </Button>
              <Button
                size="tiny"
                color="red"
                icon
                onClick={handleOpenDeleteRecipe}
              >
                Delete Recipe
              </Button>
            </Grid.Row>
            {recipe.favourite && (
              <Button color="red">
                <Icon name="heart" />
                Favourite
              </Button>
            )}
            <Grid.Row>
              <Container style={{ padding: "10px" }}>
                <Dropdown
                  className="icon input=styling"
                  floating
                  selectOnBlur={true}
                  selection
                  options={timerDropwdownOptions}
                  onChange={onSelectTimeOption}
                  defaultValue={TimeOptions.None}
                />
                <div style={{ marginTop: "10px" }}>
                  {renderTimerOptions(recipe.time)}
                </div>
              </Container>
            </Grid.Row>
          </Grid>
          <Divider />
          <Segment textAlign="left" inverted>
            <List divided animated ordered inverted>
              {recipe.instructions.map((instruction: string, index: number) => (
                <List.Item key={index}>
                  <List.Content>{instruction}</List.Content>
                  <List.Content floated="right">
                    <Checkbox />
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </Segment>
        </React.Fragment>
      )}
      <DeleteModal
        open={openDeleteModal}
        onClose={handleDeleteModalClose}
        onDelete={handleDeleteRecipe}
      />
    </Container>
  );
};

export default Recipe;
