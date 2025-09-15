import { useState, useEffect, createContext } from "react";

const UserContext = createContext();
const env = import.meta.env

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    
    // Updates user object accordingly
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    const setFavorite = async ({ recipe_id, recipe_title, recipe_image }) => {
        if (!user) { return; } 

        try {
            const res = await fetch(`${env.VITE_SERVER_ORIGIN}/db/add_favorite`, {
                method: "post",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ user_id: user.id, recipe_id, recipe_title, recipe_image })
            });
            const data = await res.json();
            console.log(data);
        } catch (err) {
            console.error(err);
        }
    }

    const removeFavorite = async ({ recipe_id }) => {
        if (!user) { return; } 

        try {
            const res = await fetch(`${env.VITE_SERVER_ORIGIN}/db/remove_favorite`, {
                method: "post",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ user_id: user.id, recipe_id})
            });
            const data = await res.json();
            console.log(data);
        } catch (err) {
            console.error(err);
        }
    }

    const getFavorite = async () => {
        if (!user) { return; }

        try {
            const res = await fetch(`${env.VITE_SERVER_ORIGIN}/db/get_favorites`, {
                method: "post",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ id: user.id })
            });
            const data = await res.json();
            console.log(data);
            return data;
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <UserContext.Provider value={{ 
                user, 
                setUser,
                setFavorite,
                removeFavorite,
                getFavorite
            }}>
                {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider};