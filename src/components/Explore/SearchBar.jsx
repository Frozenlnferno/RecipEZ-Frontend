import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryHelpers from '../../utils/queryHelpers'; 

const SearchBar = ({ handleSearch, onFilterClick }) => {
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState(queryHelpers.parse(location.search));
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== "") {
            console.log("Search Query: ", searchQuery);
            handleSearch(searchQuery, filters);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl flex flex-col sm:flex-row items-center gap-4 py-2 px-2 ">
            <div className="w-full flex items-center gap-3 px-5 py-3 rounded-full border border-gray-300 bg-gray-50 focus-within:ring-2 focus-within:ring-green-500 transition shadow-sm">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-green-500"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                </svg>
                <input
                    type="search"
                    placeholder="Search recipes..."
                    autoComplete="off"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent focus:outline-none w-full text-lg px-2"
                />
            </div>
            <div className="flex gap-x-2 justify-center">
                <button
                    type="button"
                    onClick={onFilterClick}
                    className="px-5 py-3 rounded-full bg-gray-100 hover:bg-green-100 border border-gray-300 shadow text-green-700 flex items-center gap-2 font-semibold"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                    </svg>
                    Filters
                </button>
                <button
                    type="submit"
                    className="px-7 py-3 rounded-full bg-green-600 text-white font-bold text-lg shadow hover:bg-green-700 transition"
                >
                    Search
                </button>
            </div>
        </form>
    );
};

export default SearchBar;
