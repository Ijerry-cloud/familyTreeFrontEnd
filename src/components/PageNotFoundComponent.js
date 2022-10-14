import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Error404Image from '../static/images/404.jpg';
import { blue } from '@mui/material/colors';
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import useMediaQuery from '@mui/material/useMediaQuery';


export default function PageNotFoundComponent() {

    const history = useHistory();
    const matches = useMediaQuery('(min-width:600px)');
    const avatarSizeWidth = matches ? "60vw" :  "95vw" // controls the size of the object

    return (
        <Box sx={{backgroundColor: blue[300], width: "100%"}}>
            <Grid container xs={12}
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  sx={{height:"100vh"}}>
                <Paper elevation={5}>
                    <Avatar
                        alt="Remy Sharp"
                        src={Error404Image}
                        variant="square"
                        sx={{ width: avatarSizeWidth, height: "50vh" }}
                    />
                </Paper>
                <Typography variant="h2">
                    Error 404
                </Typography>
                <Typography variant="subtitle">
                    Oops, Looks like this page doesn't exist
                </Typography>
                <Button variant="contained" sx={{m:2}} onClick={()=>{history.goBack()}}>Go back</Button>
            </Grid>
        </Box>
    )
}