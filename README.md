# WeatherNow

WeatherNow is a dynamic web app for real-time weather info. Built with Python, Django, React, and JavaScript, it's user-friendly, allowing location additions and deletions. Integrated with a third-party API for precise data.

## How to Run this App
 -Required software
  -Git
  -Node.js
  -Docker

  1. Fork and clone this repository to your computer <https://github.com/IanBelicina/weather-now.git>
  2. Build the project and run the project in docker using the following commands in the terminal
    - docker-compose build
    - docker-compose up
  3. Open Docker desktop to confirm all of your containers are running.
  4. View the react project at http://localhost:3000/
    - If your project does not load, stop the docker container for react.
    - Open a seperate terminal and navigate to the directory with pacakage.json.
    - Run the commands:
      - npm install
      - npm start
    - This will open a new window in your browser running the react application.

## RESTful CRUD APIs
Below is a table of how you can access the endpoints used to create the application and examples of expected input and output json responses.


| Action                     | Method | URL                                                 |
| -------------------------- | ------ | --------------------------------------------------- |
| Get all locations   | GET    | http://localhost:8000/api/locations/  |
| Get location                | GET    | http://localhost:8000/api/locations/{int: location_id}/ |
| Delete location  | DELETE | http://localhost:8000/api/locations/{int: location_id}/ |
| Create location  | POST   | http://localhost:8000/api/locations/             |


### Get all locations

Response body:

```
{
	"locations": [
		{
			"id": 1,
			"city": "Seattle",
			"state": "WA"
		},
		{
			"id": 2,
			"city": "Portland",
			"state": "OR"
		}
	]
}
```

### Get location

Endpoint input: {int: location_id}

Response body:

```
{
	"location": {
		"id": 1,
		"city": "Seattle",
		"state": "WA"
	},
	"weather": {
		"description": "clear sky",
		"temp": 66.92
	}
}
```

### Delete location

Endpoint input: {int: location_id}

Response body:

```
{
	"deleted": true
}
```

### Create location

Input body:

```
{
	"city":"Seattle",
	"state": "WA"
}
```

Response body:

```
{
	"id": 1,
	"city": "Seattle",
	"state": "WA"
}
```

