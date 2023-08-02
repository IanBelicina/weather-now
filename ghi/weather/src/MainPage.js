import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function LocationColumn(props) {

    return (
      <div className="col">
        {props.list.map(data => {
          const location = data.location;
          const weather = data.weather;
          return (
            <div key={location.id} >
              <div className="card">
                <div className="weather-container">
                    <div className="cloud front">
                    <span className="left-front"></span>
                    <span className="right-front"></span>
                    </div>
                    <span className="sun sunshine"></span>
                    <span className="sun"></span>
                    <div className="cloud back">
                    <span className="left-back"></span>
                    <span className="right-back"></span>
                    </div>
                </div>

                <div className="card-header">
                    <span>{location.city},{location.state}</span>
                    <span>{weather.description}</span>
                </div>

                <span className="temp">{parseInt(weather.temp)}°</span>

                <div className="temp-scale">
                    <span>fahrenheit</span>
                </div>
                </div>
            </div>
          );
        })}
      </div>
    );
  }





function MainPage({ locations, states, getLocations }){


    const [ locationColumns, setLocationColumns ] = useState([]);
    const [ city, setCity] = useState('');
    const [ state, setState] = useState('');

    async function handleSubmit(event){
      event.preventDefault();

      const data = {};
      data.city = city;
      data.state = state;


      const url = 'http://localhost:8000/api/locations/';
      const fetchConfig = {
          method:"post",
          body: JSON.stringify(data),
          headers: {
              'Content-Type': 'application/json',
          },
      };
      const response = await fetch(url, fetchConfig);
      if (response.ok){
          const newLocation = await response.json();

          setCity('');
          setState('');
          getLocations();
      }

  }

    function handleCityChange(event){
      const {value} = event.target;
      setCity(value);
    }

    function handleStateChange(event){
      const {value} = event.target;
      setState(value);
    }


    useEffect(() => {
        async function getLocationDetails() {
          try {

              const requests = [];
              for (let location of locations) {
                const detailUrl = `http://localhost:8000/api/locations/${location.id}/`;
                requests.push(fetch(detailUrl));
              }
              const responses = await Promise.all(requests);
              const locationColumns = [[], [], []];

              let i = 0;
              for (const locationResponse of responses) {
                if (locationResponse.ok) {
                  const details = await locationResponse.json();

                  locationColumns[i].push(details);
                  i = i + 1;
                  if (i > 2) {
                    i = 0;
                  }
                } else {
                  console.error(locationResponse);
                }
              }

              setLocationColumns(locationColumns);


            } catch (e) {
            console.error(e);
          }
        }
        getLocationDetails();
      }, [locations])




    return(
        <>
      <div className="px-4 py-5  mt-0 text-center bg-info-custom">
        <img className="bg-white rounded shadow d-block mx-auto mb-4" src="/logo.svg" alt="" width="600" />
        <h1 className="display-5 fw-bold weather-heading">Weather Locations</h1>
        <div className="col-lg-6 mx-auto">






        <form onSubmit={handleSubmit} id="create-location-form">
          <div className="row">
            <div className="col">
              <div className="form-floating mb-3">
                <input value={city} onChange={handleCityChange} required placeholder="city" type="text" id="city" name="city" className="form-control" />
                <label htmlFor="city">City</label>
              </div>
            </div>
            <div className="col">
              <div className="form-floating mb-3">
              <select value={state} onChange={handleStateChange} name="state" id="state" className='form-select' required>
                <option value="">Choose State</option>
                {states.map(state => {
                    return (
                    <option key={state.id} value={state.abbreviation}>{state.abbreviation}</option>
                    )
                })}
                </select>
              </div>
            </div>
          </div>
          <button className="btn btn-lg btn-primary custom-button">Add Location</button>
        </form>
        </div>
      </div>
      <div className="container">
        <div className="row d-flex justify-content-center">
          {locationColumns.map((locationList, index) => {
            return (
              <LocationColumn key={index} list={locationList} />
            );
          })}
        </div>
      </div>
    </>
    );
}

export default MainPage;
