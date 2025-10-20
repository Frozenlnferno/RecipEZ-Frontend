import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.jsx";

const LandingPage = () => {
    return (
        <>
            <Navbar />
            <div className="pt-16 bg-gradient-to-br from-orange-50 via-green-50 to-white flex flex-col min-h-screen">
                {/* Hero Section */}
                <header className="flex flex-col justify-center items-center px-6 min-h-screen text-center bg-gradient-to-b from-white via-green-100 to-green-200 shadow-lg">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-7xl md:text-8xl font-extrabold text-green-700 drop-shadow-xl mb-6 tracking-tight leading-tight">
                            RecipEZ
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-700 font-medium mb-10">
                            Discover, save, and cook meals that fit your taste — all in one place.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Link
                                to="/search"
                                className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow hover:bg-green-700 hover:scale-105 transition-transform"
                            >
                                🍳 Explore Recipes
                            </Link>
                            <Link
                                to="/signup"
                                className="border-2 border-green-600 text-green-700 px-8 py-3 rounded-xl font-semibold text-lg shadow hover:bg-green-100 hover:scale-105 transition-transform"
                            >
                                ✍️ Sign Up
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Features Section */}
                <section className="px-8 py-20 bg-white/70 mx-4 mt-12 rounded-2xl shadow-lg backdrop-blur-sm">
                    <h2 className="text-4xl font-extrabold text-center text-green-700 mb-12">
                        Why Choose RecipEZ?
                    </h2>
                    <div className="flex flex-col md:flex-row justify-center gap-8">
                        {/* Smart Search */}
                        <div className="flex-1 text-center bg-white rounded-2xl shadow-md p-10 border border-green-100 hover:shadow-xl hover:-translate-y-1 transition">
                            <h3 className="text-3xl font-bold text-green-700 mb-3 flex items-center justify-center gap-2">
                                🔍 <span>Smart Search</span>
                            </h3>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Filter by ingredients, prep time, or dietary needs to find meals that match your lifestyle.
                            </p>
                        </div>

                        {/* Favorites */}
                        <div className="flex-1 text-center bg-white rounded-2xl shadow-md p-10 border border-green-100 hover:shadow-xl hover:-translate-y-1 transition">
                            <h3 className="text-3xl font-bold text-green-700 mb-3 flex items-center justify-center gap-2">
                                ❤️ <span>Favorites</span>
                            </h3>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Save your go-to recipes and easily revisit them whenever you’re ready to cook again.
                            </p>
                        </div>

                        {/* Recommendations */}
                        <div className="flex-1 text-center bg-white rounded-2xl shadow-md p-10 border border-green-100 hover:shadow-xl hover:-translate-y-1 transition">
                            <h3 className="text-3xl font-bold text-green-700 mb-3 flex items-center justify-center gap-2">
                                🌿 <span>Recommendations</span>
                            </h3>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Get personalized suggestions based on what you’ve saved — cooking made easier.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <footer className="text-center py-16 bg-green-50 mt-12 shadow-inner rounded-t-3xl">
                    <h3 className="text-3xl font-extrabold text-green-700 mb-4">
                        Ready to get cooking?
                    </h3>
                    <p className="text-gray-700 mb-8 text-lg max-w-xl mx-auto">
                        Join RecipEZ today and start discovering thousands of easy, healthy, and flavorful recipes.
                    </p>
                    <Link
                        to="/signup"
                        className="bg-green-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-green-700 hover:scale-105 transition-transform"
                    >
                        🚀 Get Started Free
                    </Link>
                </footer>
            </div>
        </>
    );
};

export default LandingPage;
