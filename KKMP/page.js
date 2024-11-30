'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';   // IMPORTS
import MenuIcon from '@mui/icons-material/Menu';

export default function MyApp() {
  const [temperature, setTemperature] = useState(null);
  const [donuts, setDonuts] = useState([]);
  const [cart, setCart] = useState([]);
  const router = useRouter();

  // GETS WEATHER DATA FROM API
  const fetchWeather = async () => {
    try {
      const response = await fetch(
        'http://api.weatherapi.com/v1/current.json?key=f8fa04efce5147c0b77214832242410&q=Dublin' 
      );
      const data = await response.json();
      setTemperature(data.current.temp_c);
    } catch (error) {
      console.error('Error fetching weather data:', error);  // LOGS ERROR IF WRONG
    }
  };



  useEffect(() => {
    fetchWeather();
  }, []);

  // Fetch donuts data
  useEffect(() => {
    const fetchDonuts = async () => {
      try {
        const response = await fetch('/api/getDonuts'); // API TO GET DONUT INFO
        if (!response.ok) throw new Error('Failed to fetch donuts data');
        const data = await response.json();
        setDonuts(data);
      } catch (error) {
        console.error('Error fetching donuts data:', error);
      }
    };
    fetchDonuts();
  }, []);

  // HANDLING FOR ADDING DONUTS TO CART
  const handleAddToCart = (donut, quantity) => {
    const item = {
      ...donut,
      quantity: parseInt(quantity, 10),
      total: parseFloat(donut.price) * parseInt(quantity, 10),
    };

    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const existingItem = updatedCart.find((cartItem) => cartItem._id === donut._id);  // INFORMATION TO BE PASSED 
      if (existingItem) {
        existingItem.quantity += item.quantity;
        existingItem.total += item.total;
      } else {
        updatedCart.push(item);
      }

      //SAVES THE UPDATED INFORMATION TO LOCAL STORAGE
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // INFO GOES TO CART PAGE
  const goToCart = () => {
    router.push('/CART');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Krispy Kreme
          </Typography>
          {temperature !== null ? (
            <Typography variant="body1">Current Temperature: {temperature}°C</Typography>
          ) : (
            <Typography variant="body1">Loading weather...</Typography>
          )}
          <Button onClick={goToCart} color="inherit">
            Cart
          </Button>
        </Toolbar>
      </AppBar>

      {/* Display donuts */}
      {donuts.length > 0 ? (
        donuts.map((donut) => (
          <Box
            key={donut._id}
            sx={{ p: 4, border: '1px solid gray', margin: '16px', borderRadius: '8px' }}
          >
            <Typography variant="h6">{donut.name}</Typography>
            <Typography variant="body1">{donut.description}</Typography>
            <Typography variant="h6">Price: €{donut.price}</Typography>
            <img
              src={donut.imageURL}
              alt={donut.name}
              style={{ width: '150px', height: '150px', marginTop: '10px' }}
            />
            <TextField
              type="number"
              label="Quantity"
              variant="outlined"
              size="small"
              defaultValue={1}
              sx={{ margin: '10px 0', width: '100px' }}
              inputProps={{ min: 1 }}
              id={`quantity-${donut._id}`}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                handleAddToCart(
                  donut,
                  document.getElementById(`quantity-${donut._id}`).value
                )
              }
            >
              Add to Cart
            </Button>
          </Box>
        ))
      ) : (
        <Typography>Loading donuts...</Typography>
      )}
    </Box>
  );
}
