import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "../../components/Navbar/Navbar.jsx";
import SearchBar from "../../components/Explore/SearchBar.jsx";
import queryHelpers from "../../utils/queryHelpers.js";
import CardGrid from "../../components/Recipe/CardGrid.jsx";
import Loading from "../../components/loading/Loading.jsx";
import FiltersModal from "../../components/modals/FiltersModal.jsx";

const env = import.meta.env

const ResultsPage = ({ filters, setFilters}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showFiltersModal, setShowFiltersModal] = useState(false);

    // When results page first displays, all the useEffect fires on mount 

    // When the parameter changes, but not address, parse the parameters and update filter 
    useEffect(() => {
        setFilters(queryHelpers.parse(location.search));
    }, [location.search])

    // Once filter update, call API for new recipes and update recipes
    useEffect(() => {
        const updateRecipes = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`${env.VITE_SERVER_ORIGIN}/api/search_recipe`, {
                    method: "post",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({filters})
                });
                if (!response.ok) { throw new Error("Failed to fetch from API") }
                const data = await response.json();

                setRecipes(data);
                setIsLoading(false);
            } catch (err) {
                setIsLoading(true);
                setError(`Could not load recipes. ${err}`)
            } finally {
                setIsLoading(false);
            }
        }
        updateRecipes();
    }, [filters]);

    // Search function for searchbar
    const handleSearch = (newQuery, newFilters) => {
        const qs = queryHelpers.buildURL(newQuery, newFilters);
        navigate(`/results?${qs}`);
    }

    const toggleFilter = () => {
        setShowFiltersModal(!showFiltersModal);
    }

    return (
        <>
            <Navbar />
            <div className="pt-16 min-h-screen flex items-center flex-col w-full">
                { showFiltersModal &&
                    <FiltersModal handleClose={toggleFilter}/> 
                }
                <div className="m-4">
                    <SearchBar handleSearch={handleSearch} onFilterClick={toggleFilter}/>
                </div>
                <div className="p-5 lg:px-20 md:px-10 sm:px-5 shadow-md font-semibold w-full">
                    <p> Search results for "{filters.query}" </p>
                    <Loading 
                        isLoading={isLoading}
                        error={error}
                        mainText={"Loading recipes..."}
                        loadingType={"small"}
                        errorComp={ <span className="text-red-500 font-semibold"> {error} </span> }
                        loadedComp={ <span> {recipes.length} recipes shown </span> }
                    />
                </div>
                <main className="p-5 mx-auto max-w-5xl w-full">
                    <Loading 
                        isLoading={isLoading}
                        error={error}
                        mainText={"Loading recipes..."}
                        subText={"Please wait a moment!"}
                        loadingType={"big"}
                        errorComp={ <span className="text-red-500 font-semibold"> {error} </span> }
                        loadedComp={ <CardGrid recipeList={recipes} /> }
                    />
                </main>
            </div>
        </>
    );
};
  
export default ResultsPage;
