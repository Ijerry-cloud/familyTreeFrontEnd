import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';



export default function Footer() {
    return (
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
          <Container maxWidth="md">
            <Toolbar>
              <Typography variant="body1" color="inherit" sx={{margin: "0 auto"}}>
                    Copyright &copy; {new Date().getFullYear()}, Ihediwa Family
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
    )
}