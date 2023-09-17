import React from 'react';

function SearchInput({ searchValue, setSearchValue, filterData, isEditing }) {
  return (
    <input
     className="search-input"
      type="search"
      placeholder='Start typing here to search'
      disabled={isEditing}
      value={searchValue}
      onChange={(e) => {
        setSearchValue(e.target.value);
        filterData(e);
      }}
    />
  );
}

export default SearchInput;
