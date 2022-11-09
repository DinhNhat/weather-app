import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import { Form, Card, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

import CardWeather from './CardWeather';

const API_KEY = '048ee29f0ec4d509d49966088439ae91';

function App() {
  const [city, setCity] = useState("");
  const [weatherReport, setWeatherReport] = useState("");

  // const weatherReport = useRef({});

  function handleSubmit(e) {
    e.preventDefault();

    // Get Coordinates by location name
    const urlCoordinates = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=2&appid=${API_KEY}`;
    axios({
      method: 'GET',
      url: urlCoordinates
    })
    .then(response => {
      if (response.status == 200 && response.data.length > 0) {
        const {lat, lon, ...others} = response.data[0];
        console.log(`Coordinates: latitude ${lat}, longitude ${lon}`);

        // Make the weather API request by the Coordinates
        const urlRequest = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
        axios({
          method: 'GET',
          url: urlRequest
        })
        .then(response => {
          if (response.status == 200 && response.data) {
            console.log(response.data);
            setWeatherReport(response.data);
          } else {
            setWeatherReport("");
          }
        })
        .catch(error => {
        });
      } else {
        setWeatherReport("");
      }
    })
    .catch(error => {
      console.log(error);
    });

    // Reset the input value
    setCity("");
  }

  return (
    <Container fluid>
      <Row className="mx-auto" style={{ maxWidth: "100%", height: "auto" }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
            <Form.Label>City Name</Form.Label>
            <Form.Control
            value={city}
            onChange={e => setCity(e.target.value)}
            type="text" placeholder="Enter your city..." 
            />
        </Form.Group>
          <Button variant="primary" type="submit">
            Get Weather Forecast
          </Button>
      </Form>
      </Row>

        <Row >
          <CardWeather weatherReport={weatherReport} />
          {/* {weatherReport.current} */}
        </Row>
    </Container> 
  );
}

export default App;
