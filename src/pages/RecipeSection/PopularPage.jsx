import { useState, useEffect } from "react";

import Navbar from "../../components/Navbar/Navbar.jsx";
import CardGrid from "../../components/Recipe/CardGrid.jsx";

const PopularPage = () => {
    const [recipeList, setRecipeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getList = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch("http://localhost:3001/api/get_random_recipes/5");
                if (!response.ok) { throw new Error("Failed to fetch recipes"); }
                const data = await response.json();
                setRecipeList(Array.isArray(data.recipes) ? data.recipes : []);
            } catch (err) {
                setError(`Could not load recipes. Reason: ${err}`);
            } finally {
                setLoading(false);
            }
        };
        getList();
    }, []);

    return (
        <>
            <Navbar />
            <div className="flex flex-col pt-16 w-full min-h-screen">
                <header className="p-8 mb-4 bg-white rounded-xl shadow flex flex-col items-center mx-auto max-w-5xl w-full">
                    <h1 className="font-extrabold text-3xl text-orange-700 mb-2 drop-shadow-sm text-center flex items-center gap-2">
                        <span role="img" aria-label="fire">🔥</span> Popular Recipes
                    </h1>
                    <p className="text-lg text-gray-700 text-center">
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-orange-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                </svg>
                                Loading recipes...
                            </span>
                        ) : error ? (
                            <span className="text-red-500 font-semibold">{error}</span>
                        ) : (
                            <span className="text-orange-600 font-semibold">{recipeList.length} recipes shown</span>
                        )}
                    </p>
                </header>
                <main className="p-5 mx-auto max-w-5xl w-full">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-40">
                            <svg className="animate-spin h-10 w-10 text-orange-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                            </svg>
                            <span className="text-orange-500 text-lg font-medium">Loading popular recipes...</span>
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center h-40">
                            <span className="text-red-500 text-lg font-semibold">{error}</span>
                        </div>
                    ) : (
                        <CardGrid recipeList={recipeList} />
                    )}
                </main>
            </div>
        </>
    );
};

export default PopularPage;