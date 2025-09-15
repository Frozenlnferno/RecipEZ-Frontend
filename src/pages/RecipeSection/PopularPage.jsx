import { useState, useEffect } from "react";

import Navbar from "../../components/Navbar/Navbar.jsx";
import CardGrid from "../../components/Recipe/CardGrid.jsx";
import Loading from "../../components/loading/Loading.jsx";

const env = import.meta.env;

const PopularPage = () => {
    const [recipeList, setRecipeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getList = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${env.VITE_SERVER_ORIGIN}/api/get_random_recipes/2`);
                if (!response.ok) { throw new Error("Failed to fetch recipes"); }
                const data = await response.json();
                setRecipeList(Array.isArray(data.recipes) ? data.recipes : []);
            } catch (err) {
                setError(`Could not load recipes. ${err}`);
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
                <header className="p-8 mb-4 bg-white shadow-lg flex flex-col items-center mx-auto  w-full">
                    <h1 className="font-extrabold text-3xl text-orange-700 mb-2 drop-shadow-sm text-center flex items-center gap-2">
                        <span role="img" aria-label="fire">🔥</span> Popular Recipes
                    </h1>
                    <div className="text-lg text-gray-700 text-center">
                        <Loading 
                            isLoading={loading}
                            error={error}
                            mainText={"Loading recipes..."}
                            subText={""}
                            loadingType={"small"}
                            errorComp={ <div className="text-red-500 font-semibold"> {error} </div> }
                            loadedComp={ <div className="text-orange-600 font-semibold"> {recipeList.length} recipes shown </div> }
                        />
                    </div>
                </header>
                <main className="p-5 mx-auto max-w-5xl w-full">
                    <Loading 
                        isLoading={loading}
                        error={error}
                        mainText={"Loading popular recipes..."}
                        subText={"Please wait a moment!"}
                        loadingType={"big"}
                        errorComp={ <span className="text-red-500 font-semibold"> {error} </span> }
                        loadedComp={ <CardGrid recipeList={recipeList} /> }
                    />
                </main>
            </div>
        </>
    );
};

export default PopularPage;