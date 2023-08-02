import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import MainPage from './MainPage';
import LocationForm from './LocationForm';
import './App.css';

function App() {

  const [locations, setLocations] = useState([]);
  const [states, setStates] = useState([]);

  async function getLocations(){
    const response = await fetch("http://localhost:8000/api/locations/");
    if (response.ok){
      const data = await response.json();
      setLocations(data.locations);
    }
  }

  async function getStates(){
    const response = await fetch("http://localhost:8000/api/states/");
    if (response.ok){
      const data = await response.json();
      setStates(data.states);
    }
  }


  useEffect(() => {
    getLocations();
    getStates();
  }, [])

  if (locations === undefined){
    return null;

  if (states == undefined){
    return null;
  }

  }
  return (
    <BrowserRouter>
      <Nav />
      {/* <div className="container"> */}
        <Routes>
          <Route path="/" element={<MainPage locations={locations}/>} />
          <Route path="newlocation/" element={<LocationForm states={states} getLocations={getLocations}/>}/>
        </Routes>
      {/* </div> */}
      <Footer className="footer"/>
    </BrowserRouter>
  );
}

export default App;
