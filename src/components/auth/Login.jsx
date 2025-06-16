import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); {/* Will only be true if not nothing */}

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Email:', email);
        console.log('Password:', password);
    };

    const closeError = () => {
        setError('');
    };

    return (
        <div className="flex min-h-screen items-center justify-center flex-col bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm"
                >
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Login to Recipez
                </h2>

                {error &&
                    <div className="flex items-center justify-between mb-3 py-2 px-4 rounded-md bg-red-100 border border-red-400 text-red-700 font-medium">
                        {error === "200" &&
                            <p>
                                Incorrect username or password.
                            </p>
                        }
                        {error === "500" &&
                            <p>
                                Internal server error.
                            </p>
                        }
                        <button
                            type="button"
                            onClick={closeError}
                            className=" text-red-700 hover:text-red-900 font-bold focus:outline-none"
                            aria-label="Close alert"
                        >
                            ×
                        </button>
                    </div>
                }
                
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        className="w-full px-4 py-2 border-gray-600 border-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        className="w-full px-4 py-2 border-gray-600 border-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#58B368] hover:bg-[#396441] text-white font-semibold py-2 rounded-lg transition duration-200"
                >
                    Login
                </button>
            </form>
            <div className="text-center mt-4 text-gray-600">
                New to Recipez?{' '}
                <Link to="/signup" className="text-green-main hover:underline font-semibold">
                    Sign up here
                </Link>
            </div>
        </div>
    );
};

export default Login;
