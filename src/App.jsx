import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from './pages/Landing/LandingPage.jsx';
import LoginPage from './pages/Login/LoginPage.jsx';
import SignUpPage from './pages/SignUp/SignUpPage.jsx';
import ExplorePage from './pages/Explore/ExplorePage.jsx';
import SearchPage from './pages/Explore/SearchPage.jsx';

function App() {
    return (
        <Routes>
            <Route path="/" element={ <Navigate to="/landing" /> } />
            <Route path="/landing" element={ <LandingPage />} />
            <Route path="/login" element={ <LoginPage /> } />
            <Route path="/signup" element={ <SignUpPage /> } />
            <Route path="/explore" element={ <ExplorePage /> } />
            <Route path="/search" element={ <SearchPage /> } />
            <Route path="/favorites" element={ <LoginPage /> } />
        </Routes>
    )
}

export default App
