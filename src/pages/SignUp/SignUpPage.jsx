import { Navigate } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar.jsx';
import SignUp from '../../components/auth/SignUp.jsx';

const env = process.env;

const SignUpPage = () => {
    const handleSignUp = async ({ email, name, password }) => {
        try {
            const response = await fetch(`${env.SERVER_ORIGIN}/auth/signin`, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: inputEmail,
                    password: inputPassword
                })
            })
            const data = await response.json();

            if (!data.id) { throw new Error("Failed to sign up."); }

        } catch (err) {
            console.log(err);
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