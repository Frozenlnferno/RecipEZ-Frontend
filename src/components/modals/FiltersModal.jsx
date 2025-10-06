import { useState, useEffect } from "react";

const filterOptions = {
    type: { multiple: false, options: ["Main Course","Side Dish","Dessert","Appetizer","Salad","Bread","Breakfast",
                                       "Soup","Beverage","Sauce","Marinade","Fingerfood","Snack","Drink"] },
    cuisine: { multiple: false, options: ["African","Asian","American","British","Cajun","Caribbean",
                                          "Chinese","Eastern European","European","French","German","Greek",
                                          "Indian","Irish","Italian","Japanese","Jewish","Korean","Latin American",
                                          "Mediterranean","Mexican","Middle Eastern","Nordic","Southern","Spanish",
                                          "Thai","Vietnamese"]
    },
    diet: { multiple: false, options: ["Gluten Free","Ketogenic","Vegetarian","Lacto-Vegetarian","Ovo-Vegetarian",
                                       "Vegan","Pescetarian","Paleo","Primal","Low FODMAP","Whole30"]
    },
    intolerances: { multiple: true, options: ["Dairy","Egg","Gluten","Grain","Peanut","Seafood","Sesame",
                                              "Shellfish","Soy","Sulfite","Tree Nut","Wheat"] },
    readyTime: { multiple: false, options: ["<15 min", "30 min", "60 min", ">60 min"] },
};

// This file is mostly AI generated
// Convert camelCase or snake_case keys into human-friendly labels
const humanizeCategory = (cat) => {
	if (!cat) return '';
	// replace underscores with spaces, split camelCase boundaries, then capitalize
	const withSpaces = cat.replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2');
	return withSpaces
		.split(' ')
		.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
		.join(' ');
};

const FiltersModal = ({ handleClose, filters, setFilters }) => {
	const [localFilters, setLocalFilters] = useState(filters || {});

	// Keep local state in sync when the parent `filters` prop changes
	useEffect(() => {
		// Normalize incoming filters to match our expected shapes:
		// - For categories with multiple: true -> ensure an array
		// - For categories with multiple: false -> ensure a scalar (string) or undefined
		const incoming = filters || {};
		const normalized = { ...incoming };
		Object.keys(filterOptions).forEach((cat) => {
			const isMultiple = filterOptions[cat].multiple;
			const val = incoming[cat];
			if (isMultiple) {
				if (val === undefined) normalized[cat] = [];
				else if (Array.isArray(val)) normalized[cat] = val;
				else normalized[cat] = [val];
			} else {
				if (Array.isArray(val)) normalized[cat] = val.length ? val[0] : undefined;
				else normalized[cat] = val;
			}
		});
		setLocalFilters(normalized);
	}, [filters]);

	// Ensure we send a normalized copy of localFilters to the parent when applying
	const normalizeFiltersForParent = (input) => {
		const normalized = {};
		Object.keys(filterOptions).forEach((cat) => {
			const isMultiple = filterOptions[cat].multiple;
			const val = input[cat];
			if (isMultiple) {
				if (val === undefined) normalized[cat] = [];
				else if (Array.isArray(val)) normalized[cat] = [...val];
				else normalized[cat] = [val];
			} else {
				if (Array.isArray(val)) normalized[cat] = val.length ? val[0] : undefined;
				else normalized[cat] = val;
			}
		});
		return normalized;
	};

	const handleCheckboxChange = (category, option) => {
		const isMultiple = filterOptions[category]?.multiple;
		const current = localFilters[category];

		if (!isMultiple) {
			// single-select: toggle radio-like behavior (select/deselect)
			setLocalFilters({
				...localFilters,
				[category]: current === option ? undefined : option,
			});
			return;
		}

		const categoryFilters = Array.isArray(current) ? current : [];
		if (categoryFilters.includes(option)) {
			setLocalFilters({
				...localFilters,
				[category]: categoryFilters.filter((item) => item !== option),
			});
		} else {
			setLocalFilters({
				...localFilters,
				[category]: [...categoryFilters, option],
			});
		}
	};

	const handleSelectChange = (category, value) => {
		setLocalFilters({
			...localFilters,
			[category]: value,
		});
	};

	const handleApply = (e) => {
		e.preventDefault();
		const payload = normalizeFiltersForParent(localFilters || {});
		setFilters(payload);
		console.log("Applied Filters: ", localFilters);
		handleClose();
	};

	return (
		<div className="fixed inset-0 z-50 flex justify-center items-center">
			<span
				className="absolute inset-0 bg-black/60"
				onClick={handleClose}
			></span>

			<form
				onSubmit={handleApply}
				className="relative z-50 bg-white rounded-lg p-4 w-11/12 max-w-md max-h-[85vh] overflow-y-auto shadow-lg"
			>
				<header className="flex items-center justify-between mb-3">
					<h3 className="text-lg font-semibold">Filters</h3>
					<button type="button" onClick={handleClose} aria-label="Close" className="text-gray-500 hover:text-gray-700">✕</button>
				</header>

				<main className="flex flex-col gap-4">
					{['type', 'diet', 'intolerances'].map((category) => (
						<div key={category} className="flex flex-col">
							<span className="font-medium mb-2">{humanizeCategory(category)}</span>
							<div className="flex flex-wrap gap-2">
								{filterOptions[category].options.map((option) => {
									const isMultiple = filterOptions[category]?.multiple;
									const current = localFilters[category];
									const checked = isMultiple
										? (Array.isArray(current) ? current.includes(option) : false)
										: current === option;

									return (
										<button
											key={option}
											type="button"
											onClick={() => handleCheckboxChange(category, option)}
											className={`px-3 py-1 rounded-full text-sm border ${checked ? 'bg-orange-500 text-white border-transparent' : 'bg-white text-gray-700 border-gray-200'} hover:shadow-sm`}
										>
											{option}
										</button>
									);
								})}
							</div>
						</div>
					))}

					{["cuisine", "readyTime"].map((category) => (
						<div key={category} className="flex flex-col">
							<span className="font-medium mb-2">{humanizeCategory(category)}</span>
							<select
								value={Array.isArray(localFilters[category]) ? (localFilters[category][0] || '') : (localFilters[category] ?? '')}
								onChange={(e) => handleSelectChange(category, e.target.value)}
								className="border rounded p-2"
							>
								<option value="">-- Select {humanizeCategory(category)} --</option>
								{filterOptions[category].options.map((option) => (
									<option key={option} value={option}>
										{option}
									</option>
								))}
							</select>
						</div>
					))}
				</main>

				<footer className="mt-4 flex items-center justify-between">
					<button
						type="button"
						onClick={() => {
							// Reset to normalized empty values: arrays for multi-select, undefined for single-select
							const empty = {};
							Object.keys(filterOptions).forEach((cat) => {
								empty[cat] = filterOptions[cat].multiple ? [] : undefined;
							});
							setLocalFilters(empty);
						}}
						className="text-sm text-gray-600 hover:underline"
					>
						Reset
					</button>

					<div className="flex gap-2">
						<button
							type="button"
							onClick={handleClose}
							className="px-3 py-1 rounded bg-gray-100 text-sm hover:bg-gray-200"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="px-4 py-1 rounded bg-orange-500 text-white text-sm hover:bg-orange-600"
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
