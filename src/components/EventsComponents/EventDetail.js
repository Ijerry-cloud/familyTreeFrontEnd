import React from 'react';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { Divider } from '@mui/material';
import { Stack } from '@mui/material';
import { CardMedia } from '@mui/material';
import { useParams, useHistory } from "react-router-dom";
import { injectArguments } from "../../utils/libs/utilFunctions";
import { GET_EVENTS_DETAIL_PAGE } from "../../utils/server_auth_routes";
import { fetchData } from '../../utils/util_query';
import useToken from '../../utils/useToken';
import { handleApiError } from "../../utils/libs/handleApiError";
import { useQuery } from 'react-query';
import ULoadingComponent from "../UComponents/ULoadingComponent";

let event = [

];

export default function EventDetail() {

    const params = useParams();
    const event_id = params?.id;
    const { token } = useToken();
    const history = useHistory();

    let url = injectArguments(GET_EVENTS_DETAIL_PAGE, { id: event_id });

    console.log("url", url);

    let payload_data = {};
    // make my api call 
    const result = useQuery(['event_detail',
        { url, payload_data, authenticate: true, token }],
        fetchData,
        {
            retry: false,
            onSuccess: (res) => {
                let data = res?.data?.data;
                event = data
                console.log('data', data)
            },
            onError: (error) => {
                handleApiError(error);
            }
        }
    );

    const { isLoading, isError, data, error, isFetching } = result;

    if (isLoading) {
        return (
            <ULoadingComponent />
        )
    }


    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
        >
            {/** event title */}
            <Grid item>
                <Typography variant="h4" sx={{ margin: "auto" }}>
                    {event.title}
                </Typography>
            </Grid>

            <Divider />

            {/** event dates */}
            <Grid item>
                <Stack direction="row" spacing={2}>
                    <Typography variant="subtitle2">
                        {`Date: ${new Date(event.end_date).toString()}`}
                    </Typography>
                </Stack>
            </Grid>

            <br />
            {/** event subtitle */}
            <Grid item>
                <Typography variant="subtitle2">
                    {event.details}
                </Typography>
            </Grid>

            <br />
            {/** event image */}
            <CardMedia
                component='img'
                src={event.cover_image}
                sx={{ height: "60%", margin: "auto" }}
            />
            <br />
            {/** event description, this should contain the html from the wysiwg */}
            <Grid item>
                <Typography>
                    {event.details}
                </Typography>
            </Grid>

            <br />
            <Grid item>
                <Typography>
                    {event.details}
                </Typography>
            </Grid>

            <br />

            <Grid item>
                <Typography>
                    {event.details}
                </Typography>
            </Grid>
        </Grid>

    )
}