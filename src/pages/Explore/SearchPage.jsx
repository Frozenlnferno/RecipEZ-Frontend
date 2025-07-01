import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";

const SearchPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/explore?search=${encodeURIComponent(query)}`);
  };

  // Reusable CategorySection inside the same file
  const CategorySection = ({ title, recipes = [], filterQuery }) => (
    <section className="mb-8 px-4 w-full max-w-5xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-green-700">{title}</h2>
        <button
          onClick={() => navigate(`/explore?search=${encodeURIComponent(filterQuery)}`)}
          className="text-green-600 hover:underline text-sm"
        >
          See All →
        </button>
      </div>
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {recipes.length === 0 ? (
          <p className="text-gray-500">No recipes available.</p>
        ) : (
          recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="min-w-[150px] rounded-lg shadow-md bg-white overflow-hidden cursor-pointer hover:shadow-lg transition"
              onClick={() => navigate(`/recipe/${recipe.id}`)} // example route for details
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-24 object-cover"
              />
              <div className="p-2">
                <h3 className="text-sm font-medium text-gray-800 truncate">
                  {recipe.title}
                </h3>
                {recipe.readyInMinutes && (
                  <p className="text-xs text-gray-500 mt-1">
                    {recipe.readyInMinutes} mins
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );

  // Dummy example data, replace with API fetched recipes
  const popularRecipes = [
    { id: 1, title: "Spaghetti Carbonara", image: "/images/spaghetti.jpg", readyInMinutes: 30 },
    { id: 2, title: "Chicken Teriyaki", image: "/images/teriyaki.jpg", readyInMinutes: 25 },
    { id: 3, title: "Avocado Toast", image: "/images/avocado-toast.jpg", readyInMinutes: 10 },
  ];

  const favoriteRecipes = [
    { id: 4, title: "Beef Stroganoff", image: "/images/stroganoff.jpg", readyInMinutes: 40 },
    { id: 5, title: "Caesar Salad", image: "/images/caesar-salad.jpg", readyInMinutes: 15 },
  ];

  const recommendedRecipes = [
    { id: 6, title: "Pad Thai", image: "/images/pad-thai.jpg", readyInMinutes: 35 },
    { id: 7, title: "Tacos", image: "/images/tacos.jpg", readyInMinutes: 20 },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-16 flex flex-col items-center bg-gradient-to-br from-green-100 to-green-300 px-4">
        <h1 className="text-4xl font-bold text-green-800 mb-4">
          Find Your Next Favorite Recipe
        </h1>
        <p className="text-gray-700 text-center mb-8 max-w-md">
          Search by ingredients, cuisine, or a short description. Try something like{" "}
          <i>“spicy chicken stir fry”</i>.
        </p>

        <form onSubmit={handleSearch} className="w-full max-w-xl mb-8">
          <div className="flex items-center bg-white rounded-full shadow-md overflow-hidden">
            <input
              type="text"
              placeholder="Search recipes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow px-4 py-3 text-gray-700 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 hover:bg-green-700 transition"
            >
              Search
            </button>
          </div>
        </form>

        <CategorySection
          title="Popular Recipes"
          recipes={popularRecipes}
          filterQuery="popular"
        />
        <CategorySection
          title="Favorites"
          recipes={favoriteRecipes}
          filterQuery="favorites"
        />
        <CategorySection
          title="Recommended"
          recipes={recommendedRecipes}
          filterQuery="recommended"
        />
      </div>
    </>
  );
};

export default SearchPage;
