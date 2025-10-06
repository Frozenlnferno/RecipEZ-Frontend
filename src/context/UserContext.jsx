import { useState, useEffect, createContext } from "react";

const UserContext = createContext();
const env = import.meta.env

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [favorites, setFavorites] = useState([]);
    const [favoritesLoading, setFavoritesLoading] = useState(false);
    const [favoritesError, setFavoritesError] = useState(null);
    
    // Updates user object accordingly
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            // load favorites when a user is present
            (async () => {
                setFavoritesLoading(true);
                setFavoritesError(null);
                try {
                    const res = await fetch(`${env.VITE_SERVER_ORIGIN}/db/get_favorites`, {
                        method: "post",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ id: user.id }),
                    });
                    if (res.ok) {
                        const data = await res.json();
                        // data is expected to be an array of favorites, each with `id` for recipe id
                        setFavorites(data || []);
                    } else {
                        const text = await res.text();
                        setFavoritesError(text || 'Failed to load favorites');
                    }
                } catch (err) {
                    console.error('Failed to load favorites', err);
                    setFavoritesError(String(err));
                } finally {
                    setFavoritesLoading(false);
                }
            })();
        } else {
            localStorage.removeItem("user");
            setFavorites([]);
            setFavoritesLoading(false);
            setFavoritesError(null);
        }
    }, [user]);

    const setFavorite = async ({ recipe_id, recipe_title, recipe_image }) => {
        if (!user) { return; }

        // optimistic update
        const newFav = { id: recipe_id, user_id: user.id, recipe_title, recipe_image };
        setFavorites((prev) => {
            // avoid duplicates
            if (prev.some((f) => f.id === recipe_id)) return prev;
            return [...prev, newFav];
        });

        try {
            const res = await fetch(`${env.VITE_SERVER_ORIGIN}/db/add_favorite`, {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: user.id, recipe_id, recipe_title, recipe_image }),
            });
            const data = await res.json();
            console.log(data);
        } catch (err) {
            console.error(err);
            // rollback optimistic update on error
            setFavorites((prev) => prev.filter((f) => f.id !== recipe_id));
        }
    };

    const removeFavorite = async ({ recipe_id }) => {
        if (!user) { return; }

        // optimistic remove
        setFavorites((prev) => prev.filter((f) => f.id !== recipe_id));

        try {
            const res = await fetch(`${env.VITE_SERVER_ORIGIN}/db/remove_favorite`, {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: user.id, recipe_id }),
            });
            const data = await res.json();
            console.log(data);
        } catch (err) {
            console.error(err);
            // rollback (best-effort) by re-fetching favorites
            try {
                const res2 = await fetch(`${env.VITE_SERVER_ORIGIN}/db/get_favorites`, {
                    method: "post",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: user.id }),
                });
                if (res2.ok) setFavorites(await res2.json());
            } catch (e) {
                console.error('Failed to reload favorites after remove error', e);
            }
        }
    };

    const getFavorite = async () => {
        if (!user) { return []; }

        try {
            setFavoritesLoading(true);
            setFavoritesError(null);
            const res = await fetch(`${env.VITE_SERVER_ORIGIN}/db/get_favorites`, {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: user.id }),
            });
            if (!res.ok) {
                const txt = await res.text();
                setFavoritesError(txt || 'Failed to load favorites');
                return [];
            }
            const data = await res.json();
            console.log(data);
            setFavorites(data || []);
            return data;
        } catch (err) {
            console.error(err);
            setFavoritesError(String(err));
            return [];
        }
        finally {
            setFavoritesLoading(false);
        }
    };

    const isFavorited = (recipeId) => {
        return favorites.some((f) => String(f.id) === String(recipeId));
    };

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            favorites,
            favoritesLoading,
            favoritesError,
            setFavorite,
            removeFavorite,
            getFavorite,
            isFavorited,
        }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider};