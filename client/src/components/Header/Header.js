import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';


const Header = () => (
    <header className="Header">
        <h1> <Link to="/">Cardality</Link></h1>
    </header>
);

export default Header;
