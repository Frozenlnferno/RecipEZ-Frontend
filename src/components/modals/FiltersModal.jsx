import { useState, useEffect, useMemo } from "react";

const filterOptions = {
	type: {
		multiple: false,
		options: [
			"Main Course", "Side Dish", "Dessert", "Appetizer", "Salad", "Bread",
			"Breakfast", "Soup", "Beverage", "Sauce", "Marinade", "Fingerfood",
			"Snack", "Drink",
		],
	},
	cuisine: {
		multiple: false,
		options: [
			"African", "Asian", "American", "British", "Cajun", "Caribbean",
			"Chinese", "Eastern European", "European", "French", "German", "Greek",
			"Indian", "Irish", "Italian", "Japanese", "Jewish", "Korean", "Latin American",
			"Mediterranean", "Mexican", "Middle Eastern", "Nordic", "Southern", "Spanish",
			"Thai", "Vietnamese",
		],
	},
	diet: {
		multiple: false,
		options: [
			"Gluten Free", "Ketogenic", "Vegetarian", "Lacto-Vegetarian",
			"Ovo-Vegetarian", "Vegan", "Pescetarian", "Paleo", "Primal",
			"Low FODMAP", "Whole30",
		],
	},
	intolerances: {
		multiple: true,
		options: [
			"Dairy", "Egg", "Gluten", "Grain", "Peanut", "Seafood", "Sesame",
			"Shellfish", "Soy", "Sulfite", "Tree Nut", "Wheat",
		],
	},
	readyTime: {
		multiple: false,
		options: ["<15 min", "30 min", "60 min", ">60 min"],
	},
};

// Convert keys into human-readable labels
const humanizeCategory = (key) =>
	key
		?.replace(/_/g, " ")
		.replace(/([a-z])([A-Z])/g, "$1 $2")
		.replace(/\b\w/g, (char) => char.toUpperCase()) || "";

const FiltersModal = ({ handleClose, filters, setFilters }) => {
	const [localFilters, setLocalFilters] = useState(filters || {});
	const allCategories = useMemo(() => Object.keys(filterOptions), []);

	useEffect(() => {
		const incoming = filters || {};
		const normalized = {};
		allCategories.forEach((cat) => {
			const { multiple } = filterOptions[cat];
			const val = incoming[cat];
			if (multiple) normalized[cat] = Array.isArray(val) ? val : val ? [val] : [];
			else normalized[cat] = Array.isArray(val) ? (val[0] || "") : (val || "");
		});
		setLocalFilters(normalized);
	}, [filters, allCategories]);

	const toggleOption = (category, option) => {
		const { multiple } = filterOptions[category];
		setLocalFilters((prev) => {
			const current = prev[category];
			if (multiple) {
				const selected = Array.isArray(current) ? current : [];
				return {
					...prev,
					[category]: selected.includes(option)
						? selected.filter((o) => o !== option)
						: [...selected, option],
				};
			}
			return {
				...prev,
				[category]: current === option ? "" : option,
			};
		});
	};

	const handleSelect = (category, value) =>
		setLocalFilters((prev) => ({ ...prev, [category]: value || "" }));

	const handleReset = () => {
		const cleared = {};
		allCategories.forEach((cat) => {
			cleared[cat] = filterOptions[cat].multiple ? [] : "";
		});
		setLocalFilters(cleared);
	};

	const handleApply = (e) => {
		e.preventDefault();
		setFilters(localFilters);
		handleClose();
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			{/* Overlay */}
			<button
				className="absolute inset-0 bg-black/60"
				onClick={handleClose}
				aria-label="Close modal"
			></button>

			<form
				onSubmit={handleApply}
				className="relative z-50 bg-white rounded-2xl w-11/12 max-w-md max-h-[85vh] overflow-y-auto shadow-2xl border border-green-100"
			>
				{/* Header */}
				<header className="flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 p-4">
					<h3 className="text-xl font-bold text-green-700">Filters</h3>
					<button
						type="button"
						onClick={handleClose}
						className="text-gray-500 hover:text-green-700 text-xl"
						aria-label="Close"
					>
						✕
					</button>
				</header>

				{/* Filter Categories */}
				<main className="flex flex-col gap-6 pb-6 p-6">
					{["type", "diet", "intolerances"].map((category) => (
						<div key={category}>
							<span className="font-semibold text-green-800 mb-2 block">
								{humanizeCategory(category)}
							</span>
							<div className="flex flex-wrap gap-2">
								{filterOptions[category].options.map((option) => {
									const isMultiple = filterOptions[category].multiple;
									const current = localFilters[category];
									const checked = isMultiple
										? Array.isArray(current) && current.includes(option)
										: current === option;

									return (
										<button
											key={option}
											type="button"
											onClick={() => toggleOption(category, option)}
											className={`px-3 py-1.5 rounded-full text-sm font-medium border transition ${
												checked
													? "bg-green-600 text-white border-green-600"
													: "bg-white text-gray-700 border-gray-200 hover:border-green-400"
											}`}
										>
											{option}
										</button>
									);
								})}
							</div>
						</div>
					))}

					{["cuisine", "readyTime"].map((category) => {
						const value = localFilters[category];
						const normalizedValue = Array.isArray(value)
							? value[0] || ""
							: value || "";

						return (
							<div key={category}>
								<span className="font-semibold text-green-800 mb-2 block">
									{humanizeCategory(category)}
								</span>
								<select
									value={normalizedValue}
									onChange={(e) => handleSelect(category, e.target.value)}
									className="border border-gray-300 rounded-md px-3 py-2 w-full text-sm focus:ring-2 focus:ring-green-400 outline-none"
								>
									<option value="">
										-- Select {humanizeCategory(category)} --
									</option>
									{filterOptions[category].options.map((opt) => (
										<option key={opt} value={opt}>
											{opt}
										</option>
									))}
								</select>
							</div>
						);
					})}
				</main>

				{/* Footer */}
				<footer className="flex items-center justify-between border-t border-green-100 sticky bottom-0 bg-white/80 backdrop-blur-sm p-4">
					<button
						type="button"
						onClick={handleReset}
						className="text-sm text-green-700 hover:underline"
					>
						Reset
					</button>
					<div className="flex gap-2">
						<button
							type="button"
							onClick={handleClose}
							className="px-4 py-1.5 rounded-md bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="px-5 py-1.5 rounded-md bg-green-600 text-white text-sm font-semibold hover:bg-green-700"
						>
							Apply
						</button>
					</div>
				</footer>
			</form>
		</div>
	);
};

export default FiltersModal;
