import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar.jsx";
import CardGrid from "../../components/Recipe/CardGrid.jsx";
import Loading from "../../components/loading/Loading.jsx";

import { UserContext } from "../../context/UserContext.jsx";

const env = import.meta.env;

const FavoritesPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);

  const [recipeList, setRecipeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getList = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");

        if (!token || !user) {
          setError("You must be logged in to view favorites.");
          setLoading(false);
          return;
        }

        const response = await fetch(`${env.VITE_SERVER_ORIGIN}/db/get_favorites`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({}), // user ID no longer needed
        });

        if (response.status === 401 || response.status === 403) {
          // Token invalid or expired — auto logout
          logout();
          navigate("/login");
          return;
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch recipes: ${response.status}`);
        }

        const data = await response.json();
        setRecipeList(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching favorites:", err);
        setError(`Could not load recipes. ${err.message || err}`);
      } finally {
        setLoading(false);
      }
    };

    getList();
  }, [user, logout, navigate]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col pt-16 w-full min-h-screen">
        <header className="p-8 mb-4 bg-white shadow-lg flex flex-col items-center mx-auto w-full">
          <h1 className="font-extrabold text-3xl text-orange-700 mb-2 drop-shadow-sm text-center flex items-center gap-2">
            <span role="img" aria-label="star">⭐</span> Favorites
          </h1>
          <div className="text-lg text-gray-700 text-center">
            <Loading
              isLoading={loading}
              error={error}
              mainText={"Loading recipes..."}
              subText={""}
              loadingType={"small"}
              errorComp={<div className="text-red-500 font-semibold">{error}</div>}
              loadedComp={
                <div className="text-orange-600 font-semibold">
                  {user ? recipeList.length : "0"} recipes shown
                </div>
              }
            />
          </div>
        </header>

        <main className="p-5 mx-auto max-w-5xl w-full">
          <Loading
            isLoading={loading}
            error={error}
            mainText={"Loading your favorite recipes..."}
            subText={"Please wait a moment!"}
            loadingType={"big"}
            errorComp={<span className="text-red-500 font-semibold">{error}</span>}
            loadedComp={
              user ? (
                <CardGrid recipeList={recipeList} />
              ) : (
                <div className="text-gray-600 font-medium">
                  You must log in to view your favorited recipes.
                </div>
              )
            }
          />
        </main>
      </div>
    </>
  );
};

export default FavoritesPage;
