import React, { useState } from 'react';

const Search = ({ setCity, getWeather }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setCity(inputValue);
    getWeather(inputValue);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Enter city"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
