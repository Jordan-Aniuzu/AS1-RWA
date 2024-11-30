'use client';

import * as React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Home() {
  const [redirectPath, setRedirectPath] = useState(null); // STATE HOOK TO MANAGE REDIRECT PATH

  const handleSubmit = (event) => {
    event.preventDefault(); // PREVENT DEFAULT FORM SUBMISSION BEHAVIOR
    const data = new FormData(event.currentTarget); // CREATE A FORM DATA OBJECT FROM FORM ELEMENTS

    const email = data.get('email'); // EXTRACT EMAIL FROM FORM DATA
    const pass = data.get('pass'); // EXTRACT PASSWORD FROM FORM DATA

    console.log('Sent email:', email); // LOG SENT EMAIL FOR DEBUGGING
    console.log('Sent password:', pass); // LOG SENT PASSWORD FOR DEBUGGING

    // CALL THE BACKEND API TO VALIDATE THE LOGIN AND SAVE THE SESSION: 
    runDBCallAsync(`http://localhost:3000/api/getWeather?email=${email}&pass=${pass}`, email, pass);
  };

  // FUNCTION TO HANDLE LOGIN VALIDATION AND SESSION SAVING:
  async function runDBCallAsync(url, email, pass) {
    try {
      const res = await fetch(url); // SEND A FETCH REQUEST TO THE API
      const data = await res.json(); // PARSE THE RESPONSE DATA TO JSON

      if (email === 'KKManager@KK.ie' && pass === 'KKManager1234') { // CHECK IF MANAGER LOGIN CREDENTIALS ARE VALID
        console.log('Manager Login is valid!'); // LOG MANAGER LOGIN SUCCESS
        alert('Manager Login Successful'); // ALERT FOR SUCCESSFUL MANAGER LOGIN

        window.location.href = '/CART'; // REDIRECT TO CART PAGE FOR MANAGER
      } else if (data.success) { // CHECK IF USER LOGIN IS SUCCESSFUL BASED ON API RESPONSE
        console.log('Login is valid!'); // LOG USER LOGIN SUCCESS
        console.log('User details:', data.user); // LOG USER DETAILS FROM API RESPONSE
        alert('Login Successful'); // ALERT FOR SUCCESSFUL USER LOGIN

        // AFTER SUCCESSFUL LOGIN, SEND REQUEST TO SAVE SESSION DATA:
        const sessionResponse = await fetch('/api/saveData', {
          method: 'POST', // USE POST METHOD TO SAVE SESSION DATA
          headers: {
            'Content-Type': 'application/json', // SET HEADER TO INDICATE JSON CONTENT TYPE
          },
          body: JSON.stringify({ email: email, role: 'customer' }), // SEND EMAIL AND ROLE IN REQUEST BODY TO SAVE SESSION
        });

        if (sessionResponse.ok) { // CHECK IF SESSION WAS SAVED SUCCESSFULLY
          alert('Session saved Successfully'); // ALERT FOR SUCCESSFUL SESSION SAVE
          window.location.href = '/KKMP'; // REDIRECT TO KKMP PAGE AFTER SUCCESSFUL SESSION SAVE
        } else {
          alert('Error saving session'); // ALERT IF SESSION SAVE FAILS
        }
      } else {
        console.log('Login is invalid.'); // LOG IF LOGIN IS INVALID
        alert(data.message); // ALERT WITH ERROR MESSAGE FROM API RESPONSE
      }
    } catch (error) {
      console.error('Error during login:', error); // LOG ERROR IF API REQUEST FAILS
      alert('An error occurred while trying to log in.'); // ALERT FOR GENERAL ERROR
    }
  }

  return (
    <Container maxWidth="sm"> {/* CONTAINER THAT WRAPS THE FORM FOR STYLING */}
      <Box
        sx={{
          height: '80vh', // SET HEIGHT OF THE BOX TO 80% OF VIEWPORT HEIGHT
          display: 'flex', // USE FLEX LAYOUT TO ALIGN CHILDREN
          flexDirection: 'column', // STACK CHILDREN VERTICALLY
          justifyContent: 'center', // CENTER CHILDREN VERTICALLY
          alignItems: 'center', // CENTER CHILDREN HORIZONTALLY
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit} // BIND THE FORM SUBMISSION HANDLER
          noValidate // DISABLE BUILT-IN FORM VALIDATION
          sx={{ mt: 1, width: '100%' }} // ADD TOP MARGIN AND SET WIDTH TO 100%
        >
          <Typography variant="h3" align="center" sx={{ mb: 3 }}> {/* HEADER TEXT FOR THE FORM */}
            Customer Account
          </Typography>

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            sx={{ fontSize: '1.2rem', padding: '10px' }} // STYLE FOR THE EMAIL TEXT FIELD
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
            sx={{ fontSize: '1.2rem', padding: '10px' }} // STYLE FOR THE PASSWORD TEXT FIELD
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />} // REMEMBER ME CHECKBOX
            label="Remember me" // LABEL FOR THE REMEMBER ME OPTION
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, padding: '10px', fontSize: '1.2rem' }} // SUBMIT BUTTON STYLING
          >
            Sign In
          </Button>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, padding: '10px', fontSize: '1.2rem' }} // BACK TO MAIN PAGE BUTTON
          >
            <Link href="/" style={{ color: 'white', textDecoration: 'none' }}> {/* LINK TO MAIN PAGE */}
              Back to Main Page
            </Link>
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
