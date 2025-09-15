import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const MenuLinks = ({ setShowMenu }) => {
    const { user, setUser } = useContext(UserContext);

    return (
        <>
            <li><Link to="/search" className="highlight" onClick={() => setShowMenu(false)}> Explore </Link></li>
            <li><Link to="/favorites" className="highlight" onClick={() => setShowMenu(false)}> Favorites </Link></li>
            {!user &&
                <>
                    <li><Link to="/login" className="highlight" onClick={() => setShowMenu(false)}> Login </Link></li>
                    <li><Link to="/signup" className="highlight" onClick={() => setShowMenu(false)}> Sign Up </Link></li>
                </>
            }
            {user &&
                <>
                    <li>
                        <Link to="/login" className="highlight" 
                            onClick={() => {
                                    setShowMenu(false);
                                    setUser(null);
                                    console.log("Log ", user, " out");
                                }
                            }> 
                                Log Out 
                        </Link>
                    </li>
                    <li><Link to="/settings" className="highlight" onClick={() => setShowMenu(false)}> Settings </Link></li>
                </>
            }
        </>
    )
}

export default MenuLinks;