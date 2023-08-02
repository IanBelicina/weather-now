import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function LocationColumn(props) {

    return (
      <div className="col">
        {props.list.map(data => {
          const location = data.location;
          const weather = data.weather;
          return (
            <div key={location.id} className="card mb-3 shadow">
              <div className="card-body">
                <h4 className="card-title">{location.city},{location.state}</h4>
                <h5 className="card-subtitle mb-2 text-muted">
                  {weather.temp} - {weather.description}
                </h5>
              </div>
            </div>
          );
        })}
      </div>
    );
  }





function MainPage({ locations }){


    const [ locationColumns, setLocationColumns ] = useState([]);
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
      <div className="px-4 py-5 my-5 mt-0 text-center bg-info">
        <img className="bg-white rounded shadow d-block mx-auto mb-4" src="/logo.svg" alt="" width="600" />
        <h1 className="display-5 fw-bold">Locations</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Example text
          </p>
          {/* <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/attendees/new" className="btn btn-primary btn-lg px-4 gap-3">Attend a conference</Link>
          </div> */}
        </div>
      </div>
      <div className="container">
        <div className="row">
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
