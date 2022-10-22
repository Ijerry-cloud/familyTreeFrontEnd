import React from 'react';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import EventList from '../../components/EventsComponents/EventList';
import useToken from '../../utils/useToken';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { APP_EVENTS_SEARCH_PAGE, APP_EVENTS_CREATE_PAGE } from '../../utils/app_routes';
import { GET_EVENTS_PAGE } from '../../utils/server_auth_routes';
import Button from '@mui/material/Button';
import { useQuery } from "react-query";
import { fetchData } from '../../utils/util_query';
import ULoadingComponent from '../../components/UComponents/ULoadingComponent';


let recent_nodes = [

];

let upcoming_nodes = [

];

export default function EventsPage() {

    const {token} = useToken();

    let payload_data = {
    };

    const result = useQuery(['events_list',
        { url: GET_EVENTS_PAGE, payload_data, authenticate: true, token }],
        fetchData,
        {
            retry: false,
            onSuccess: (res) => {
                const data = res?.data?.data;
                //setNodes(data);
                console.log("data:", data);
                let now = new Date();
                console.log(now);
                upcoming_nodes = data.filter((node) => new Date(node.end_date) > now );
                recent_nodes = data.filter((node) => new Date(node.end_date) < now );
            },
            onError: (error) => { console.log(error) }
        }
    );

    const { isLoading, isError, data, error, isFetching } = result;

    if (isLoading) {
        return (<ULoadingComponent />);
    }

    return (
        <Container sx={{ marginBottom: "10%", backgroundColor: "#fff", paddingBottom: "10%", paddingTop: "2%", borderRadius: "1%" }}>
            <Grid container justifyContent="flex-end">
                <Link to={APP_EVENTS_CREATE_PAGE} style={{ textDecoration: "none" }}>
                    <Button variant="outlined">
                        Create New Event
                    </Button>
                </Link>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h3">Upcoming Events</Typography>
                    <EventList nodes={upcoming_nodes} />
                    <Typography sx={{ marginY: "3%" }}>
                        <Link to={APP_EVENTS_SEARCH_PAGE + `?page=1&recent_or_upcoming=Upcoming`}>Show More</Link>
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h3">Recent Events</Typography>
                    <EventList nodes={recent_nodes} />
                    <Typography sx={{ marginY: "3%" }}>
                        <Link to={APP_EVENTS_SEARCH_PAGE + `?page=1&recent_or_upcoming=Recent`}>Show More</Link>
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    )

}