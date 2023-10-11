import React from "react";
import { Link } from "react-router-dom";

function SearchFilter({
  searchTerm,
  setSearchTerm,
  selectedFilters,
  setSelectedFilters,
}) {
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    const filter = event.target.value;
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  return (
    <div className="bg-white rounded-md shadow-md p-4 mb-4">
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between space-y-7 md:space-y-0">
        <div className="mb-2 sm:mb-0 w-full md:w-fit">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border rounded-lg px-4 py-2 w-full md:w-64 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="flex items-center">
          <label className="mr-2">
            <input
              type="checkbox"
              value="Household"
              checked={selectedFilters.includes("Household")}
              onChange={handleFilterChange}
              className="mr-1"
            />
            Household
          </label>

          <label className="mr-2">
            <input
              type="checkbox"
              value="FHW"
              checked={selectedFilters.includes("FHW")}
              onChange={handleFilterChange}
              className="mr-1"
            />
            FHW
          </label>
          <label className="mr-2">
            <input
              type="checkbox"
              value="Principle"
              checked={selectedFilters.includes("Principle")}
              onChange={handleFilterChange}
              className="mr-1"
            />
            Principle
          </label>

          <label className="mr-2">
            <input
              type="checkbox"
              value="Teacher"
              checked={selectedFilters.includes("Teacher")}
              onChange={handleFilterChange}
              className="mr-1"
            />
            Teacher
          </label>
        </div>

        <div className="">
          <Link
            to={"/new-beneficiary"}
            className=" bg-blue-600 rounded-md  px-5 py-2 text-white"
          >
            ➕ New Contact
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SearchFilter;
