import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "../../components/Navbar/Navbar";
import RecipeInfo from "../../components/Recipe/RecipeInfo";

const RecipePage = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getRecipe = async () => {
            try {   
                const response = await fetch(`http://localhost:3001/api/get_recipe/${id}`)
                if (!response.ok) { throw new Error("Failed to fetch")}
                const data = await response.json();
                console.log(data);
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
            <div className="p-16">
                {isLoading ?
                    "Loading recipe" : 
                    error ? 
                        error :
                        ( <RecipeInfo recipe={recipe} /> )
                } 
            </div>
        </>
    );
};

export default RecipePage;