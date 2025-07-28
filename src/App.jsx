import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from './pages/Landing/LandingPage.jsx';
import LoginPage from './pages/Login/LoginPage.jsx';
import SignUpPage from './pages/SignUp/SignUpPage.jsx';
import ResultsPage from './pages/Explore/ResultsPage.jsx';
import SearchPage from './pages/Explore/SearchPage.jsx';
import PopularPage from './pages/RecipeSection/PopularPage.jsx';
import RecipePage from './pages/RecipeSection/RecipePage.jsx';

function App() {
    return (
        <Routes>
            <Route path="/" element={ <Navigate to="/landing" /> } />
            <Route path="/landing" element={ <LandingPage />} />
            <Route path="/login" element={ <LoginPage /> } />
            <Route path="/signup" element={ <SignUpPage /> } />
            <Route path="/results" element={ <ResultsPage /> } />
            <Route path="/search" element={ <SearchPage /> } />
            <Route path="/recipes/:id" element={ <RecipePage /> } />
            <Route path="/favorites" element={ <PopularPage /> } />
            <Route path="/popular" element={ <PopularPage /> } />
        </Routes>
    )
}

export default App
