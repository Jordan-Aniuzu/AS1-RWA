'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Home() {
  const handleSubmit = (event) => {
    console.log("handling submit");
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let email = data.get('email');
    let pass = data.get('pass');   // LET EMAIL AND PASS

    console.log("Sent email:" + email);  //LOGS INFO FOR TESTING
    console.log("Sent pass:" + pass);

    runDBCallAsync(`http://localhost:3000/api/login?email=${email}&pass=${pass}`);
  }; // ENDS HANDLE

  async function runDBCallAsync(url) {
    const res = await fetch(url);
    const data = await res.json();

    if (data.data == "true") {
      console.log("login is valid!");
    } else {    // LOGIC TO LOG IF LOGIN VALID OR NTO SERVERSIDE
      console.log("not valid");
    }
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', //STTYLING
          alignItems: 'center',
        }}
      >
        <img
          src="/images/kk.png"
          alt="Logo"
          style={{ width: '100px', height: '100px' }}
        />

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
          {/* INTRO TEXT*/}
          <Typography variant="h3" align="center" sx={{ mb: 3 }}>
            Welcome to Krispy Kreme
          </Typography>

          {/* BUTTON STYLING */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ padding: '10px', fontSize: '1.2rem' }}
            >
              <Link href="/MA" style={{ color: 'white', textDecoration: 'none' }}>
                Sign In As Manager
              </Link>
            </Button>

            <Button
              variant="contained"
              sx={{
                padding: '10px',
                fontSize: '1.2rem',
                backgroundColor: '#1976d2',
                color: 'white',
              }}
            >
              <Link href="/REG" style={{ color: 'white', textDecoration: 'none' }}>
                Register Now
              </Link>
            </Button>  

            <Button
              type="submit"
              variant="contained"
              sx={{ padding: '10px', fontSize: '1.2rem' }}
            >
              <Link href="/CA" style={{ color: 'white', textDecoration: 'none' }}>
                Sign In As Customer
              </Link>
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  ); 
}
