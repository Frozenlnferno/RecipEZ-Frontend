import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "../../components/Navbar/Navbar.jsx";
import SearchBar from "../../components/Explore/SearchBar.jsx";
import RecipeSection from "../../components/Recipe/RecipeSection.jsx";
import queryHelpers from "../../utils/queryHelpers.js";

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
                if (!response.ok) {throw new Error("Failed to fetch from API")}
                const data = await response.json();
                console.log(data);
                setPopular(data);
            } catch (err) {
                setPopularError(`Failed to get popular recipes. Error: ${err}`);
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
                <div className="flex flex-col items-center p-10 gap-y-5 w-full">  
                    <h1 className="text-2xl font-bold"> 
                        Search for your next favorite recipe!
                    </h1>
                    <p> Use our AI assisted search to find your favorite recipes! </p>
                    <SearchBar handleSearch={handleSearch}/>
                </div>
                <div className="px-10 w-full">
                    <div className="rounded border-t border-1 border-gray-400 w-full"></div>
                </div>
                <div className="flex flex-col p-10 gap-y-8 w-full">
                    <div className="bg-white p-5 rounded-lg shadow-xl">
                        {popularIsLoading ? (
                            <div className="flex flex-col items-center justify-center h-32 animate-pulse">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-orange-300 via-orange-100 to-yellow-200 flex items-center justify-center mb-3 shadow-lg">
                                    <svg className="animate-spin h-10 w-10 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                    </svg>
                                </div>
                                <span className="text-orange-600 text-lg font-semibold">Finding delicious recipes for you...</span>
                                <span className="text-gray-400 text-sm mt-1">Please wait a moment!</span>
                            </div>
                        ) : popularError ? (
                            <div className="text-red-500 font-semibold">{popularError}</div>
                        ) : (
                            <RecipeSection 
                                title="🔥Popular"
                                recipeList={popular.recipes}
                                seeAllAddress="/popular" 
                            />
                        )}
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-xl">
                        <RecipeSection 
                            title="⭐Favorites"
                            recipeList={[
                                { title:"Recipe Title", image:"https://th.bing.com/th/id/OSK.68db220ac32c2be712de2b397ad4fc46?w=197&h=118&c=7&rs=2&qlt=80&o=6&cdv=1&dpr=1.5&pid=16.1" },
                                { title:"Recipe Title", image:"https://th.bing.com/th/id/OSK.68db220ac32c2be712de2b397ad4fc46?w=197&h=118&c=7&rs=2&qlt=80&o=6&cdv=1&dpr=1.5&pid=16.1" }
                            ]} 
                            seeAllAddress="/favorites"
                        />
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-xl">
                        <RecipeSection 
                            title="💡Recommended"
                            recipeList={[
                                { title:"Recipe Title", image:"https://th.bing.com/th/id/OSK.68db220ac32c2be712de2b397ad4fc46?w=197&h=118&c=7&rs=2&qlt=80&o=6&cdv=1&dpr=1.5&pid=16.1" },
                                { title:"Recipe Title", image:"https://th.bing.com/th/id/OSK.68db220ac32c2be712de2b397ad4fc46?w=197&h=118&c=7&rs=2&qlt=80&o=6&cdv=1&dpr=1.5&pid=16.1" }
                            ]} 
                            seeAllAddress="/recommended"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchPage;