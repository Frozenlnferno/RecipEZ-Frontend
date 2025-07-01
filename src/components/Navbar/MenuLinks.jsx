import { Link } from "react-router-dom";

const MenuLinks = ({ loggedIn, setShowMenu }) => {
    return (
        <>
            <li><Link to="/search" className="highlight" onClick={() => setShowMenu(false)}> Explore </Link></li>
            <li><Link to="/favorites" className="highlight" onClick={() => setShowMenu(false)}> Favorites </Link></li>
            {!loggedIn &&
                <>
                    <li><Link to="/login" className="highlight" onClick={() => setShowMenu(false)}> Login </Link></li>
                    <li><Link to="/signup" className="highlight" onClick={() => setShowMenu(false)}> Sign Up </Link></li>
                </>
            }
            {loggedIn &&
                <>
                    <li><Link to="/login" className="highlight" onClick={() => setShowMenu(false)}> Log Out </Link></li>
                    <li><Link to="/settings" className="highlight" onClick={() => setShowMenu(false)}> Settings </Link></li>
                </>
            }
        </>
    )
}

export default MenuLinks;