import { useNavigate } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar.jsx';
import Login from '../../components/auth/Login.jsx';

const env = import.meta.env

const LoginPage = () => {
    const navigate = useNavigate();
    const handleLogin = async (email, password, setError) => {
        try {
            const res = await fetch(`${env.VITE_SERVER_ORIGIN}/auth/login`, {
                method: "post",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ email, password })
            });

            // Checks if login was successful
            const user = await res.json();
            console.log(user);
            if (!user.email) {
                setError("Invalid username or password!");
                return false;
            }

            //Logs in if successful
            setError("");
            navigate("/search");
            return true;
        } catch (err) {
            setError("Internal server error.");
            console.log("Error: ", err);
            return false;
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