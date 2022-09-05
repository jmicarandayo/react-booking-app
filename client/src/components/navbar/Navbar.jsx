import React, { useContext } from 'react'
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const Navbar = () => {
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);
  const handleLogout = () => {
    navigate('/login');
    localStorage.clear();
      
  }
  return (
    <nav className='navbar'>
        <div className="nav-container">
            <Link to="/" className='logo-name'>
              <span className="logo">kingsbooking</span>
            </Link>
            {user ? 
            <div>
              <span className='username'>Hi, {user.username}!</span>
            <button className='nav-button' onClick={handleLogout}>Logout</button>
            </div>
            : 
            <div className="nav-items">
                <button className='nav-button'>Register</button>
                <Link to="/login">
                <button className='nav-button'>Login</button>
                </Link>
            </div>
             }
        </div>
    </nav>
  )
}

export default Navbar