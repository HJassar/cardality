import React from 'react';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Footer from './components/footer/Footer';
import './App.css';

const App = () => {
    return (
        <div className='App'>
            <Header />
            <Home />
            <Footer />
        </div>
    );
};

export default App;
