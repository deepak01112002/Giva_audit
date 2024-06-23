import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AppStyle from "../utils/colors"

import { signout } from '../helpers/cookies';

function ResponsiveAppBar() {
 

  return (
    <AppBar position="static"
    sx={{
      backgroundColor: '#242633',
    }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters
        sx={{
          backgroundColor: '#242633',
        }}
        >
          
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#f3f3f3',
              textDecoration: 'none',
            }}
          >
           V5
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
         
          </Box>
        
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#f3f3f3',
              textDecoration: 'none',
            }}
          >
            V5
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              href="/"
              sx={{ mr: 1 ,
                backgroundColor: '#f3f3f3',
                color:AppStyle.primaryBG,
                //hover: '#ffd700',
                '&:hover': {
                  backgroundColor: '#f3f3f3',
                },
              }}
              onClick={() => {
                // dispatch(resetAdminState())
                signout()}}
            >
              Logout
            </Button>
           
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;