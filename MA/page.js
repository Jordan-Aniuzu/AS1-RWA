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

    let email = data.get('email')
    let pass = data.get('pass')

    console.log("Sent email:" + email)
    console.log("Sent pass:" + pass)

    runDBCallAsync(`http://localhost:3000/api/login?email=${email}&pass=${pass}`)
  }; // end handle submit

  async function runDBCallAsync(url) {
    const res = await fetch(url);
    const data = await res.json();

    if(data.data == "true"){
      console.log("login is valid!")
    } else {
      console.log("not valid ")
    }
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ 
        height: '80vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
          {/* Centered "Manager account" text */}
          <Typography variant="h3" align="center"sx={{ mb: 3 }}>
            Manager Account
          </Typography>

          {/* Larger text fields */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            sx={{ fontSize: '1.2rem', padding: '10px' }} // Make the input fields larger
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="pass"
            label="Pass"
            type="pass"
            id="pass"
            autoComplete="current-password"
            sx={{ fontSize: '1.2rem', padding: '10px' }} // Make the input fields larger
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
  <Link href="/layout" style={{ color: 'white', textDecoration: 'none' }}>
    Sign In
  </Link>
</Button>

<Button
  type="submit"
  fullWidth
  variant="contained"
  sx={{ mt: 3, mb: 2, padding: '10px', fontSize: '1.2rem' }}
>
  <Link href="/KKP1" style={{ color: 'white', textDecoration: 'none' }}>
  Back to Main Page
  </Link>
</Button>

        </Box>
      </Box>
    </Container>
  ); // end return
}
