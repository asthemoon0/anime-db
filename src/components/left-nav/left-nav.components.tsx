import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './left-nav.styles.scss'

import { FiDatabase } from 'react-icons/fi'

const LeftNav = () => {
  const [isOpen, setisOpen] = useState(false)
  const toggleNav = () => {
    setisOpen(!isOpen)
    window.innerWidth <= 1053
      ? isOpen
        ? (document.body.style.overflow = 'visible')
        : (document.body.style.overflow = 'hidden')
      : console.log('Inner window is bigger than 1053px')
  }
  return (
    <div className={isOpen ? 'menu-section on' : 'menu-section'}>
      <div className={'menu-toggle'} onClick={toggleNav}>
        <div className='one'></div>
        <div className='two'></div>
        <div className='three'></div>
      </div>
      <nav>
        <div className='logo'>
          <Link to='/'>
            <div className='logo-container'>
              <h1>ANIME</h1>
              <FiDatabase style={{ color: '#6FFFE9', marginLeft: 2 }} size={21} />
            </div>
          </Link>
        </div>

        <div className='browse'>
          <h3>BROWSE</h3>
          <ul>
            <Link to='/' onClick={toggleNav}>
              <li className='active'>DISCOVER</li>
            </Link>
            <li>TV SHOWS</li>
            <li>MOVIES</li>
          </ul>
        </div>

        <div className='category'>
          <h3>CATEGORIES</h3>
          <ul>
            <Link to='/genres/150' onClick={toggleNav}>
              <li>ACTION</li>
            </Link>
            <li>SLICE OF LIFE</li>
            <li>DRAMA</li>
            <li>PSYCHOLOGICAL</li>
            <li>HISTORY</li>
            <li>MECHA</li>
            <li>SUPERNATURAL</li>
            <li>ROMANCE</li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default LeftNav
