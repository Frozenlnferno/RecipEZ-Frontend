import RecipeCard from "./RecipeCard";

// recipeList must have title, image, and id properties
const CardGrid = ({ recipeList }) => {
    return (
        <div className="grid place-items-center [grid-template-columns:repeat(auto-fill,minmax(180px,1fr))] gap-y-5">
            {recipeList.map((recipe, index) => {
                return <RecipeCard key={index} title={recipe.title} image={recipe.image} id={recipe.id} />
            })}
        </div>
    );
}

export default CardGrid;