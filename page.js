'use client'

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useState} from 'react';


export default function MyApp() {

  const [showLogin, setShowLogin] = useState(false);
  const [showDash, setShowDash] = useState(false);
  const [showFirstPage, setShowFirstPage] = useState(true);

  function runShowLogin(){

 

      setShowFirstPage(false)
      setShowLogin(true);
      setShowDash(false)

  }


  function runShowDash(){

    setShowFirstPage(false);
    setShowLogin(false);
    setShowDash(true)

   

}


function runShowFirst(){

  setShowFirstPage(true);
  setShowLogin(false);
  setShowDash(false)

 

}


  return (

   

    <Box sx={{ flexGrow: 1 }}>

      <AppBar position="static">

        <Toolbar>

          <IconButton

            size="large"

            edge="start"

            color="inherit"

            aria-label="menu"

            sx={{ mr: 2 }}

          >

            <MenuIcon />

          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

          Krispy Kreme

          </Typography>

          <Button color="inherit" onClick={runShowFirst}>User</Button>

          
          <Button color="inherit" onClick={runShowLogin}>Logout
          
          </Button>

          <Button color="inherit" onClick={runShowLogin}>Cart</Button>


         

        </Toolbar>

      </AppBar>



      {showFirstPage && (
  <>


  {/* BISCOFF DONUT*/}

    <Box component="section" sx={{ p: 6, fontSize: '23px', border: '3px dashed grey', textAlign: 'center' }}>
      Krispy Kreme Biscoff Donut<br></br><br></br>
      
      A rich and creamy Biscoff-flavored donut, topped with white chocolate shavings and Biscoff crumbs.<br></br><br></br>

      Price: €2.50<br></br><br></br>

      <img
          src="/images/biscoff.png"
          alt="Logo"
          style={{ width: '150px', height: '150px' }}
        />
    </Box>


      {/* GALZED DONUT*/}


    <Box component="section" sx={{ p: 6, fontSize: '23px', border: '3px dashed grey', textAlign: 'center' }}>
      Krispy Kreme Glazed Donut<br></br><br></br>
      
      A classic glazed donut with a light, sweet glaze that melts in your mouth.<br></br><br></br>

      Price: €1.50<br></br><br></br>

      <img
          src="/images/glazed.png"
          alt="Logo"
          style={{ width: '150px', height: '150px' }}
        />
    </Box>


  {/* LEMON DONUT*/}

    <Box component="section" sx={{ p: 6, fontSize: '23px', border: '3px dashed grey', textAlign: 'center' }}>
      Krispy Kreme Lemon Donut<br></br><br></br>

      
      A lemon-filled donut with a soft, tangy lemon cream and a light dusting of powdered sugar.<br></br><br></br>

      Price: €2.00<br></br><br></br>

    <img
          src="/images/lemon.jpg"
          alt="Logo"
          style={{ width: '150px', height: '150px' }}
        />

    </Box>



  {/* NUTTY DONUT*/}

    <Box component="section" sx={{ p: 6, fontSize: '23px', border: '3px dashed grey', textAlign: 'center' }}>
      Krispy Kreme Nuts Donut<br></br><br></br>
      
      A chocolate-covered donut topped with a sprinkle of crunchy nuts and white chocolate drizzle.<br></br><br></br>

      Price: €2.75<br></br><br></br>

      <img
          src="/images/nuts.png"
          alt="Logo"
          style={{ width: '150px', height: '150px' }}
        />
    </Box>



  {/* SPRINKLES DONUT*/}

    <Box component="section" sx={{ p: 6, fontSize: '23px', border: '3px dashed grey', textAlign: 'center' }}>
      Krispy Kreme Sprinkles Donut<br></br><br></br>
      
      A chocolate-glazed donut topped with colorful sprinkles for extra fun.<br></br><br></br>

      Price: €2.25<br></br><br></br>

      <img
          src="/images/sprinkles.jpg"
          alt="Logo"
          style={{ width: '150px', height: '150px' }}
        />
    </Box>



  {/* LEMON DONUT*/}

    <Box component="section" sx={{ p: 6, fontSize: '23px', border: '3px dashed grey', textAlign: 'center' }}>
      Krispy Kreme Strawberry Donut<br></br><br></br>
     
      A strawberry-glazed donut with pink icing and sprinkles, perfect for berry lovers.<br></br><br></br>
      Price: €2.20<br></br><br></br>
      <img
          src="/images/strawberry.png"
          alt="Logo"
          style={{ width: '150px', height: '150px' }}
        />
    </Box>
  </>
)}



      



      {showLogin &&

          <Box component="section" sx={{ p: 2, border: '1px dashed grey'}}>

     

    This box is hidden until you click the button!. Imagine this is one page in your app!

          </Box>

      }




    {showDash &&

          <Box component="section" sx={{ p: 2, border: '1px dashed grey'}}>

     

            Let's pretend this is the dashboard!

          </Box>

      }



    </Box>

   


   

  );

}
