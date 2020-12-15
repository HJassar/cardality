import React from 'react';
import Header from './components/header/Header';
import Home from './pages/Home/Home';
import Story from './pages/Story/Story';
import Footer from './components/footer/Footer';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';

const App = () => {
    return (
        <div className="App">
            <Router>
                <Header />
                <main className='main'>
                    <Switch>
                        <Route path='/home' component={Home} />
                        <Route path='/story' component={Story} />
                        <Route
                            render={() => {
                                return <h4>Oh No! You got a 404 error!</h4>;
                            }}
                        />
                    </Switch>
                </main>
                <Footer />
            </Router>
        </div>
    );
};

export default App;
