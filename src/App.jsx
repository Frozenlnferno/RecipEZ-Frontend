import './App.css';
import { useState } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from './pages/Landing/LandingPage.jsx';
import LoginPage from './pages/Login/LoginPage.jsx';
import SignUpPage from './pages/SignUp/SignUpPage.jsx';
import ResultsPage from './pages/Explore/ResultsPage.jsx';
import SearchPage from './pages/Explore/SearchPage.jsx';
import PopularPage from './pages/RecipeSection/PopularPage.jsx';
import FavoritesPage from './pages/RecipeSection/FavoritesPage.jsx';
import RecipePage from './pages/RecipeSection/RecipePage.jsx';

function App() {
    const [filters, setFilters] = useState({
        type: "",            // string or array for meal type
        cuisine: [],         // array for multiple cuisines
        diet: [],            // array for multiple diets
        intolerances: [],    // array for intolerances
        maxReadyTime: 0,     // number (minutes)
    });

    return (
        <Routes>
            <Route path="/" element={ <Navigate to="/landing" /> } />
            <Route path="/landing" element={ <LandingPage />} />
            <Route path="/login" element={ <LoginPage /> } />
            <Route path="/signup" element={ <SignUpPage /> } />
            <Route path="/results" element={ <ResultsPage filters={filters} setFilters={setFilters} /> } />
            <Route path="/search" element={ <SearchPage filters={filters} setFilters={setFilters} /> } />
            <Route path="/recipes/:id" element={ <RecipePage /> } />
            <Route path="/favorites" element={ <FavoritesPage /> } />
            <Route path="/popular" element={ <PopularPage /> } />
        </Routes>
    )
}

export default App
