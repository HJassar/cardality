import React from 'react';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Story from './pages/Story/Story';
import Footer from './components/footer/Footer';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';

const App = () => {
    return (
        <div className='App'>
            <Router>
                <Header />
                <main className='main'>
                    <Switch>
                        <Route path='/home' component={Home} />
                        {/* Main component needs to be created here which will house the pages: Home, Story, etc. So after it is created, place the Home and Story page components into a react-router-dom switch*/}
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
