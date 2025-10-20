import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "../../components/Navbar/Navbar";
import RecipeInfo from "../../components/Recipe/RecipeInfo";

const env = import.meta.env;

const RecipePage = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getRecipe = async () => {
            try {   
                const response = await fetch(`${env.VITE_SERVER_ORIGIN}/api/get_recipe/${id}`)
                if (!response.ok) { throw new Error("Failed to fetch")}
                const data = await response.json();
                setRecipe(data);
            } catch (err) {
                setError(`Failed to load recipe. Reason: ${err}`)
            } finally {
                setIsLoading(false);
            }
        }
        getRecipe();
    }, [])

    return(
        <>
            <Navbar />
            <div className="pt-16 px-1 min-h-screen flex items-center justify-center">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-48 animate-pulse">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-green-300 via-green-100 to-green-200 flex items-center justify-center mb-4 shadow-lg">
                            <svg className="animate-spin h-10 w-10 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                            </svg>
                        </div>
                        <span className="text-green-700 text-lg font-semibold">Loading recipe details...</span>
                        <span className="text-gray-400 text-sm mt-1">Please wait a moment!</span>
                    </div>
                ) : error ? (
                    <div className="text-red-500 font-semibold">{error}</div>
                ) : (
                    <RecipeInfo recipe={recipe} />
                )}
            </div>
        </>
    );
};

export default RecipePage;