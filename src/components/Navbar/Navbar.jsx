import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import MenuLinks from "./MenuLinks";
import logo from '../../assets/recipez-logo.png';
import UserContext from "../../context/UserContext";

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-green-800 shadow-lg border-b border-green-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/landing"
                        className="flex items-center gap-3 text-2xl font-extrabold text-white tracking-tight hover:opacity-90 transition-opacity"
                        onClick={() => setShowMenu(false)}>
                        <img src={logo} alt="Recipez logo" className="h-10 w-auto rounded-lg shadow-sm border border-white/30 bg-white/10 p-1" />
                        <span className="hidden sm:inline-block">Recipez</span>
                    </Link>

                    {/* Options */}
                    <ul className="hidden md:flex space-x-8 text-white font-medium">
                        <MenuLinks setShowMenu={setShowMenu}/>
                    </ul>

                    {/* Menu Button*/}
                    <button
                        className="md:hidden cursor-pointer focus:ring-2 focus:ring-white rounded-lg p-2 bg-green-800/80 hover:bg-green-900 transition-colors"
                        onClick={() => setShowMenu(!showMenu)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>

                {/* Options menu */}
                <div className={`md:hidden transition-all duration-300 ${showMenu ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <div className="bg-green-800 border-t border-green-900">
                        <ul className="flex flex-col space-y-2 px-4 py-3 text-white font-medium">
                            <MenuLinks setShowMenu={setShowMenu}/>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
