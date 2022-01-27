import React from 'react';

import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className='navbar bg-primary'>
            <h1>
                SpaceX finder
            </h1>
            <ul>
                <li>
                    <NavLink to='/'>Home</NavLink>
                </li>
                <li>
                    <NavLink to='/about'>About</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;