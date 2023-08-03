import { Provider } from "react-redux";
import { store } from "../state";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chef from "./Chef";
import "../styling.css";
import NavBar from "./NavBar";
import AddRecipe from "./AddRecipe";
import Recipe from "./Recipe";
import { ErrorPage } from "./ErrorPage";

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
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
};
export default App;
