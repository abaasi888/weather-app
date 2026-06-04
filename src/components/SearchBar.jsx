import React, { useState, useEffect, useRef } from 'react';
import { searchCities } from '../services/weatherService';

const SearchBar = ({ onCitySelect, onUseCurrentLocation, loading }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length >= 2) {
        const results = await searchCities(query);
        setSuggestions(results);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <input
            type="text"
            placeholder="Search city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={loading}
            style={{ width: '100%', padding: '12px', fontSize: '16px' }}
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', border: '1px solid #ccc', maxHeight: '200px', overflow: 'auto', margin: 0, padding: 0, listStyle: 'none' }}>
              {suggestions.map((city, idx) => (
                <li key={idx} onClick={() => {
                  setQuery(`${city.name}, ${city.country}`);
                  setShowSuggestions(false);
                  onCitySelect(city);
                }} style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #eee' }}>
                  {city.name}, {city.country}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button onClick={onUseCurrentLocation} disabled={loading} style={{ padding: '12px 20px' }}>📍 My Location</button>
      </div>
    </div>
  );
};

export default SearchBar;
