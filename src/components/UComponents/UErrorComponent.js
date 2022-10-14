import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import { useHistory } from "react-router";

export default function UErrorComponent(){

    const history = useHistory();


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
                        <Typography>Oops something went wrong, please contact the site admin, or try again</Typography>
                    </Grid>
                    <Grid item sx={{margin: "auto"}}>
                        <Button 
                            variant="contained"
                            onClick={history.goBack}
                        >Go Back</Button>
                    </Grid>
                </Stack>
            </Grid>
        </Box>
    )
}