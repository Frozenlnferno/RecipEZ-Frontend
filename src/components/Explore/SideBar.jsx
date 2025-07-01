const SideBar = ({ filters, onFilterChange }) => {
  return (
    <div className="w-full md:w-64 p-4 bg-gray-50 rounded-lg shadow-sm mb-6 md:mb-0">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="flex flex-col gap-2">
        {filters.map((filter) => (
          <label key={filter.value} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filter.checked}
              onChange={() => onFilterChange(filter.value)}
              className="accent-green-600"
            />
            <span>{filter.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
