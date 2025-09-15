import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import Navbar from "../../components/Navbar/Navbar.jsx";
import SearchBar from "../../components/Explore/SearchBar.jsx";
import RecipeSection from "../../components/Recipe/RecipeSection.jsx";
import queryHelpers from "../../utils/queryHelpers.js";
import Loading from "../../components/loading/Loading.jsx";
import FiltersModal from "../../components/modals/FiltersModal.jsx";

import { UserContext } from "../../context/UserContext.jsx";

const SearchPage = ({ filters, setFilters}) => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const [popular, setPopular] = useState([]);
    const [popularIsLoading, setPopularIsLoading] = useState(true);
    const [popularError, setPopularError] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [favoritesIsLoading, setFavoritesIsLoading] = useState(true);
    const [favoritesError, setFavoritesError] = useState(null);
    const [recommended, setRecommended] = useState([]);
    const [recommendedIsLoading, setRecommendedIsLoading] = useState(true);
    const [recommendedError, setRecommendedError] = useState(null);
    const [showFiltersModal, setShowFiltersModal] = useState(false);
    
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

        const getFavorites = async () => {
            try {
                if (user) {
                    const response = await fetch("http://localhost:3001/api/get_random_recipes/5");
                    if (!response.ok) { throw new Error("Failed to fetch from API") }
                    const data = await response.json();
                    console.log(data);
                    setFavorites(data);
                }
            } catch (err) {
                setFavoritesError(`Failed to get favorite recipes. ${err}`);
            } finally {
                setFavoritesIsLoading(false);
            }
        }

        const getRecommended = async () => {
            try {
                if (user) {
                    const response = await fetch("http://localhost:3001/api/get_random_recipes/5");
                    if (!response.ok) { throw new Error("Failed to fetch from API") }
                    const data = await response.json();
                    console.log(data);
                    setRecommended(data);
                }
            } catch (err) {
                setRecommendedError(`Failed to get recommended recipes. ${err}`);
            } finally {
                setRecommendedIsLoading(false);
            }
        }

        getPopular();
        getFavorites();
        getRecommended();
    }, [])

    const handleSearch = (query) => {
        const qs = queryHelpers.buildURL(query, filters);
        console.log(query, " ", qs);
        navigate(`/results?${qs}`);
    }
    
    const toggleFilter = () => {
        setShowFiltersModal(!showFiltersModal);
    }

    return (
        <>
            <Navbar />
            <div className="pt-16 flex flex-col items-center min-h-screen w-full bg-gray-100">
                { showFiltersModal &&
                    <FiltersModal handleClose={toggleFilter}/> 
                }
                <div className="flex flex-col items-center shadow-lg p-10 gap-y-5 w-full bg-white">  
                    {user && 
                        <h1 className="text-2xl font-bold"> 
                            {`Hey ${user.name}!`}
                        </h1>
                    }
                    <h2 className="text-2xl font-bold"> 
                        Search for your next favorite recipe!
                    </h2>
                    <p> Use our AI assisted search to find your favorite recipes! </p>
                    <SearchBar handleSearch={handleSearch} onFilterClick={toggleFilter}/>
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
                            isLoading={favoritesIsLoading}
                            error={favoritesError}
                            mainText={"Loading your favorite recipes..."}
                            subText={"Please wait a moment!"}
                            loadingType={"big"}
                            errorComp={ <span className="text-red-500 font-semibold"> {favoritesError} </span> }
                            loadedComp={ 
                                user ? 
                                    <RecipeSection 
                                        title="⭐Favorites"
                                        recipeList={favorites.recipes}
                                        seeAllAddress="/favorites" 
                                    /> 
                                :
                                    <div className="flex flex-col gap-y-4">
                                        <div className="flex justify-between items-center">
                                            <p className="text-xl font-bold">
                                                ⭐Favorites
                                            </p>
                                        </div>
                                        <div className="py-4"> You must login to use this feature </div>
                                    </div>
                            }
                        />
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-xl">
                        <Loading 
                            isLoading={recommendedIsLoading}
                            error={recommendedError}
                            mainText={"Finding recipes you might like..."}
                            subText={"Please wait a moment!"}
                            loadingType={"big"}
                            errorComp={ <span className="text-red-500 font-semibold"> {recommendedError} </span> }
                            loadedComp={ 
                                user ? 
                                    <RecipeSection 
                                        title="💡Recommended"
                                        recipeList={recommended.recipes}
                                        seeAllAddress="/recommended" 
                                    /> 
                                :
                                    <div className="flex flex-col gap-y-4">
                                        <div className="flex justify-between items-center">
                                            <p className="text-xl font-bold">
                                                💡Recommended
                                            </p>
                                        </div>
                                        <div className="py-4"> You must login to use this feature </div>
                                    </div>
                            }
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchPage;