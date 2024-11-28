'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MyApp() {
  const [temperature, setTemperature] = useState(null);
  const [donuts, setDonuts] = useState([]);
  const [cart, setCart] = useState([]); // State to track cart items
  const router = useRouter();

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        'http://api.weatherapi.com/v1/current.json?key=f8fa04efce5147c0b77214832242410&q=Dublin'
      );
      const data = await response.json();
      setTemperature(data.current.temp_c);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  useEffect(() => {
    const fetchDonuts = async () => {
      try {
        const response = await fetch('/api/getDonuts');
        if (!response.ok) {
          throw new Error('Failed to fetch donuts data');
        }
        const data = await response.json();
        setDonuts(data);
      } catch (error) {
        console.log('Error fetching donuts data:', error);
      }
    };
    fetchDonuts();
  }, []);

  // Function to handle adding donuts to the cart
  const handleAddToCart = (donut, quantity) => {
    const item = {
      ...donut,
      quantity: parseInt(quantity, 10),
      total: parseFloat(donut.price) * parseInt(quantity, 10),
    };

    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem._id === donut._id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem._id === donut._id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity, total: cartItem.total + item.total }
            : cartItem
        );
      } else {
        return [...prevCart, item];
      }
    });
  };

  // Function to navigate to the Cart page
  const goToCart = () => {
    window.location.href = '../CART';
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
            <Typography variant="body1" color="inherit">
              Current Temperature: {temperature}°C
            </Typography>
          ) : (
            <Typography variant="body1" color="inherit">
              Loading weather...
            </Typography>
          )}
          <Button color="inherit">Home</Button>
          <Button color="inherit">
            <Link href="../" style={{ textDecoration: 'none', color: 'inherit' }}>
              Logout
            </Link>
          </Button>
          <Button onClick={goToCart} color="inherit">
            Cart
          </Button>
        </Toolbar>
      </AppBar>

      {/* Dynamically display donuts */}
      {donuts.length > 0 ? (
        donuts.map((donut) => (
          <Box
            key={donut._id}
            component="section"
            sx={{
              p: 6,
              fontSize: '23px',
              border: '3px dashed grey',
              textAlign: 'center',
            }}
          >
            <Typography variant="h6">{donut.name}</Typography>
            <Typography variant="body1">{donut.description}</Typography>
            <Typography variant="h6">Price: €{donut.price}</Typography>
            <img
              src={donut.imageURL}
              alt={donut.name}
              style={{ width: '150px', height: '150px', marginTop: '10px' }}
            />
            {/* Quantity input */}
            <TextField
              type="number"
              label="Quantity"
              variant="outlined"
              size="small"
              sx={{ margin: '10px 0', width: '100px' }}
              defaultValue={1}
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
        <Typography variant="body1" color="inherit">
          Loading donut data...
        </Typography>
      )}
    </Box>
  );
}
