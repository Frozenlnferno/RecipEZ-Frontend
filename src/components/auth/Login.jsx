import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ handleLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); {/* Will only be true if not nothing */}

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(email, password, setError);
    };

    const closeError = () => {
        setError('');
    };

    return (
        <div className="flex min-h-screen items-center justify-center flex-col bg-gradient-to-br from-green-50 via-green-100 to-green-200">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-green-100"
            >
                <h2 className="text-3xl font-extrabold text-center mb-6 text-green-700 flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="green" strokeWidth={2} className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 12A4 4 0 1 1 8 12a4 4 0 0 1 8 0Zm2 6a6 6 0 1 0-12 0h12Z" />
                    </svg>
                    Login to Recipez
                </h2>

                {error &&
                    <div className="flex items-center justify-between mb-4 py-2 px-4 rounded-md bg-green-50 border border-green-300 text-green-700 font-medium shadow-sm animate-shake">
                        <span className="truncate">{error}</span>
                        <button
                            type="button"
                            onClick={closeError}
                            className="ml-2 text-green-700 hover:text-green-900 font-bold focus:outline-none rounded-full px-2 py-1 transition-colors"
                            aria-label="Close alert"
                        >
                            ×
                        </button>
                    </div>
                }

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1 text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 bg-green-50 placeholder-gray-400 transition-all"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-semibold mb-1 text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 bg-green-50 placeholder-gray-400 transition-all"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg shadow transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                    Login
                </button>
            </form>
            <div className="text-center mt-6 text-gray-700">
                New to Recipez?{' '}
                <Link to="/signup" className="text-green-700 hover:underline font-bold">
                    Sign up here
                </Link>
            </div>
        </div>
    );
};

export default Login;
