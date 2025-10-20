import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "../../components/Navbar/Navbar.jsx";
import SearchBar from "../../components/Explore/SearchBar.jsx";
import queryHelpers from "../../utils/queryHelpers.js";
import CardGrid from "../../components/Recipe/CardGrid.jsx";
import Loading from "../../components/loading/Loading.jsx";
import FiltersModal from "../../components/modals/FiltersModal.jsx";

const env = import.meta.env;

const ResultsPage = ({ filters, setFilters }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const [recipes, setRecipes] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showFiltersModal, setShowFiltersModal] = useState(false);

	// Parse filters from URL on mount or whenever URL params change
	useEffect(() => {
		setFilters(queryHelpers.parse(location.search));
	}, [location.search]);

	// Fetch recipes when filters change
	useEffect(() => {
		const updateRecipes = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const response = await fetch(`${env.VITE_SERVER_ORIGIN}/api/search_recipe`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ filters }),
				});
				if (!response.ok) throw new Error("Failed to fetch from API");

				const data = await response.json();
				setRecipes(data);
			} catch (err) {
				setError(`Could not load recipes. ${err.message}`);
			} finally {
				setIsLoading(false);
			}
		};

		// Only call API if filters are initialized (avoid running on first empty render)
		if (filters && Object.keys(filters).length > 0) {
			updateRecipes();
		}
	}, [filters]);

	// Run when user uses the search bar
	const handleSearch = (newQuery, newFilters) => {
		const qs = queryHelpers.buildURL(newQuery, newFilters);
		navigate(`/results?${qs}`);
	};

	// Toggle filter modal visibility
	const toggleFilter = () => setShowFiltersModal(!showFiltersModal);

	// ✅ Automatically trigger search when filters are applied
	const handleApplyFilters = (updatedFilters) => {
		setFilters(updatedFilters);

		// Update URL so page reloads same filters later
		const qs = queryHelpers.buildURL(filters.query || "", updatedFilters);
		navigate(`/results?${qs}`);

		// Close modal
		setShowFiltersModal(false);
	};

	return (
		<>
			<Navbar />
			<div className="pt-16 min-h-screen flex flex-col items-center w-full">
				{showFiltersModal && (
					<FiltersModal
						handleClose={toggleFilter}
						filters={filters}
						setFilters={handleApplyFilters} // 👈 use this version
					/>
				)}

				{/* Search bar */}
				<div className="m-4">
					<SearchBar handleSearch={handleSearch} onFilterClick={toggleFilter} />
				</div>

				{/* Header info */}
				<div className="p-5 lg:px-20 md:px-10 sm:px-5 shadow-md font-semibold w-full text-center">
					<p className="text-lg text-green-700">
						Search results for{" "}
						<span className="italic text-gray-700">
							“{filters.query || "All Recipes"}”
						</span>
					</p>
					<Loading
						isLoading={isLoading}
						error={error}
						mainText="Loading recipes..."
						loadingType="small"
						errorComp={<span className="text-red-500 font-semibold">{error}</span>}
						loadedComp={
							<span className="text-gray-600">{recipes.length} recipes shown</span>
						}
					/>
				</div>

				{/* Recipe cards */}
				<main className="p-5 mx-auto max-w-5xl w-full">
					<Loading
						isLoading={isLoading}
						error={error}
						mainText="Loading recipes..."
						subText="Please wait a moment!"
						loadingType="big"
						errorComp={<span className="text-red-500 font-semibold">{error}</span>}
						loadedComp={<CardGrid recipeList={recipes} />}
					/>
				</main>
			</div>
		</>
	);
};

export default ResultsPage;
