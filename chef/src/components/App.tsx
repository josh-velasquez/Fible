import { Provider } from "react-redux";
import { store } from "../state";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chef from "./Chef";
import "../styling.css";
import NavBar from "./NavBar";
import AddRecipe from "./AddRecipe";
import { ErrorPage } from "./ErrorPage";
import EditRecipe from "./EditRecipe";
import Recipe from "./Recipe";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Chef />} />
            <Route path="/recipe/:id" element={<Recipe />} />
            <Route path="/addRecipe" element={<AddRecipe />} />
            <Route path="/editRecipe/:id" element={<EditRecipe />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
};
export default App;
