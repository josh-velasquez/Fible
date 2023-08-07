import {
  Button,
  Checkbox,
  Container,
  Dropdown,
  Form,
  Icon,
  Input,
  List,
  Segment,
} from "semantic-ui-react";
import UploadImage from "./UploadImage";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";

const EditRecipe: React.FC = () => {
  return <>Test</>;
//   const [recipe, setRecipe] = useState<RecipePayload>();
//   const { data } = useTypedSelector((state) => state.results);
//   const [recipeName, setRecipeName] = useState("");
//   const [description, setDescription] = useState("");
//   const [prepTime, setPrepTime] = useState("");
//   const [instructions, setInstructions] = useState<string[]>([]);
//   const [instruction, setInstruction] = useState<string>();
//   const [tags, setTags] = useState<string[]>();
//   const [favourite, setFavourite] = useState<boolean>(false);
//   const [image, setImage] = useState<File>();
//   const tagsAvailable: string[] = Object.values(chefPayloadTags.data.tagsList);
//   const { id } = useParams<string>();

//   useEffect(() => {
//     const recipes = JSON.parse(JSON.stringify(data)) as RecipePayload[];
//     const recipe = recipes.find((recipe: RecipePayload) => recipe.id === id);
//     setRecipe(recipe);
//   }, [id, data]);

//   const onResetImage = () => {
//     setImage(undefined);
//   };

//   const onAddInstructionClick = () => {
//     if (instruction !== undefined) {
//       setInstructions(instructions.concat(instruction));
//     }
//   };

//   const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     // onResetImage();
//     // if (image !== undefined && tags !== undefined) {
//     //   createNewRecipeApi(
//     //     recipeName,
//     //     description,
//     //     prepTime,
//     //     instructions,
//     //     tags,
//     //     favourite,
//     //     image
//     //   );
//     // }
//   };

//   return (
//     <Container>
//       <Segment>
//         <Form onSubmit={onSubmit}>
//           <Form.Field>
//             <label>Recipe Name</label>
//             <input
//               placeholder="Recipe Name"
//               content={recipe?.name}
//               //   onChange={(e) => setRecipeName(e.target.value)}
//             />
//           </Form.Field>
//           <Form.Field>
//             <label>Description</label>
//             <input
//               placeholder="Description"
//               //   onChange={(e) => setDescription(e.target.value)}
//             />
//           </Form.Field>
//           <Form.Field>
//             <label>Prep time</label>
//             <input
//               placeholder="Prep time"
//               //   onChange={(e) => setPrepTime(e.target.value)}
//             />
//           </Form.Field>
//           <Form.Field>
//             <label>Instructions</label>
//             {/* TODO: make this input field clearable after pressing add */}
//             <Input
//               action={{ icon: "add", onClick: () => onAddInstructionClick() }}
//               placeholder="Add recipe..."
//               onChange={(e) => setInstruction(e.target.value)}
//             />
//             {instructions.length !== 0 && (
//               <Segment>
//                 <List divided animated ordered>
//                   {instructions.map((instruction) => {
//                     return (
//                       <List.Item key={instructions.indexOf(instruction)}>
//                         {instruction}
//                         <Button
//                           onClick={() =>
//                             onRemoveRecipe(instructions.indexOf(instruction))
//                           }
//                           size="mini"
//                           floated="right"
//                           color="red"
//                           icon
//                         >
//                           <Icon name="remove" />
//                         </Button>
//                       </List.Item>
//                     );
//                   })}
//                 </List>
//               </Segment>
//             )}
//           </Form.Field>
//           <Form.Field>
//             <label>Tags</label>
//             <Dropdown
//               button
//               multiple
//               className="icon input-styling"
//               floating
//               selection
//               search
//               selectOnBlur={true}
//               labeled
//               icon="tag"
//               defaultValue={0}
//               onChange={onAddTags}
//               options={tagsOptions}
//             />
//           </Form.Field>
//           <Form.Field>
//             <label>Upload image</label>
//             <UploadImage
//               image={image}
//               onResetImage={onResetImage}
//               onUploadImage={onUploadImage}
//             />
//           </Form.Field>
//           <Form.Field>
//             <Checkbox
//               label="Add to my favourites!"
//               onClick={onAddToFavourite}
//             />
//           </Form.Field>
//           <Button positive type="submit">
//             Submit
//           </Button>
//         </Form>
//       </Segment>
//     </Container>
//   );
};

export default EditRecipe;
