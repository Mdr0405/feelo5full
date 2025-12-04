import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
// import {Link} from 'react-router-dom';

import { useParams } from 'react-router-dom';
const PlaylistDetails = ({ onPlay }) => {
    const {playlistId}=useParams();
    const [playlist, setPlaylist] = useState([]); // To store playlist details
    const [allSongs, setAllSongs] = useState([]); // To store all songs from the database
    const [selectedSongs, setSelectedSongs] = useState([]); // To track selected songs

    //fetch playlist details
    const fetchPlaylist = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/playlist/${playlistId}`);
            setPlaylist(response.data);
        } catch (error) {
            console.error('Error fetching playlist:', error);
        }
    };

    // Fetch all songs from the database
    const fetchAllSongs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/songs');
            setAllSongs(response.data);
        } catch (error) {
            console.error('Error fetching songs:', error);
        }
    };

    // Add selected songs to the playlist
    const addSongsToPlaylist = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/api/playlist/${playlistId}/add-songs`, {
                songIds: selectedSongs,
            });
            setPlaylist(response.data.playlist);
            alert('Songs added successfully');
        } catch (error) {
            console.error('Error adding songs to playlist:', error);
        }
    };

    // Track checkbox changes for song selection
    const handleCheckboxChange = (songId) => {
        setSelectedSongs((prev) =>
            prev.includes(songId)
                ? prev.filter((id) => id !== songId)
                : [...prev, songId]
        );
    };

    useEffect(() => {
        fetchPlaylist();
        fetchAllSongs();
    }, [playlistId]);

    return (
        <div className='Playlist-Details'>
            <h2>Playlist: {playlist?.name}</h2>
            <h3>Current Songs:</h3>
            <ul>
                {playlist.s && playlist.s.map((song) => (
                    <li key={song._id}>
                        {song.name} by {song.artist}
                        <button onClick={() => onPlay(song.link)}>Play</button>
                    </li>
                ))}
            </ul>


            <h3>Add Songs to Playlist:</h3>
            <div>
                {allSongs.map((song) => (
                    <div key={song._id}>
                        <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange(song._id)}
                        />
                        {song.name} by {song.artist}
                    </div>
                ))}
            </div>
            <button onClick={addSongsToPlaylist}>Add Selected Songs</button>
        </div>
    );
};

export default PlaylistDetails;
