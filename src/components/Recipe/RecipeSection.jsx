import { Link } from "react-router-dom";
import RecipeCard from "./RecipeCard.jsx";

const RecipeSection = ({ title, recipeList, seeAllAddress }) => {
    return (
        <div className="flex flex-col gap-y-4">
            <div className="flex justify-between items-center">
                <p className="text-xl font-bold">
                    {title}
                </p>
                <Link 
                    to={seeAllAddress}
                    className="underline hover:text-gray-500 cursor-pointer">
                        See All
                </Link>
            </div>
            <div className="flex gap-x-4 overflow-x-auto">
                {recipeList.map((recipe, index) => {
                    return <RecipeCard key={index} title={recipe.title} image={recipe.image} id={recipe.id}/>
                })}
            </div>
        </div>
    );
};

export default RecipeSection;
