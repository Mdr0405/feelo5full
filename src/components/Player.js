import React, { useEffect, useRef } from 'react';
import './App.css';

function Player({ Link }) {
  const audioRef = useRef();

  useEffect(() => {
    if (Link && audioRef.current) {
      // Pause and reset the audio
      audioRef.current.pause(); // Stop the current song
      audioRef.current.currentTime = 0; // Reset the playback position

      // Load and play the new song
      audioRef.current.load(); 
      audioRef.current.play(); 
    }
  }, [Link]); // This runs whenever Link changes

  return (
    <div>
      <audio ref={audioRef} controls>
        <source src={Link} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default Player;
