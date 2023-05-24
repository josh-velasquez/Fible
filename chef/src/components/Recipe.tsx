
interface RecipeObject {
    recipe: Object;
}

const Recipe: React.FC<RecipeObject> = ({recipe}) => {
    return (<div>{recipe}</div>)
}

export default Recipe;