import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function Songs({ onPlay }) {
const [songs, setSongs] = useState([]);

useEffect(() => {
  // Fetch the songs from the backend
  axios.get("http://localhost:5000/api/songs").
  then((response) => {
      setSongs(response.data);
    })
    .catch((error) => {
      console.error('Error fetching songs:', error);
    });
}, []);

  const handlePlayClick = (link) => {
    onPlay(link); // Pass the selected song's link to the parent (App.js)
  };

  return (
    <div className="Song-List">
      <h1>Song List</h1>
      {songs.map((song) => (
        <div className="Song-Card" key={song._id}>
          <h2>{song.name}</h2>
          <p>
            <strong>Artist:</strong> {song.artist}
          </p>
          <p>
            <strong>Duration:</strong> {song.duration}
          </p>
          <button
            onClick={() => handlePlayClick(song.link)} // Trigger onPlay with the song link
          >
            Play
          </button>
        </div>
      ))}
    </div>
  );
}

export default Songs;
