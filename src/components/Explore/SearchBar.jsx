import { useState } from "react";

const SearchBar = ({ query, setQuery, onSearch, onToggleFilter }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
      className="w-full max-w-2xl flex items-center bg-white rounded-full shadow-md overflow-hidden"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search recipes..."
        className="flex-grow px-4 py-3 text-gray-700 focus:outline-none"
      />
      <button
        type="button"
        onClick={onToggleFilter}
        className="px-4 text-green-700 hover:text-green-900 border-r border-gray-300"
        title="Toggle filters"
      >
        🔧
      </button>
      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-3 hover:bg-green-700 transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
