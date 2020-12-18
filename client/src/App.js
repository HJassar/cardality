import React from 'react';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Story from './pages/Story/Story';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.scss';

const App = () => {
    return (
        <div className='App'>
            <Router>
                <Header />
                <main className='main'>
                    <Switch>
                        <Route exact path='/' component={Home} />
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
