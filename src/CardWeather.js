import React from 'react';
import { Card } from "react-bootstrap";

export default function CardWeather({ weatherReport }) {

    const iconWeatherUrl = weatherReport ? `https://openweathermap.org/img/w/${weatherReport.weather[0].icon}.png` : '';

    return (
        <>
            <Card className="mx-auto" style={{ width: '18rem'}}>
            {weatherReport != ''
                ? <>
                    <Card.Img variant="top" src={iconWeatherUrl} />
                        <Card.Body>
                        <Card.Title>Current Weather Report</Card.Title>
                        <Card.Text>
                            City name: {weatherReport.name}
                        </Card.Text>
                        <Card.Text>
                            Temperature: {(weatherReport.main.temp - 273.15).toFixed(1)} Celsius
                        </Card.Text>
                        <Card.Text>
                            Feels Like: {(weatherReport.main.feels_like - 273.15).toFixed(1)} Celsius
                        </Card.Text>
                        <Card.Text>
                            Humidity: {weatherReport.main.humidity}
                        </Card.Text>
                        <Card.Text>
                            Wind Speed: {weatherReport.wind.speed}
                        </Card.Text>
                        <Card.Text>
                            Wind Gust: {weatherReport.wind.gust}
                        </Card.Text>
                    </Card.Body>
                </> : <>
                        <Card.Img variant="top" src="" />
                            <Card.Body>
                            <Card.Title>Current Weather Report</Card.Title>
                            <Card.Text>
                                No City Found
                            </Card.Text>
                        </Card.Body>
                    </> 
            }
            </Card>
        </>
    );
}
