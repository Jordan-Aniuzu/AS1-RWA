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
  const [redirectPath, setRedirectPath] = useState(null); // TRACES THE EXACR PATH

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email'); // GETS THE USER EMAIL
    const pass = data.get('pass'); //  GETS THE USER PASSWORD

    // COMPARES VALUE TO SEE IF IITS THE SAME AS WHATS GIVEN
    if (email === 'KKmanager' && pass === 'test12') {
      console.log('Login is valid!');
      window.location.href = '/KKMP'; 

    } else  {
      alert('Incorrect username or password. Please try again.');   // ALERTS PAGE IF WRONG
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
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: '100%' }}
          >
            <Typography variant="h3" align="center" sx={{ mb: 3 }}>
              Manager Account
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
              Sign In
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
