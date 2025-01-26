import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import homeIcon from '../assets/home.png'
import accom from '../assets/accommodation.webp'
import event from '../assets/events1.png'
import more from '../assets/more.png'
import merch from '../assets/merch.png'
import contactIcon from '../assets/contact.png'
import scheduleIcon from '../assets/schedule1.png'
import sponsor from '../assets/sponsor.png'
import register from '../assets/register.png'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <nav className='navbar z-10'>
      <div className='hamburger' onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ul className={`navList ${isMenuOpen ? 'show' : ''}`}>
        <li className='navItem'>
          <NavLink
            to='/merch'
            className={({ isActive }) => (isActive ? 'active-link' : 'navLink')}
          >
            <div className='top-bar'></div>
            <img src={merch} alt='Merch Icon' id='icon' />
            Merch
          </NavLink>
        </li>
        <li className='navItem'>
          <NavLink
            to='/events'
            className={({ isActive, isPending }) =>
              window.location.pathname.startsWith('/event') || isActive
                ? 'active-link'
                : 'navLink'
            }
          >
            <div className='top-bar'></div>
            <img src={event} alt='Events Icon' id='icon' />
            Events
          </NavLink>
        </li>
        <li className='navItem'>
          <NavLink
            to='/registration'
            className={({ isActive, isPending }) =>
              window.location.pathname.startsWith('/registration') || isActive
                ? 'active-link'
                : 'navLink'
            }
          >
            <div className='top-bar'></div>
            <img src={register} alt='Register Icon' id='icon' />
            Register
          </NavLink>
        </li>
        <li className='navItem'>
          <NavLink
            to='/'
            className={({ isActive }) => (isActive ? 'active-link' : 'navLink')}
          >
            <div className='top-bar'></div>
            <img src={homeIcon} alt='Home Icon' id='icon' />
            Home
          </NavLink>
        </li>
        <li className='navItem'>
          <NavLink
            to='/accommodation'
            className={({ isActive }) => (isActive ? 'active-link' : 'navLink')}
          >
            <div className='top-bar'></div>
            <img src={accom} alt='Accommodation Icon' id='icon' />
            Accommodation
          </NavLink>
        </li>
        <li className='navItem'>
          <NavLink
            to='/more'
            className={({ isActive }) => (isActive ? 'active-link' : 'navLink')}
          >
            <div className='top-bar'></div>
            <img src={more} alt='More Icon' id='icon' />
            More
          </NavLink>
        </li>
        <li className='navItem'>
          <NavLink
            to='/contact'
            className={({ isActive }) => (isActive ? 'active-link' : 'navLink')}
          >
            <div className='top-bar'></div>
            <img src={contactIcon} alt='Contact Icon' id='icon' />
            Contact
          </NavLink>
          <ul className='dropdown'>
            <li>
              <NavLink
                to='/contact/team'
                className={({ isActive }) =>
                  isActive ? 'dropdown-active-link' : 'dropdown-link'
                }
              >
                Team
              </NavLink>
            </li>
          </ul>
        </li>
        <li className='navItem'>
          <NavLink
            to='/schedule'
            className={({ isActive }) => (isActive ? 'active-link' : 'navLink')}
          >
            <div className='top-bar'></div>
            <img src={scheduleIcon} alt='Schedule Icon' id='icon' />
            Schedule
          </NavLink>
        </li>
        <li className='navItem'>
          <NavLink
            to='/sponsor'
            className={({ isActive }) => (isActive ? 'active-link' : 'navLink')}
          >
            <div className='top-bar'></div>
            <img src={sponsor} alt='Sponsor Icon' id='icon' />
            Sponsor
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
