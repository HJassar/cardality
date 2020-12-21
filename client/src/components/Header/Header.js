import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';


const Header = () => (
    <header className="Header">
        <Link to="/"><h1>Cardality</h1></Link>
    </header>
);

export default Header;
