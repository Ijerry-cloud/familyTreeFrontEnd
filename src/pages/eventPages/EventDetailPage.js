import React from 'react';
import Container from '@mui/material/Container';
import EventDetail from '../../components/EventsComponents/EventDetail';


export default function EventDetailPage(){

    return (
        <Container sx={{marginBottom: "10%", backgroundColor: "#fff", paddingBottom: "10%", paddingTop: "2%", borderRadius: "1%"}}>
            <EventDetail />
        </Container>
    )
}