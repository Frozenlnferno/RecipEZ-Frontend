import { useNavigate } from 'react-router-dom';
import { useContext } from "react";

import Navbar from '../../components/Navbar/Navbar.jsx';
import SignUp from '../../components/auth/SignUp.jsx';
import { UserContext } from '../../context/UserContext.jsx';

const env = import.meta.env;

const SignUpPage = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSignUp = async (email, name, password, setError) => {
    try {
      const res = await fetch(`${env.VITE_SERVER_ORIGIN}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, password })
      });

      const data = await res.json();

      // Backend should respond with { token, user: { id, name, email } }
      if (!res.ok || !data.token || !data.user) {
        setError(data.error || "An account with this email may already exist.");
        return false;
      }

      // ✅ Save token and user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ Update context
      setUser(data.user);

      setError("");
      navigate("/search");
      return true;
    } catch (err) {
      console.error("Signup error:", err);
      setError("Server error. Please try again.");
      return false;
    }
  };

  return (
    <>
      <Navbar />
      <div className="pt-16">
        <SignUp handleSignUp={handleSignUp} />
      </div>
    </>
  );
};

export default SignUpPage;
