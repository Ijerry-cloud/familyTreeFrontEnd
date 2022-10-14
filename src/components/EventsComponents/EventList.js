import React from 'react';
import Grid from '@mui/material/Grid';
import EventCard from './EventCard';


const events = [1,2,3,4,5];

export default function EventList(){
    return (
        <Grid container spacing={2} direction="column">
            {events.map((item, index) => {
                return (
                <Grid item>
                    <EventCard />
                </Grid>);
            })}
        </Grid>
    );
}