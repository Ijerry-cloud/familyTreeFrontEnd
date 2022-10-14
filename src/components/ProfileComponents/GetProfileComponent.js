import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import UTextComponent from '../ProfileComponents/UTextComponent';
import { useQuery } from "react-query";
import { GET_UPDATE_PROFILE_URL } from '../../utils/server_auth_routes';
import useToken from '../../utils/useToken';
import {fetchData} from '../../utils/util_query';
import ULoadingComponent from '../../components/UComponents/ULoadingComponent';
import UErrorComponent from '../../components/UComponents/UErrorComponent';
import { calculate_age } from '../../utils/libs/utilFunctions';


export default function GetProfileComponent(){

    const {token} = useToken();

    // call the api that loads this data only once
    let payload_data = {
    };
    const result = useQuery(['profile',
                            { url: GET_UPDATE_PROFILE_URL, payload_data, authenticate:true, token }],
                            fetchData, 
                            {retry:false}
                            );
    const {  isLoading, isError, data, error, isFetching } = result;
    const profile = data?.data?.data;

    let avatar = profile?.image ? profile?.image : "http://cdn.onlinewebfonts.com/svg/img_264570.png";
    
    let renderAvatar = {
        first_name: profile?.first_name,
        last_name: profile?.last_name,
        middle_name: profile?.middle_name,
        hobbies: profile?.hobbies,
        gender: profile?.gender,
        date_of_birth: profile?.date_of_birth,
    }

    if (renderAvatar?.date_of_birth){
        let age = calculate_age(renderAvatar?.date_of_birth);
        renderAvatar.age = `${age} year(s)`;
    }

    if (isLoading){
        return (
            <ULoadingComponent />
        )
    }

    if (isError){
        return (
            <UErrorComponent />
        );
    }

    return (
        <Box>
            <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                    <Avatar
                        variant="square"
                        alt="#profilePicture"
                        src={avatar}
                        sx={{ width: "80%", height: "auto", borderRadius: "5%", margin: "0 auto" }}
                    />
                </Grid>
                <Grid item xs={12} md={6}> 
                    <Paper elevation={2}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>

                            {Object.keys(renderAvatar).map((itemKey, index) => {
                                return (<UTextComponent key={index} label={itemKey} value={renderAvatar[itemKey]} />)
                            })}

                        </CardContent>
                    </Card>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}