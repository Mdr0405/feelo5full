import './components/App.css';
import Player from './components/Player';
import { FaHome , FaSearch} from 'react-icons/fa';
import Home from './components/Home';
import Songs from './components/Songs';
import SearchBar from './components/Search';
import Playlist from './components/Playlist';
import PlaylistDetails from './components/PlaylistDetails';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [currentSongLink, setCurrentSongLink] = useState(''); // Centralize song link management

  const handlePlay = (link) => {
    setCurrentSongLink(link); // Update the song link
  };

  return (
    <Router>
      <div className="FeelO5">
        {/* Top navigation */}
        <div className="Top">
          <Link to="/">
            <FaHome className="Home-Icon" />
          </Link>
          <Link to="/search">
            <FaSearch/>
            </Link>
            <Link to="/playlist">
              playlist
            </Link>
        </div>

        {/* Main content */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AllPlay" element={<Songs onPlay={handlePlay} />} />
          <Route path='/Search' element={<SearchBar onPlay={handlePlay}/>}/>
          <Route path='/playlist' element={<Playlist/>}/>
          <Route path="/playlist/:playlistId" element={<PlaylistDetails onPlay={handlePlay}/>}/>
        </Routes>

       
        <div className="Player">
          <Player Link={currentSongLink} />
        </div>
      </div>
    </Router>
  );
}

export default App;
