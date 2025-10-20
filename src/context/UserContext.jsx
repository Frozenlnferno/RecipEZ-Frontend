import { useState, useEffect, createContext } from "react";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();
const env = import.meta.env;

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [favorites, setFavorites] = useState([]);
  const [favoritesLoading, setFavoritesLoading] = useState(false);
  const [favoritesError, setFavoritesError] = useState(null);

  // --- JWT Helpers ---
  const getToken = () => localStorage.getItem("token");

  const isTokenValid = () => {
    const token = getToken();
    if (!token) return false;
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  };

  // Fetch wrapper that automatically adds token and handles expiration
  const authorizedFetch = async (url, options = {}) => {
    const token = getToken();
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const res = await fetch(url, { ...options, headers });

    // Auto-logout if token invalid or expired
    if (res.status === 401 || res.status === 403) {
      logout();
      throw new Error("Session expired. Please log in again.");
    }

    return res;
  };

  // --- Logout function ---
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setFavorites([]);
    setFavoritesLoading(false);
    setFavoritesError(null);
  };

  // --- Load favorites when user logs in ---
  useEffect(() => {
    if (user && isTokenValid()) {
      localStorage.setItem("user", JSON.stringify(user));

      (async () => {
        setFavoritesLoading(true);
        setFavoritesError(null);
        try {
          const res = await authorizedFetch(`${env.VITE_SERVER_ORIGIN}/db/get_favorites`, {
            method: "POST",
            body: JSON.stringify({}), // user ID now comes from token
          });
          if (res.ok) {
            const data = await res.json();
            setFavorites(data || []);
          } else {
            const text = await res.text();
            setFavoritesError(text || "Failed to load favorites");
          }
        } catch (err) {
          console.error("Failed to load favorites", err);
          setFavoritesError(String(err));
        } finally {
          setFavoritesLoading(false);
        }
      })();
    } else {
      logout(); // clear state if no user or invalid token
    }
  }, [user]);

  // --- Favorites ---
  const setFavorite = async ({ recipe_id, recipe_title, recipe_image }) => {
    if (!user) return;

    const newFav = { id: recipe_id, recipe_title, recipe_image };
    setFavorites((prev) => {
      if (prev.some((f) => f.id === recipe_id)) return prev;
      return [...prev, newFav];
    });

    try {
      const res = await authorizedFetch(`${env.VITE_SERVER_ORIGIN}/db/add_favorite`, {
        method: "POST",
        body: JSON.stringify({ recipe_id, recipe_title, recipe_image }),
      });
      console.log(await res.json());
    } catch (err) {
      console.error(err);
      setFavorites((prev) => prev.filter((f) => f.id !== recipe_id));
    }
  };

  const removeFavorite = async ({ recipe_id }) => {
    if (!user) return;
    setFavorites((prev) => prev.filter((f) => f.id !== recipe_id));

    try {
      const res = await authorizedFetch(`${env.VITE_SERVER_ORIGIN}/db/remove_favorite`, {
        method: "POST",
        body: JSON.stringify({ recipe_id }),
      });
      console.log(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const getFavorite = async () => {
    if (!user) return [];
    try {
      setFavoritesLoading(true);
      setFavoritesError(null);
      const res = await authorizedFetch(`${env.VITE_SERVER_ORIGIN}/db/get_favorites`, {
        method: "POST",
        body: JSON.stringify({}),
      });
      if (!res.ok) {
        const txt = await res.text();
        setFavoritesError(txt || "Failed to load favorites");
        return [];
      }
      const data = await res.json();
      setFavorites(data || []);
      return data;
    } catch (err) {
      console.error(err);
      setFavoritesError(String(err));
      return [];
    } finally {
      setFavoritesLoading(false);
    }
  };

  const isFavorited = (recipeId) => favorites.some((f) => String(f.id) === String(recipeId));

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        favorites,
        favoritesLoading,
        favoritesError,
        setFavorite,
        removeFavorite,
        getFavorite,
        isFavorited,
        logout, // ✅ exposed for Navbar/Menu
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
