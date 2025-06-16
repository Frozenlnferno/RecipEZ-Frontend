import Navbar from '../../components/Navbar/Navbar.jsx';
import Login from '../../components/auth/Login.jsx';

const LoginPage = () => {
    return (
        <>
            <Navbar />
            <div className="pt-16">
                <Login />
            </div>
        </>
    );
}

export default LoginPage;