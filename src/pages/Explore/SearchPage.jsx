import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "../../components/Navbar/Navbar.jsx";
import SearchBar from "../../components/Explore/SearchBar.jsx";
import RecipeSection from "../../components/Recipe/RecipeSection.jsx";
import queryHelpers from "../../utils/queryHelpers.js";
import Loading from "../../components/loading/Loading.jsx";

const SearchPage = () => {
    const navigate = useNavigate();

    const [popular, setPopular] = useState([]);
    const [popularIsLoading, setPopularIsLoading] = useState(true);
    const [popularError, setPopularError] = useState(null);

    const [filters, setFilters] = useState({
        type: "",            // string or array for meal type
        cuisine: [],         // array for multiple cuisines
        diet: [],            // array for multiple diets
        intolerances: [],    // array for intolerances
        maxReadyTime: 0,     // number (minutes)
    });
    
    useEffect(() => {
        const getPopular = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/get_random_recipes/5");
                if (!response.ok) { throw new Error("Failed to fetch from API") }
                const data = await response.json();
                console.log(data);
                setPopular(data);
            } catch (err) {
                setPopularError(`Failed to get popular recipes. ${err}`);
            } finally {
                setPopularIsLoading(false);
            }
        }
        getPopular();
    }, [])

    const handleSearch = (query) => {
        const qs = queryHelpers.buildURL(query, filters);
        console.log(query, " ", qs);
        navigate(`/results?${qs}`);
    }
    
    return (
        <>
            <Navbar />
            <div className="pt-16 flex flex-col items-center min-h-screen w-full bg-gray-100">
                <div className="flex flex-col items-center shadow-lg p-10 gap-y-5 w-full bg-white">  
                    <h1 className="text-2xl font-bold"> 
                        Search for your next favorite recipe!
                    </h1>
                    <p> Use our AI assisted search to find your favorite recipes! </p>
                    <SearchBar handleSearch={handleSearch}/>
                </div>
                
                <div className="flex flex-col p-10 gap-y-8 w-full">
                    <div className="bg-white p-5 rounded-lg shadow-xl">
                        <Loading 
                            isLoading={popularIsLoading}
                            error={popularError}
                            mainText={"Finding delicious recipes for you..."}
                            subText={"Please wait a moment!"}
                            loadingType={"big"}
                            errorComp={ <span className="text-red-500 font-semibold"> {popularError} </span> }
                            loadedComp={ 
                                <RecipeSection 
                                    title="🔥Popular"
                                    recipeList={popular.recipes}
                                    seeAllAddress="/popular" 
                                /> 
                            }
                        />
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-xl">
                        <Loading 
                            isLoading={popularIsLoading}
                            error={popularError}
                            mainText={"Loading your favorite recipes..."}
                            subText={"Please wait a moment!"}
                            loadingType={"big"}
                            errorComp={ <span className="text-red-500 font-semibold"> {popularError} </span> }
                            loadedComp={ 
                                <RecipeSection 
                                    title="⭐Favorites"
                                    recipeList={popular.recipes}
                                    seeAllAddress="/favorites" 
                                /> 
                            }
                        />
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-xl">
                        <Loading 
                            isLoading={popularIsLoading}
                            error={popularError}
                            mainText={"Finding recipes you might like..."}
                            subText={"Please wait a moment!"}
                            loadingType={"big"}
                            errorComp={ <span className="text-red-500 font-semibold"> {popularError} </span> }
                            loadedComp={ 
                                <RecipeSection 
                                    title="💡Recommended"
                                    recipeList={popular.recipes}
                                    seeAllAddress="/recommended" 
                                /> 
                            }
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchPage;