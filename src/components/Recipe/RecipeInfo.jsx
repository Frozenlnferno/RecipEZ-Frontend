import RecipeTags from "./RecipeTag";

const RecipeInfo = ({ recipe }) => {
    const capitalizeFirst = (str) => {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Fix spacing after periods if missing
    const fixSpacing = (text) => text ? text.replace(/\.([A-Za-z0-9])/g, '. $1') : '';
    
    return (
        <div className="p-8 md:p-12 bg-white rounded-2xl shadow-2xl flex flex-col gap-y-8 max-w-4xl mx-auto border border-gray-100">
            {/* Headers */}
            <h1 className="font-extrabold text-3xl md:text-4xl text-green-700 mb-2 tracking-tight text-center drop-shadow-lg">
                {recipe.title}
            </h1>
            <div className="flex flex-col gap-y-2 items-center">
                <img src={recipe.image} alt={recipe.title} className="rounded-xl shadow-lg max-h-80 object-cover border border-green-200" />
                {recipe.creditsText && (
                    <p className="text-xs text-gray-500 italic mt-1">By {recipe.creditsText}</p>
                )}
            </div>

            {/* Tags */}
            <div className="flex min-h-10 gap-x-2 gap-y-2 flex-wrap items-center justify-center mt-2 mb-2">
                {recipe.glutenFree && <RecipeTags tag={"Gluten Free"} color="#22c55e" />} {/* green-500 */}
                {recipe.vegan && <RecipeTags tag={"Vegan"} color="#16a34a" />} {/* green-600 */}
                {recipe.vegetarian && <RecipeTags tag={"Vegetarian"} color="#4ade80" />} {/* green-400 */}
                {Array.isArray(recipe.dishTypes) && recipe.dishTypes.map((type, idx) => (
                    <RecipeTags key={type + idx} tag={capitalizeFirst(type)} color="#f59e42" />
                ))} {/* orange-400 */}
                {Array.isArray(recipe.cuisines) && recipe.cuisines.map((type, idx) => (
                    <RecipeTags key={type + idx} tag={capitalizeFirst(type)} color="#3b82f6" />
                ))} {/* blue-500 */}
            </div>
            <div className="flex flex-wrap justify-center gap-6 my-4">
                {/* Time Required */}
                <div className="flex flex-col items-center bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl px-6 py-4 shadow border border-green-200 min-w-[130px]">
                    <span className="text-3xl mb-1">⏱️</span>
                    <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Time</span>
                    <span className="text-xl font-bold text-gray-800">{recipe.readyInMinutes} min</span>
                </div>
                {/* Servings */}
                <div className="flex flex-col items-center bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl px-6 py-4 shadow border border-yellow-200 min-w-[130px]">
                    <span className="text-3xl mb-1">🍽️</span>
                    <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Servings</span>
                    <span className="text-xl font-bold text-gray-800">{recipe.servings}</span>
                </div>
            </div>
            <main className="flex flex-col gap-y-8 mt-2">
                {/* Ingredients */}
                <div className="bg-gray-50 rounded-xl p-6 shadow border border-gray-100">
                    <h2 className="text-2xl font-bold mb-4 text-green-700 text-center tracking-wide uppercase">Ingredients</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-900 text-base">
                        {Array.isArray(recipe.extendedIngredients) && recipe.extendedIngredients.map((ing, idx) => (
                            <li key={ing.id || idx} className="leading-relaxed">
                                {fixSpacing(ing.original)}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Instructions */}
                <div className="bg-gray-50 rounded-xl p-6 shadow border border-gray-100">
                    <h2 className="text-2xl font-bold mb-4 text-green-700 text-center tracking-wide uppercase">Instructions</h2>
                    {recipe.analyzedInstructions?.[0]?.steps?.length ? (
                        <ol className="list-decimal pl-6 space-y-3 text-gray-900 text-base">
                            {recipe.analyzedInstructions[0].steps.map(step => (
                                <li key={step.number} className="leading-relaxed bg-white rounded px-4 py-3 shadow-sm border border-gray-100">
                                    {fixSpacing(step.step)}
                                </li>
                            ))}
                        </ol>
                    ) : (
                        <p className="italic text-gray-400 text-center">No instructions available.</p>
                    )}
                </div>

                {/* Source Link */}
                {recipe.sourceUrl && (
                    <div className="mt-2 text-center">
                        <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-block text-blue-600 underline hover:text-blue-800 transition-colors font-medium text-lg">
                            View Original Recipe ↗
                        </a>
                    </div>
                )}
            </main>
        </div>
    )
};

export default RecipeInfo;