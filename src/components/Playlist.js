import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import './App.css'
const PlaylistManager = ()=>{
    const [playlist, setPlaylist] = useState('');
    const[fetched, setfetch] =useState(['']);
    //create playlists
    const createPlaylist = async ()=>{
        const userId=12345;
        const songs=[];
        const response=await axios.post('https://feelo5player.onrender.com/api/playlist',{userId, name:playlist, songs});
        console.log(response.data);
        alert("Playlist has created");
    };

    //fetchplaylist
    const fetchplaylist= async()=>{
        const userId=12345;
        const response= await axios.get(`https://feelo5player.onrender.com/api/playlist/user/${userId}`);
        console.log(setfetch(response.data)); 
    }
    useEffect(()=>{
        fetchplaylist();
    }, []);

    return (
        <div >
            <h1>create playlist</h1>
            <input type="text" 
            placeholder="playlist name" 
            value={playlist}
            onChange={(e)=>setPlaylist(e.target.value)}
            />
            <button onClick={createPlaylist}>Create Playlist</button>
            <div>
                {fetched.map((playlist)=>(
                    <div key={playlist._id}>
                        <Link to ={`/playlist/${playlist._id}`}>
                            <button>{playlist.name}</button>
                        </Link>
                        <p>{playlist.userId}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default PlaylistManager;