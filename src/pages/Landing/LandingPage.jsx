import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.jsx";

const LandingPage = () => {
    return (
        <> 
            <Navbar />
            <div className="pt-16 bg-gradient-to-br from-orange-50 via-green-50 to-white flex flex-col min-h-screen">
                {/* Hero Section */}
                <header className="flex flex-col justify-center items-center px-6 min-h-screen text-center bg-gradient-to-b from-white via-green-100 to-green-200 shadow-lg">
                    <h1 className="text-7xl md:text-8xl font-extrabold text-green-700 drop-shadow-lg mb-4 tracking-tight">
                        RecipEZ
                    </h1>
                    <p className="mt-2 text-xl md:text-2xl text-gray-700 font-medium max-w-2xl mx-auto">
                        Find your next favorite meal — quick, easy, and delicious.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-6">
                        <Link
                            to="/search"
                            className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow hover:bg-green-700 transition"
                        >
                            🍳 Explore Recipes
                        </Link>
                        <Link
                            to="/signup"
                            className="border-2 border-green-600 text-green-700 px-8 py-3 rounded-xl font-semibold text-lg shadow hover:bg-green-100 transition"
                        >
                            ✍️ Sign Up
                        </Link>
                    </div>
                </header>

                {/* Features */}
                <section className="flex flex-col md:flex-row justify-center px-8 py-16 gap-8 bg-white/80 rounded-xl shadow-lg mx-4 mt-8">
                    <div className="flex-1 text-center bg-white rounded-xl shadow p-8 border border-green-100">
                        <h2 className="text-3xl font-bold text-green-700 mb-2 flex items-center justify-center gap-2">🔍 <span>Smart Search</span></h2>
                        <p className="mt-2 text-gray-600 text-lg">Filter by ingredients, time, diet, and more.</p>
                    </div>
                    <div className="flex-1 text-center bg-white rounded-xl shadow p-8 border border-green-100">
                        <h2 className="text-3xl font-bold text-green-700 mb-2 flex items-center justify-center gap-2">❤️ <span>Favorites</span></h2>
                        <p className="mt-2 text-gray-600 text-lg">Save recipes you love and access them anytime.</p>
                    </div>
                    <div className="flex-1 text-center bg-white rounded-xl shadow p-8 border border-green-100">
                        <h2 className="text-3xl font-bold text-green-700 mb-2 flex items-center justify-center gap-2">🎲 <span>Surprise Me</span></h2>
                        <p className="mt-2 text-gray-600 text-lg">Not sure what to cook? Let us pick one for you!</p>
                    </div>
                </section>

                {/* Final CTA */}
                <footer className="text-center py-12 bg-green-50 mt-8 shadow-inner">
                    <p className="text-gray-700 mb-6 text-xl font-semibold">Ready to get cooking?</p>
                    <Link
                        to="/signup"
                        className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold text-lg shadow hover:bg-green-700 transition"
                    >
                        🚀 Get Started Free
                    </Link>
                </footer>
            </div>
        </>
    );
}

export default LandingPage;

