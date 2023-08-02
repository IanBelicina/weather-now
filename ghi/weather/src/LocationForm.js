import React, { useState, useEffect } from 'react';

function LocationForm({ states, getLocations }){

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

    return(
        <div className=" container">
        <div className="row">
            <div className="col">
            <div className="location-form-container shadow">
                <div className="card-body">
                <form onSubmit={handleSubmit} id="create-location-form">
                    <h1 className="card-title">Search a location</h1>
                    <div className="col">
                        <div className="form-floating mb-3">
                        <input value={city} onChange={handleCityChange} required placeholder="city" type="text" id="city" name="city" className="form-control" />
                        <label htmlFor="city">City</label>
                        </div>
                    </div>

                    <div className="mb-3">
                        <select value={state} onChange={handleStateChange} name="state" id="state" className='form-select' required>
                        <option value="">Choose State</option>
                        {states.map(state => {
                            return (
                            <option key={state.id} value={state.abbreviation}>{state.abbreviation}</option>
                            )
                        })}
                        </select>
                    </div>


                    <button className="btn btn-lg btn-primary">Find</button>
                </form>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}

export default LocationForm;
