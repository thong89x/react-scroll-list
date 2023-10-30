import React, { useEffect, useState } from "react";

function SearchFilter({ items, onFilterChange }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    console.log("Click search");
    console.log(searchTerm);
    onFilterChange(searchTerm?searchTerm: "a");
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  useEffect(() => {
    console.log(searchTerm);
  }, [searchTerm]);
  return (
      <nav className="navbar navbar-light bg-light w-100">
        <div className="container-fluid" >
          <div className="d-flex input-group w-100 " style={{gap:"1rem"}}>
            <input
              type="text"
              className="form-control rounded"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button type="button" className="btn btn-primary" onClick={handleSearch}>Search</button>

            {/* <span onClick={handleSearch} class="input-group-text border-0" id="search-addon">
              <i class="fas fa-search" ></i> */}
            {/* <button onClick={handleSearch}>Search</button> */}

            {/* </span> */}
          </div>
        </div>
      </nav>
  );
}

export default SearchFilter;
