import React from "react";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Story from "./pages/Story/Story";
import Footer from "./components/footer/Footer";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Home />
      {/* Main component needs to be created here which will house the pages: Home, Story, etc. So after it is created, place the Home and Story page components into a react-router-dom switch*/}
      <Story />
      <Footer />
    </div>
  );
};

export default App;
