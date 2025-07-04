import RecipeCard from "../Recipe/RecipeCard.jsx";

const RecipeSection = ({ title, recipeList }) => {
    return (
        <div className="flex flex-col gap-y-4">
            <div className="flex justify-between items-center">
                <p className="text-xl font-bold">
                    {title}
                </p>
                <a className="underline hover:text-gray-500 cursor-pointer">
                    See All
                </a>
            </div>
            <div className="flex gap-x-4 overflow-x-auto">
                {recipeList.map((recipe, index) => {
                    return <RecipeCard key={index} title={recipe.title} image={recipe.image} />
                })}
            </div>
        </div>
    );
};

export default RecipeSection;
