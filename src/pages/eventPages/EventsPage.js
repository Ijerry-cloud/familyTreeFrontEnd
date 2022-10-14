import React from 'react';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import EventList from '../../components/EventsComponents/EventList';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { APP_EVENTS_SEARCH_PAGE, APP_EVENTS_CREATE_PAGE } from '../../utils/app_routes';
import Button from '@mui/material/Button';

export default function EventsPage(){

    return (
        <Container sx={{marginBottom: "10%", backgroundColor: "#fff", paddingBottom: "10%", paddingTop: "2%", borderRadius: "1%"}}>
            <Grid container justifyContent="flex-end">
                <Link to={APP_EVENTS_CREATE_PAGE} style={{textDecoration: "none"}}>
                    <Button variant="outlined">
                        Create New Event
                    </Button>
                </Link>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h3">Upcoming Events</Typography>
                    <EventList />
                    <Typography sx={{marginY: "3%"}}>
                        <Link to={APP_EVENTS_SEARCH_PAGE}>Show More</Link>
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h3">Recent Events</Typography>
                    <EventList />
                    <Typography sx={{marginY: "3%"}}>
                        <Link to={APP_EVENTS_SEARCH_PAGE}>Show More</Link>
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    )

}