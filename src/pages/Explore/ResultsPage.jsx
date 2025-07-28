import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "../../components/Navbar/Navbar.jsx";
import SearchBar from "../../components/Explore/SearchBar.jsx";
import queryHelpers from "../../utils/queryHelpers.js";

const ResultsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [filters, setFilters] = useState(queryHelpers.parse(location.search));

    useEffect(() => {
        setFilters(queryHelpers.parse(location.search));
    }, [location.search]);

    const handleSearch = (query) => {
        const qs = queryHelpers.buildURL(query, filters);
        console.log(query, " ", qs);
        navigate(`/results?${qs}`);
    }

    return (
        <>
            <Navbar />
            <div className="pt-16 min-h-screen flex items-center flex-col">
                <div className="m-4">
                    <SearchBar handleSearch={handleSearch}/>
                </div>
            </div>
        </>
    );
};
  
export default ResultsPage;
