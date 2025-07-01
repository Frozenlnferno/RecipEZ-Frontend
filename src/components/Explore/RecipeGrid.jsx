import RecipeCard from "./RecipeCard";

const RecipeGrid = ({ recipes, isLoggedIn }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {recipes.map((r) => (
      <RecipeCard key={r.id} recipe={r} isLoggedIn={isLoggedIn} />
    ))}
  </div>
);

export default RecipeGrid;
