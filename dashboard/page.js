'use client';  // Ensures the component is rendered on the client side
import { useState, useEffect } from "react";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

export default function Page() {
  // State for products and weather
  const [data, setData] = useState(null);
  const [weather, setWeatherData] = useState(0);

  // Fetch all products data
  useEffect(() => {
    fetch('http://localhost:3000/api/getProducts')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  // Fetch all weather data
  useEffect(() => {
    fetch('http://localhost:3000/api/getWeather')
      .then((res) => res.json())
      .then((weather) => {
        setWeatherData(weather); // Set the weather data in the state
      });
  }, []);

  // condition statement for If weather data is not loaded
  if (!weather) return <p>No weather</p>;

  // if products data is not yet loaded
  if (!data) return <p>Loading</p>;

 
  const theme = createTheme({
    palette: {
      secondary: {
        main: green[500],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <div style={{ fontSize: '40px' }}>Dashboard</div>

        {/* Weather display */}
        <div>
          <h2>Today's temperature: {JSON.stringify(weather.temp)}°C</h2>
        </div>

        {/* Products display */}
        <div>
          {data.map((item, i) => (
            <div style={{ padding: '20px' }} key={i}>
              Unique ID: {item._id}
              <br />
              {item.pname} - {item.price1}
              {item.price2}
              {item.price3}
              {item.price4}
              {item.price5}
              <br />
              <Button variant="outlined">Add to cart</Button>
            </div>
          ))}
        </div>
      </Container>
    </ThemeProvider>
  );
}
