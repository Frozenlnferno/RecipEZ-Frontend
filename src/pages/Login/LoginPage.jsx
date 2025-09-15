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
                method: "post",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ inputEmail, inputPassword })
            });

            // Checks if login was successful
            const loggedin_user = await res.json();
            if (!loggedin_user.id) {
                setError("Invalid username or password!");
                return false;
            }

            //Logs in if successful
            setUser(loggedin_user);
            setError("");
            navigate("/search");
            return true;
        } catch (err) {
            setError("Internal server error.");
            console.log("Error: ", err);
            return false;
        } finally {
            console.log("Current User: ", user);
        }
    }
    
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