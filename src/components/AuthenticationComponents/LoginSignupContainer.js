import React, { useState } from 'react'
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LoginForm from '../AuthenticationComponents/LoginForm';
import SignupForm from '../AuthenticationComponents/SignupForm'; 


const LoginSignupContainer = ()=>{

  const [value,setValue]=useState(0)
  const handleChange = (event, newValue) => {
      setValue(newValue);
    };

  const paperStyle={width:340,margin:"20px auto", height: "50px"}
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography component="div">{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
    return (
        <Box sx={{ height: "100vh", display:"flex", background: "linear-gradient(to right, #00b4db, #0083b0);", overflow: "auto"}}>
            <Paper elevation={20} style={paperStyle}>
              <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="tabs setup"
                centered
              >
                <Tab label="Sign In" />
              
                <Tab label="Sign Up" />
              </Tabs>
              <TabPanel value={value} index={0}>
            <LoginForm handleChange={handleChange}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <SignupForm />
            </TabPanel>
          </Paper>
        </Box>
      
    )
}

export default LoginSignupContainer;