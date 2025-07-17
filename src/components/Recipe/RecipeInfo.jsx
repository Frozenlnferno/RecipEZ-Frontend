import RecipeTags from "./RecipeTag";

const RecipeInfo = ({ recipe }) => {
    const capitalizeFirst = (str) => {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    return (
        <div className="p-6 md:p-10 bg-white rounded-xl shadow-lg flex flex-col gap-y-6 max-w-4xl mx-auto border border-gray-100">
            {/* Headers */}
            <h1 className="font-extrabold text-2xl md:text-3xl text-gray-900 mb-2 tracking-tight text-center">
                {recipe.title}
            </h1>
            <div className="flex flex-col gap-y-2 items-center">
                <img src={recipe.image} alt={recipe.title} className="rounded-lg shadow-md max-h-72 object-cover border border-gray-200" />
                {recipe.creditsText && (
                    <p className="text-xs text-gray-500 italic mt-1">By {recipe.creditsText}</p>
                )}
            </div>

            {/* Tags */}
            <div className="flex min-h-10 gap-x-2 gap-y-2 flex-wrap items-center justify-center mt-2 mb-2">
                {recipe.glutenFree && <RecipeTags tag={"Gluten Free"} color="#7ED957" />}
                {recipe.vegan && <RecipeTags tag={"Vegan"} color="#7ed957" />}
                {recipe.vegetarian && <RecipeTags tag={"Vegetarian"} color="#7ed957" />}
                {Array.isArray(recipe.dishTypes) && recipe.dishTypes.map((type, idx) => (
                    <RecipeTags key={type + idx} tag={capitalizeFirst(type)} color="#AAAAAA" />
                ))}
                {Array.isArray(recipe.cuisines) && recipe.cuisines.map((type, idx) => (
                    <RecipeTags key={type + idx} tag={capitalizeFirst(type)} color="#AAAAAA" />
                ))}
            </div>
            <div className="flex flex-wrap justify-center gap-4 my-2">
                {/* Time Required */}
                <div className="flex flex-col items-center bg-gradient-to-br from-green-100 to-blue-100 rounded-xl px-5 py-3 shadow border border-gray-200 min-w-[120px]">
                    <span className="text-2xl mb-1">⏱️</span>
                    <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Time</span>
                    <span className="text-lg font-bold text-gray-800">{recipe.readyInMinutes} min</span>
                </div>
                {/* Servings */}
                <div className="flex flex-col items-center bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl px-5 py-3 shadow border border-gray-200 min-w-[120px]">
                    <span className="text-2xl mb-1">🍽️</span>
                    <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Servings</span>
                    <span className="text-lg font-bold text-gray-800">{recipe.servings}</span>
                </div>
            </div>
            <main className="flex flex-col gap-y-6 mt-2">
                {/* Ingredients */}
                <div className="bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-100">
                    <h2 className="font-bold text-lg mb-3 text-gray-800 text-center tracking-wide uppercase">Ingredients</h2>
                    <ul className="list-disc pl-6 space-y-1 text-gray-900 text-base">
                        {Array.isArray(recipe.extendedIngredients) && recipe.extendedIngredients.map((ing, idx) => (
                            <li key={ing.id || idx} className="leading-relaxed">
                                {ing.original}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Instructions */}
                <div className="bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-100">
                    <h2 className="font-bold text-lg mb-3 text-gray-800 text-center tracking-wide uppercase">Instructions</h2>
                    {recipe.analyzedInstructions?.[0]?.steps?.length ? (
                        <ol className="list-decimal pl-6 space-y-2 text-gray-900 text-base">
                            {recipe.analyzedInstructions[0].steps.map(step => (
                                <li key={step.number} className="leading-relaxed bg-white rounded px-3 py-2 shadow-sm border border-gray-100">
                                    {step.step}
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
                        <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-block text-blue-600 underline hover:text-blue-800 transition-colors font-medium">
                            View Original Recipe ↗
                        </a>
                    </div>
                )}
            </main>
        </div>
    )
};

export default RecipeInfo;