import { useState } from 'react';
 
const SearchBar = ({ onSearch, onFilterClick }) => {
    const [searchQuery, setSearchQuery] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== "") {
            console.log(searchQuery);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col sm:flex-row items-center gap-2">
            <div className="w-full flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 focus-within:ring-2 focus-within:ring-green-500 transition">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-400"
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
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent focus:outline-none w-full"
                />
            </div>
            <div className="flex gap-x-2 justify-center">
                <button
                    type="button"
                    onClick={onFilterClick}
                    className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                    </svg>
                </button>
                <button
                    type="submit"
                    className="px-6 py-2 rounded-full bg-green-600 text-white hover:bg-green-700"
                >
                    Search
                </button>
            </div>
            
        </form>
    );
};

export default SearchBar;
