import React from 'react';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { Divider } from '@mui/material';
import { Stack } from '@mui/material';
import { CardMedia } from '@mui/material';

export default function EventDetail(){
    return (
        <Grid 
            container
            direction="column"
            justifyContent="center"
        >
            {/** event title */}
            <Grid item>
                <Typography variant="h4" sx={{margin: "auto"}}>
                    Event Title
                </Typography>
            </Grid>

            <Divider />

            {/** event dates */}
            <Grid item>
                <Stack direction="row" spacing={2}>
                    <Typography variant="subtitle2">
                        Start Date: 11th Thursday, June, 2020
                    </Typography>
                    <Typography variant="subtitle2">
                        Start Date: 11th Thursday, June, 2020
                    </Typography>
                </Stack>
            </Grid>
            
            <br />
            {/** event subtitle */}
            <Grid item>
                <Typography variant="subtitle2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras et metus molestie, varius odio eget, lobortis elit. Cras finibus tortor augue, eu placerat nisl efficitur sit amet.
                    Maecenas interdum ligula augue, eu dapibus neque gravida ac. Phasellus lacinia sapien at justo sodales
                    non vestibulum dolor accumsan. Curabitur tincidunt dolor in risus dictum,
                    a mollis magna rutrum. Nullam elementum, purus nec iaculis consequat, justo lectus fermentum metus.
                </Typography>
            </Grid>

            <br />
            {/** event image */}
            <CardMedia
                component='img'
                src="https://cdn.searchenginejournal.com/wp-content/uploads/2016/04/shutterstock_217119211-760x312.jpg" 
                sx={{ height: "60%", margin: "auto" }}
            />

            {/** event description, this should contain the html from the wysiwg */}
            <Grid item>
                <Typography>
                    Event Details ##
                </Typography>
            </Grid>
        </Grid>
        
    )
}