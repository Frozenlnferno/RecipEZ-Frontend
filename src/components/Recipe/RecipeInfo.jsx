import { useNavigate } from "react-router-dom";
import RecipeTags from "./RecipeTag";

const RecipeInfo = ({ recipe }) => {
	const navigate = useNavigate();

	const capitalizeFirst = (str) =>
		str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

	const fixSpacing = (text) =>
		text ? text.replace(/\.([A-Za-z0-9])/g, ". $1") : "";

	const handleBack = () => {
		if (window.history.state?.idx > 0) navigate(-1);
		else navigate("/search");
	};

	return (
		<div className="p-5 sm:p-8 md:p-10 bg-white rounded-2xl shadow-2xl flex flex-col gap-y-8 max-w-3xl mx-auto border border-green-100 mt-4 sm:mt-8 mb-8">
			{/* Back Button */}
			<div>
				<button
					onClick={handleBack}
					className="flex items-center gap-2 bg-green-600 text-white text-sm sm:text-base font-semibold px-4 py-2 rounded-lg shadow hover:bg-green-700 transition active:scale-95"
				>
					<span className="text-lg">←</span>
					<span>Back</span>
				</button>
			</div>

			{/* Header */}
			<section className="flex flex-col items-center text-center gap-3">
				<h1 className="font-extrabold text-3xl sm:text-4xl text-green-700 tracking-tight leading-snug drop-shadow-md">
					{recipe.title}
				</h1>
				<img
					src={recipe.image}
					alt={recipe.title}
					className="rounded-xl shadow-lg w-full max-h-[320px] object-cover border border-green-200"
				/>
				{recipe.creditsText && (
					<p className="text-xs text-gray-500 italic mt-1">
						By {recipe.creditsText}
					</p>
				)}
			</section>

			{/* Tags */}
			<div className="flex flex-wrap justify-center gap-2 mt-1">
				{recipe.glutenFree && <RecipeTags tag="Gluten Free" color="#22c55e" />}
				{recipe.vegan && <RecipeTags tag="Vegan" color="#16a34a" />}
				{recipe.vegetarian && <RecipeTags tag="Vegetarian" color="#4ade80" />}
				{Array.isArray(recipe.dishTypes) &&
					recipe.dishTypes.map((type, idx) => (
						<RecipeTags
							key={type + idx}
							tag={capitalizeFirst(type)}
							color="#f59e42"
						/>
					))}
				{Array.isArray(recipe.cuisines) &&
					recipe.cuisines.map((type, idx) => (
						<RecipeTags
							key={type + idx}
							tag={capitalizeFirst(type)}
							color="#3b82f6"
						/>
					))}
			</div>

			{/* Info Cards */}
			<div className="grid grid-cols-2 gap-4 sm:flex sm:justify-center sm:gap-6 my-4">
				<div className="flex flex-col items-center bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl px-5 py-4 shadow border border-green-200 w-full sm:min-w-[140px]">
					<span className="text-2xl sm:text-3xl mb-1">⏱️</span>
					<span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
						Time
					</span>
					<span className="text-lg sm:text-xl font-bold text-gray-800">
						{recipe.readyInMinutes} min
					</span>
				</div>

				<div className="flex flex-col items-center bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl px-5 py-4 shadow border border-yellow-200 w-full sm:min-w-[140px]">
					<span className="text-2xl sm:text-3xl mb-1">🍽️</span>
					<span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
						Servings
					</span>
					<span className="text-lg sm:text-xl font-bold text-gray-800">
						{recipe.servings}
					</span>
				</div>
			</div>

			{/* Ingredients */}
			<section className="bg-gray-50 rounded-xl p-5 sm:p-6 shadow border border-gray-100">
				<h2 className="text-2xl font-bold mb-4 text-green-700 text-center uppercase tracking-wide">
					Ingredients
				</h2>
				<ul className="list-disc pl-5 sm:pl-6 space-y-2 text-gray-900 text-base">
					{Array.isArray(recipe.extendedIngredients) &&
						recipe.extendedIngredients.map((ing, idx) => (
							<li key={ing.id || idx} className="leading-relaxed">
								{fixSpacing(ing.original)}
							</li>
						))}
				</ul>
			</section>

			{/* Instructions */}
			<section className="bg-gray-50 rounded-xl p-5 sm:p-6 shadow border border-gray-100">
				<h2 className="text-2xl font-bold mb-4 text-green-700 text-center uppercase tracking-wide">
					Instructions
				</h2>
				{recipe.analyzedInstructions?.[0]?.steps?.length ? (
					<ol className="list-decimal pl-5 sm:pl-6 space-y-3 text-gray-900 text-base">
						{recipe.analyzedInstructions[0].steps.map((step) => (
							<li
								key={step.number}
								className="leading-relaxed bg-white rounded-md px-4 py-3 shadow-sm border border-gray-100"
							>
								{fixSpacing(step.step)}
							</li>
						))}
					</ol>
				) : (
					<p className="italic text-gray-400 text-center">
						No instructions available.
					</p>
				)}
			</section>

			{/* Source Link */}
			{recipe.sourceUrl && (
				<div className="text-center">
					<a
						href={recipe.sourceUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-block text-green-600 underline hover:text-green-800 transition-colors font-medium text-lg"
					>
						View Original Recipe ↗
					</a>
				</div>
			)}
		</div>
	);
};

export default RecipeInfo;
