import React, { useContext } from 'react'
import {NavLink, useNavigate } from 'react-router-dom'
import 'material-icons' 
import { AuthContext } from '../contexts/AuthContext'


export const Navbar = () => {

    const auth = useContext(AuthContext)
    const history = useNavigate()
    const logoutHandler = event => {
        event.preventDefault();
        auth.logout();
        history('/')
    }


    return (
        <nav >
        <div className="nav-wrapper deep-purple accent-4" style={{paddingLeft: '1rem'}}>
          <a href="/home" className="brand-logo">Radianite</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {/* <li><NavLink to="/home">Home</NavLink></li> */}
            <li><NavLink to="/room">Create Room</NavLink></li>
            <li><NavLink to="/rules">Rules</NavLink></li>
            <li><NavLink to="/profile"><i className="material-icons">person_pin</i></NavLink></li>
            <li><a href='/' onClick={logoutHandler}><i className="material-icons">exit_to_app</i></a></li>
          </ul>
        </div>
      </nav>
    )
}