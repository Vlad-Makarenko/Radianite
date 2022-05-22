import React, { useContext } from 'react'
import {NavLink, useNavigate } from 'react-router-dom'
// import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {

    // const auth = useContext(AuthContext)
    const history = useNavigate()
    const logoutHandler = event => {
        event.preventDefault();
        // auth.logout();
        history('/')
    }


    return (
        <nav >
        <div className="nav-wrapper deep-purple accent-4" style={{padding: '0 2rem'}}>
          <a href="/" className="brand-logo">Radianite</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><NavLink to="/create">Profile</NavLink></li>
            <li><NavLink to="/links">Create Room</NavLink></li>
            <li><NavLink to="/links">Rules</NavLink></li>
            <li><NavLink to="/">Home</NavLink></li>
            <li><a href='/' onClick={logoutHandler}>Log out</a></li>
          </ul>
        </div>
      </nav>
    )
}