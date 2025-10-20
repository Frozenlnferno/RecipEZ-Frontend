import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import Navbar from "../../components/Navbar/Navbar.jsx";
import SearchBar from "../../components/Explore/SearchBar.jsx";
import RecipeSection from "../../components/Recipe/RecipeSection.jsx";
import queryHelpers from "../../utils/queryHelpers.js";
import Loading from "../../components/loading/Loading.jsx";
import FiltersModal from "../../components/modals/FiltersModal.jsx";

import { UserContext } from "../../context/UserContext.jsx";

const env = import.meta.env;

const SearchPage = ({ filters, setFilters}) => {
    const navigate = useNavigate();
    const { user, favorites, favoritesLoading, favoritesError } = useContext(UserContext);

    const [popular, setPopular] = useState([]);
    const [popularIsLoading, setPopularIsLoading] = useState(true);
    const [popularError, setPopularError] = useState(null);
    const [recommended, setRecommended] = useState([]);
    const [recommendedIsLoading, setRecommendedIsLoading] = useState(true);
    const [recommendedError, setRecommendedError] = useState(null);
    const [showFiltersModal, setShowFiltersModal] = useState(false);
    
    useEffect(() => {
        const getPopular = async () => {
            try {
                const response = await fetch(`${env.VITE_SERVER_ORIGIN}/api/get_random_recipes/7`);
                if (!response.ok) { throw new Error("Failed to fetch from API") }
                const data = await response.json();
                setPopular(data);
            } catch (err) {
                setPopularError(`Failed to get popular recipes. ${err}`);
            } finally {
                setPopularIsLoading(false);
            }
        }

        const getRecommended = async () => {
            try {
                if (user) {
                    const response = await fetch(`${env.VITE_SERVER_ORIGIN}/api/get_random_recipes/3`);
                    if (!response.ok) { throw new Error("Failed to fetch from API") }
                    const data = await response.json();
                    setRecommended(data);
                }
            } catch (err) {
                setRecommendedError(`Failed to get recommended recipes. ${err}`);
            } finally {
                setRecommendedIsLoading(false);
            }
        }
        getPopular();
        getRecommended();
        // re-run when user changes so recommended/popular can be refreshed after login
    }, [user])

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
                    <FiltersModal handleClose={toggleFilter} filters={filters} setFilters={setFilters}/> 
                }
                <div className="flex flex-col items-center shadow-lg p-6 md:p-10 gap-y-5 w-full bg-white">  
                    {user && 
                        <h1 className="text-2xl font-bold"> 
                            {`Hey ${user.name}!`}
                        </h1>
                    }
                    <h2 className="text-2xl font-bold"> 
                        Search for your next favorite recipe!
                    </h2>
                    <p> Use our smart filters to discover recipes you’ll love. </p>
                    <SearchBar handleSearch={handleSearch} onFilterClick={toggleFilter}/>
                </div>
                
                <div className="flex flex-col p-4 md:p-8 lg:p-12 gap-y-8 w-full">
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
                            isLoading={favoritesLoading}
                            error={favoritesError}
                            mainText={"Loading your favorite recipes..."}
                            subText={"Please wait a moment!"}
                            loadingType={"big"}
                            errorComp={ <span className="text-red-500 font-semibold"> {favoritesError} </span> }
                            loadedComp={ 
                                user ? 
                                    (favorites && favorites.length > 0 ? (
                                        <RecipeSection 
                                            title="⭐Favorites"
                                            recipeList={favorites.map(f => ({ title: f.recipe_title || f.title, image: f.recipe_image || f.image, id: f.id }))}
                                            seeAllAddress="/favorites" 
                                        />
                                    ) : (
                                        <div className="flex flex-col gap-y-4">
                                            <div className="flex justify-between items-center">
                                                <p className="text-xl font-bold">⭐Favorites</p>
                                            </div>
                                            <div className="py-4 text-gray-600">You don't have any favorites yet. Click the heart on a recipe to add it to your favorites.</div>
                                        </div>
                                    ))
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