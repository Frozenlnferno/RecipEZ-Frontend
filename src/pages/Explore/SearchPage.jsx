import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import SearchBar from "../../components/Explore/SearchBar.jsx";
import RecipeSection from "../../components/Explore/RecipeSection.jsx";

const SearchPage = () => {
    return (
        <>
            <Navbar />
            <div className="pt-16 flex flex-col items-center min-h-screen w-full">
                <div className="flex flex-col items-center p-10 gap-y-5 w-full">  
                    <h1 className="text-2xl font-bold"> 
                        Search for your next favorite recipe!
                    </h1>
                    <p> Use our AI assisted search to find your favorite recipes! </p>
                    <SearchBar />
                </div>
                <div className="px-10 w-full">
                    <div className="rounded border-t border-1 border-gray-400 w-full"></div>
                </div>
                <div className="flex flex-col p-10 gap-y-8 w-full">
                    <div className="">
                        <RecipeSection 
                            title="Popular"
                            recipeList={[
                                { title:"Recipe Title", image:"https://th.bing.com/th/id/OSK.68db220ac32c2be712de2b397ad4fc46?w=197&h=118&c=7&rs=2&qlt=80&o=6&cdv=1&dpr=1.5&pid=16.1" },
                                { title:"Recipe Title", image:"https://th.bing.com/th/id/OSK.68db220ac32c2be712de2b397ad4fc46?w=197&h=118&c=7&rs=2&qlt=80&o=6&cdv=1&dpr=1.5&pid=16.1" }
                            ]} 
                        />
                    </div>
                    <div className="">
                        <RecipeSection 
                            title="Favorites"
                            recipeList={[
                                { title:"Recipe Title", image:"https://th.bing.com/th/id/OSK.68db220ac32c2be712de2b397ad4fc46?w=197&h=118&c=7&rs=2&qlt=80&o=6&cdv=1&dpr=1.5&pid=16.1" },
                                { title:"Recipe Title", image:"https://th.bing.com/th/id/OSK.68db220ac32c2be712de2b397ad4fc46?w=197&h=118&c=7&rs=2&qlt=80&o=6&cdv=1&dpr=1.5&pid=16.1" }
                            ]} 
                        />
                    </div>
                    <div className="">
                        <RecipeSection 
                            title="Recommended"
                            recipeList={[
                                { title:"Recipe Title", image:"https://th.bing.com/th/id/OSK.68db220ac32c2be712de2b397ad4fc46?w=197&h=118&c=7&rs=2&qlt=80&o=6&cdv=1&dpr=1.5&pid=16.1" },
                                { title:"Recipe Title", image:"https://th.bing.com/th/id/OSK.68db220ac32c2be712de2b397ad4fc46?w=197&h=118&c=7&rs=2&qlt=80&o=6&cdv=1&dpr=1.5&pid=16.1" }
                            ]} 
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchPage;