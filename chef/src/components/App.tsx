import { Provider } from "react-redux";
import { store } from "../state";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chef from "./Chef";
import "../styling.css";
import NavBar from "./NavBar";
import AddRecipe from "./AddRecipe";
import Recipe from "./Recipe";
import RecipeList from "../samplePayload.json";

const App = () => {
  const sampleRecipe = JSON.parse(JSON.stringify(RecipeList.data.recipeList));
  const firstRecipe = sampleRecipe[0];
  return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Chef />} />
            <Route path="/recipe/:id" element={<Recipe recipe={firstRecipe} />} />
            <Route path="/addRecipe" element={<AddRecipe />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
};
export default App;
