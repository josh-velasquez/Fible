import { createContext, useContext, useState } from "react";

const RecipesContext = createContext();

function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  return <RecipesContext.RecipesProvider>{children}</RecipesContext.RecipesProvider>;
}

export { RecipesProvider };
export default RecipesContext;
