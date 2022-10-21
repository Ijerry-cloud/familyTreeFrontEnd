import React from 'react';
import Grid from '@mui/material/Grid';
import EventCard from './EventCard';


const events = [1,2,3,4,5];

export default function EventList(props){
    return (
        <Grid container spacing={2} direction="column">
            {props.nodes.map((item, index) => {
                return (
                <Grid item key={index}>
                    <EventCard node={item} />
                </Grid>);
            })}
        </Grid>
    );
}