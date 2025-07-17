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
                <header className="p-5">
                    <h1 className="font-bold text-2xl">Popular Recipes</h1>
                    <p>
                        {loading ? 
                            "Loading recipes..." : 
                            error ? 
                                error : 
                                `${recipeList.length} recipes shown`}
                    </p>
                </header>
                <main className="p-5">
                    {loading ? (
                        <div className="text-center text-gray-500">Loading...</div>
                    ) : error ? (
                        <div className="text-center text-red-500"> {error} </div>
                    ) : (
                        <CardGrid recipeList={recipeList} />
                    )}
                </main>
            </div>
        </>
    );
};

export default PopularPage;