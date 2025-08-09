import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "../../components/Navbar/Navbar.jsx";
import SearchBar from "../../components/Explore/SearchBar.jsx";
import queryHelpers from "../../utils/queryHelpers.js";
import CardGrid from "../../components/Recipe/CardGrid.jsx";
import Loading from "../../components/loading/Loading.jsx";

const ResultsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [filters, setFilters] = useState(queryHelpers.parse(location.search));
    const [recipes, setRecipes] = useState([
        {
            title: "Food1",
            img: "null",
            id: 1
        },
        {
            title: "Food2",
            img: "null",
            id: 2
        }
    ]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const updateFilter = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch("http://localhost:3001/api/get_random_recipes/5");
                if (!response.ok) { throw new Error("Failed to fetch from API") }
                const data = await response.json();
                setRecipes(data[0]);
                setIsLoading(false);
            } catch (err) {
                setIsLoading(true);
                setError(`Could not load recipes. ${err}`)
            } finally {
                setIsLoading(false);
            }
        }

        setFilters(queryHelpers.parse(location.search));
        console.log(filters);
        updateFilter();
    }, [location.search]);

    const handleSearch = (query) => {
        const qs = queryHelpers.buildURL(query, filters);
        console.log(query, " ", qs);
        navigate(`/results?${qs}`);
    }

    return (
        <>
            <Navbar />
            <div className="pt-16 min-h-screen flex items-center flex-col w-full">
                <div className="m-4">
                    <SearchBar handleSearch={handleSearch}/>
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
