import { Link } from "react-router-dom";

const RecipeCard = ({ recipe, isLoggedIn }) => (
  <div className="bg-white shadow rounded-lg overflow-hidden">
    <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">{recipe.title}</h2>
      <div className="flex justify-between items-center">
        <Link to={`/recipe/${recipe.id}`} className="text-sm text-green-600 hover:underline">
          View
        </Link>
        {isLoggedIn && (
          <button className="text-sm text-red-600 hover:underline">♡ Favorite</button>
        )}
      </div>
    </div>
  </div>
);

export default RecipeCard;
