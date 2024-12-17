import React from 'react'
import {Link} from 'react-router-dom'
import './App.css'
export default function Home(){
    return(
    <div className='Playlist'>
            <Link to="/AllPlay">
              <img src="/cd1.jpg" className='p1' alt='cd1'/>
            </Link>
        </div>
    ); 
}