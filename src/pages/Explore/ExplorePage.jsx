import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.jsx";
import SearchBar from "../../components/Explore/SearchBar.jsx";

const ExplorePage = () => {
  return (
    <>
        <Navbar />
        <div className="pt-16 min-h-screen flex items-center flex-col">
            <div className="m-4">
                <SearchBar />
            </div>
        </div>
    </>
  );
};
  
export default ExplorePage;
