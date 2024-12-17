import React, { useState } from 'react';
import axios from 'axios';
import './App.css'
function SearchBar({ onPlay }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [songs,setSongs]=useState(['']);
  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://feelo5.onrender.com/api/search?query=${searchQuery}`);
      console.log(setSongs(response.data)); 

    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  return (
    <div className="SearchBar">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for songs"
      />
      <button onClick={handleSearch}>Search</button>
      
      <div className="Search-Results">
        {
            songs.map((song) => (
            <div key={song._id}>
                <h3>{song.name}</h3>
                <p>{song.artist}</p>
                <p>{song.duration}</p>
                <button onClick={() => onPlay(song.link)}>Play</button>
            </div>
        ))}
        </div>

    </div>
  );
}

export default SearchBar;
