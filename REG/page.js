'use client';

import * as React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Home() {
  const [redirectPath, setRedirectPath] = useState(null); // Tracks the redirect path

  const handleRegister = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email'); // Retrieve the entered email
    const pass = data.get('pass'); // Retrieve the entered password

    if (!email || !pass) {
      alert('Email and password are required!');
      return;
    }

    try {
      // Send the registration request to the backend
      const response = await fetch('/api/getWeather', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, pass }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert('Registration successful!');
        window.location.href = '../'; 
      } else {
        alert(result.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
       
          <Box
            component="form"
            onSubmit={handleRegister}
            noValidate
            sx={{ mt: 1, width: '100%' }}
          >
            <Typography variant="h3" align="center" sx={{ mb: 3 }}>
              Register Here:
            </Typography>

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="email"
              autoComplete="email"
              autoFocus
              sx={{ fontSize: '1.2rem', padding: '10px' }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="pass"
              label="Password"
              type="password"
              id="pass"
              autoComplete="current-password"
              sx={{ fontSize: '1.2rem', padding: '10px' }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, padding: '10px', fontSize: '1.2rem' }}
            >
              Register now
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, padding: '10px', fontSize: '1.2rem' }}
            >
              <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
                Back to Main Page
              </Link>
            </Button>
          </Box>
        
      </Box>
    </Container>
  );
}
