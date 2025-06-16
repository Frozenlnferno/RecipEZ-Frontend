import './App.css';

import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/Login/LoginPage.jsx';
import SignUpPage from './pages/SignUp/SignUpPage.jsx';

function App() {
    return (
        <Routes>
            <Route path="/login" element={ <LoginPage /> } />
            <Route path="/signup" element={ <SignUpPage /> } />
        </Routes>
    )
}

export default App
