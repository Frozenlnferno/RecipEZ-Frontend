import Navbar from '../../components/Navbar/Navbar.jsx';
import SignUp from '../../components/auth/SignUp.jsx';

const SignUpPage = () => {
    return (
        <>
            <Navbar />
            <div className="pt-16">
                <SignUp />
            </div>
        </>
    );
}

export default SignUpPage;