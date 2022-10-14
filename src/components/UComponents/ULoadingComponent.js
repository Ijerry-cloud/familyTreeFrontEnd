import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { Stack } from '@mui/material';


export default function ULoadingComponent(){
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="50vh"
        >
            <Grid>
                <Stack>
                    <Grid item sx={{margin: "auto"}}>
                        <CircularProgress />
                    </Grid>
                    <Grid item>
                        <Typography>Loading...Please wait</Typography>
                    </Grid>
                </Stack>
            </Grid>
        </Box>
    )
}