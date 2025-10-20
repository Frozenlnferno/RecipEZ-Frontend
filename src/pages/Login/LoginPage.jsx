import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import Navbar from '../../components/Navbar/Navbar.jsx';
import Login from '../../components/auth/Login.jsx';
import { UserContext } from '../../context/UserContext.jsx';

const env = import.meta.env

const LoginPage = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    const handleLogin = async (inputEmail, inputPassword, setError) => {
        try {
            const res = await fetch(`${env.VITE_SERVER_ORIGIN}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: inputEmail, password: inputPassword }) // match backend keys
            });

            const data = await res.json();

            // Handle invalid credentials or missing token
            if (!res.ok || !data.token) {
                setError(data.error || "Invalid email or password!");
                return false;
            }

            // ✅ Store token and user info locally
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            // ✅ Update context state
            setUser(data.user);

            setError("");
            navigate("/search");
            return true;
        } catch (err) {
            setError("Internal server error.");
            console.error("Login error:", err);
            return false;
        } finally {
            console.log("Current User:", user);
        }
    };

    
    return (
        <>
            <Navbar />
            <div className="pt-16">
                <Login handleLogin={handleLogin}/>
            </div>
        </>
    );
}

export default LoginPage;