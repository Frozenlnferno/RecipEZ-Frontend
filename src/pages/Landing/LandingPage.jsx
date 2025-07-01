import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.jsx";

const LandingPage = () => {
    return (
        <>
            <Navbar />
            <div className="pt-16 bg-orange-50 flex flex-col">
                {/* Hero Section */}
                <header className="flex flex-col justify-center px-6 py-1 min-h-screen text-center bg-gradient-to-b from-white-100 to-green-200">
                    <h1 className="text-7xl font-bold text-green-700">RecipEZ</h1>
                    <p className="mt-2 text-lg text-gray-600">
                    Find your next favorite meal — quick, easy, and delicious.
                    </p>
                    <div className="mt-6 flex justify-center gap-4">
                    <Link
                        to="/explore"
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                        Explore Recipes
                    </Link>
                    <Link
                        to="/signup"
                        className="border border-green-600 text-green-700 px-6 py-2 rounded-lg hover:bg-green-100 transition"
                    >
                        Sign Up
                    </Link>
                    </div>
                </header>

                {/* Features */}
                <section className="flex flex-col md:flex-row justify-around px-8 py-12 gap-8 bg-white">
                    <div className="text-center">
                    <h2 className="text-2xl font-semibold text-green-700">🔍 Smart Search</h2>
                    <p className="mt-2 text-gray-600">Filter by ingredients, time, diet, and more.</p>
                    </div>
                    <div className="text-center">
                    <h2 className="text-2xl font-semibold text-green-700">❤️ Favorites</h2>
                    <p className="mt-2 text-gray-600">Save recipes you love and access them anytime.</p>
                    </div>
                    <div className="text-center">
                    <h2 className="text-2xl font-semibold text-green-700">🎲 Surprise Me</h2>
                    <p className="mt-2 text-gray-600">Not sure what to cook? Let us pick one for you!</p>
                    </div>
                </section>

                {/* Final CTA */}
                <footer className="text-center py-8 bg-green-50">
                    <p className="text-gray-700 mb-4">Ready to get cooking?</p>
                    <Link
                    to="/signup"
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                    Get Started Free
                    </Link>
                </footer>
            </div> 
        </>
    );
}

export default LandingPage;

