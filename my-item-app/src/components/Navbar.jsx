import React from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css'
const Navbar = () => {
  return (
    <>
    <div className='navbar'>
            <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/">View Items</Link>
        </li>
        <li className="navbar-item">
          <Link to="/add">Add Item</Link>
        </li>
      </ul>
    </div>
    </>
  )
}

export default Navbar
