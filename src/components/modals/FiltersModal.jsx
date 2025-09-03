import { useState } from "react";

const filterOptions = {
    type: { multiple: false, options: ["Main Course","Side Dish","Dessert","Appetizer","Salad","Bread","Breakfast",
                                    "Soup","Beverage","Sauce","Marinade","Fingerfood","Snack","Drink"] },
    cuisine: { multiple: false, options: ["African","Asian","American","British","Cajun","Caribbean",
                                        "Chinese","Eastern European","European","French","German","Greek",
                                        "Indian","Irish","Italian","Japanese","Jewish","Korean","Latin American",
                                        "Mediterranean","Mexican","Middle Eastern","Nordic","Southern","Spanish",
                                        "Thai","Vietnamese"]
    },
    diet: { multiple: false, options: ["Gluten Free","Ketogenic","Vegetarian","Lacto-Vegetarian","Ovo-Vegetarian",
                                    "Vegan","Pescetarian","Paleo","Primal","Low FODMAP","Whole30"]
    },
    intolerances: { multiple: true, options: ["Dairy","Egg","Gluten","Grain","Peanut","Seafood","Sesame",
                                            "Shellfish","Soy","Sulfite","Tree Nut","Wheat"] },
    readyTime: { multiple: false, options: ["<15 min", "30 min", "60 min", ">60 min"] },
};

const FiltersModal = ({ handleClose, filters, setFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters || {});

  const handleCheckboxChange = (category, option) => {
    const categoryFilters = localFilters[category] || [];
    if (categoryFilters.includes(option)) {
      setLocalFilters({
        ...localFilters,
        [category]: categoryFilters.filter((item) => item !== option),
      });
    } else {
      setLocalFilters({
        ...localFilters,
        [category]: [...categoryFilters, option],
      });
    }
  };

  const handleSelectChange = (category, value) => {
    setLocalFilters({
      ...localFilters,
      [category]: value,
    });
  };

  const handleApply = (e) => {
    e.preventDefault();
    setFilters(localFilters);
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      <span
        className="absolute inset-0 bg-black opacity-75"
        onClick={handleClose}
      ></span>

      <form
        onSubmit={handleApply}
        className="relative z-50 bg-white rounded p-5 flex flex-col w-80 max-h-[80vh] overflow-y-auto"
      >
        <header className="text-xl font-semibold mb-4">Filters</header>

        <main className="flex flex-col gap-4">
          {/* Checkboxes */}
          {["type", "diet", "intolerances"].map((category) => (
            <div key={category} className="flex flex-col">
              <span className="font-medium">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
              <div className="flex flex-wrap gap-2 mt-1">
                {filterOptions[category].options.map((option) => (
                  <label key={option} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={(localFilters[category] || []).includes(option)}
                      onChange={() => handleCheckboxChange(category, option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}

          {/* Dropdowns */}
          {["cuisine", "readyTime"].map((category) => (
            <div key={category} className="flex flex-col">
              <span className="font-medium">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
              <select
                value={localFilters[category] || ""}
                onChange={(e) => handleSelectChange(category, e.target.value)}
                className="border rounded p-2 mt-1"
              >
                <option value="">-- Select {category} --</option>
                {filterOptions[category].options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </main>

        <button
          type="submit"
          className="mt-4 self-end bg-gray-300 rounded px-4 py-2 hover:bg-gray-400"
        >
          Apply & Close
        </button>
      </form>
    </div>
  );
};

export default FiltersModal;
