import { useState } from "react";
import { Link } from "react-router-dom";
import MenuLinks from "./MenuLinks";
import logo from '../../assets/recipez-logo.png';

const Navbar = ({ loggedIn }) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <nav className="fixed top-0 left-0 bg-green-1 w-full z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" 
                        className="flex items-center space-x-2 text-2xl font-bold text-white"
                        onClick={() => setShowMenu(false)}> 
                            <img src={logo} className="logo" style={{ height: '40px', width: 'auto' }}/>
                            <p>RecipEZ</p> 
                    </Link>

                    {/* Options */}
                    <ul className="hidden md:flex space-x-8 text-white font-medium">
                        <MenuLinks loggedIn={loggedIn} setShowMenu={setShowMenu}/>
                    </ul>

                    {/* Menu Button*/}
                    <button 
                        className="md:hidden cursor-pointer focus:ring-2 focus:ring-white"
                        onClick={() => setShowMenu(!showMenu)} > 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>

                {/* Options menu */}
                {showMenu && 
                    <div className="md:hidden bg-green-1 border-t border-gray-200">
                        <ul className="flex flex-col space-y-2 px-4 py-3 text-white font-medium">
                            <MenuLinks loggedIn={loggedIn} setShowMenu={setShowMenu}/>
                        </ul>
                    </div>
                }
            </div>
        </nav>
    );
}

export default Navbar;
