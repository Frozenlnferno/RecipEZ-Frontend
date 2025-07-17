import { useNavigate } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar.jsx';
import SignUp from '../../components/auth/SignUp.jsx';

const env = import.meta.env;

const SignUpPage = () => {
    const navigate = useNavigate();
    const handleSignUp = async (email, name, password, setError) => {
        try {
            const res = await fetch(`${env.VITE_SERVER_ORIGIN}/auth/signup`, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email, name, password })
            });

            // Checks if new user is valid
            const user = await res.json();
            if (!user.id) {
                setError("An account with this email already exists.");
                return false;
            }
            
            setError("");
            navigate("/search");
            return true;
        } catch (err) {
            setError("Server error. Please try again.");
            console.log("Error: ", err);
            return false;
        }
    }

    return (
        <>
            <Navbar />
            <div className="pt-16">
                <SignUp handleSignUp={handleSignUp}/>
            </div>
        </>
    );
}

export default SignUpPage;