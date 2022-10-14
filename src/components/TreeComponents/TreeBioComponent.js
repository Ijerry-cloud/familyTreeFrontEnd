import React, { useState } from "react";
import OrgChart from 'react-balkangraph-orgchart'
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { useParams, useHistory } from "react-router-dom";
import { injectArguments } from "../../utils/libs/utilFunctions";
import { GET_FAMILY_BIO_PAGE } from "../../utils/server_auth_routes";
import { useQuery } from 'react-query';
import { fetchData } from '../../utils/util_query';
import useToken from '../../utils/useToken';
import ULoadingComponent from '../UComponents/ULoadingComponent';
import { handleApiError } from "../../utils/libs/handleApiError";
import InfoDialog from './infodialog'
import { APP_FAMILY_TREE_BIO_PAGE } from '../../utils/app_routes';


// import { useQuery } from 'use-query';

let nodes = [
  
];


export default function TreeBioComponent(){

    const params = useParams();
    const profile_id = params?.id;
    const [profile, setProfile] = useState({});
    const {token} = useToken();
    const [open, setOpen] = React.useState(false);
    const [bio, setBio]  = React.useState({});
    const history = useHistory();

    const handleClose = () => {
        setOpen(false);
        setBio({});
    };

    const handleBio = () => {
        setOpen(false);
        //setNodes([]);

        // history.push(injectArguments());
        let bioUrl = injectArguments(APP_FAMILY_TREE_BIO_PAGE, {id: bio?.id});
        history.push(bioUrl);
    }

    const handleNodeClick = (id) => {
        let filteredNode = nodes.filter((node ) => node?.id == id );
        let selectedNode = filteredNode.length > 0 ? filteredNode[0] : {};
        setBio(selectedNode);
        setOpen(true);
    }

    let url = injectArguments(GET_FAMILY_BIO_PAGE, {id: profile_id});

    console.log("url", url);

    let payload_data = {};
    // make my api call 
    const result = useQuery(['tree_bio',
        { url, payload_data, authenticate: true, token }],
        fetchData,
        {
            retry: false,
            onSuccess: (res) => {
                let data = res?.data?.data;
                nodes = data?.tree; 
                let uprofile = data;
                console.log('data', data)
                setProfile(uprofile);
             },
            onError: (error) => { 
                handleApiError(error);
            }
        }
    );

    const { isLoading, isError, data, error, isFetching } = result;
    console.log("profile: ", profile);

    if (isLoading){
        return (
            <ULoadingComponent />
        )
    }

    return (
        <Box sx={{m:3}}>
            <Paper>
                <Grid container spacing={2} p={2}>
                <Typography variant="h3" p={2}> { profile?.first_name + " " + profile?.last_name }</Typography>
                <Grid container p={2}>
                    <Grid item xs={12} md={3} alignItems="center">
                        <Avatar sx={{width: 300, height: "auto"}} variant="square" src={profile?.image} />
                    </Grid>
                    <Grid item  xs={12} md={9}>
                        {/** spouse */}
                       {  (profile?.spouse) != null && 
                        <>
                            <Typography variant="h3">Spouse</Typography>
                            <Typography><strong><em> { profile?.spouse?.first_name + " "  + profile?.spouse?.last_name } </em></strong></Typography>
                        </>
                       }

                        {/** children */}
                        { (profile?.children).length != 0  && 
                            <>
                                <Typography variant="h3">Children</Typography>
                                <ul>
                                    {
                                    (profile?.children).map((child) => {
                                        return <li style={{marginLeft: 15}}><strong><em>{child?.first_name + " " + child?.last_name}</em></strong></li>
                                    })
                                    }
                                </ul>
                            </>
                        }
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography 
                    //dangerouslySetInnerHTML={{ __html: profile?.bio }}
                    style={{overflowWrap: 'break-word'}}>{profile?.bio}</Typography>
                </Grid>
                <Grid container m={3} justifyContent="center" alignItems="center">
                    <ImageListItem key={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e`}>
                            <img style={{width: "100%"}}
                            src={`https://imageio.forbes.com/specials-images/imageserve/6124bd186874c8d0ee2e80fa/Six-new--signings--will-join-the-first-team-at-FC-Barcelona-/960x0.jpg?format=jpg&width=960`}
                            alt="family photo"
                            loading="lazy"
                            />
                            <ImageListItemBar
                            title="Family photo"
                            subtitle="Family photo"
                            actionIcon={
                                <IconButton
                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                aria-label={`info about item.title`}
                                >
                                <InfoIcon />
                                </IconButton>
                            }
                            />
                        </ImageListItem>
                </Grid>

                {profile?.bio2 && (<Grid item>
                    <Typography 
                    //dangerouslySetInnerHTML={{ __html: profile?.bio }}
                    style={{overflowWrap: 'break-word'}}>{profile?.bio2}</Typography>
                </Grid>
                )}

                {profile?.bio3 && (<Grid item>
                    <Typography 
                    //dangerouslySetInnerHTML={{ __html: profile?.bio }}
                    style={{overflowWrap: 'break-word'}}>{profile?.bio3}</Typography>
                </Grid>
                )}

                {profile?.bio4 && (<Grid item>
                    <Typography 
                    //dangerouslySetInnerHTML={{ __html: profile?.bio }}
                    style={{overflowWrap: 'break-word'}}>{profile?.bio4}</Typography>
                </Grid>
                )}
                
                {profile?.bio5 && (<Grid item>
                    <Typography 
                    //dangerouslySetInnerHTML={{ __html: profile?.bio }}
                    style={{overflowWrap: 'break-word'}}>{profile?.bio5}</Typography>
                </Grid>
                )}

                </Grid>
                <InfoDialog open={open} handleClose={handleClose} bio={bio} handleBio={handleBio}/>
                <Typography variant="h4">Family Tree</Typography>
                
                <OrgChart
                    onCardClick={(object) => {handleNodeClick(object?.node?.id);}}
                    nodes={nodes}
                    className='org-chart-container'
                    id='my-custom-id-2'
                    config={{
                        nodeBinding: { 
                        img_0: "image",
                        field_0: "full_name",
                        field_1: "gender"
                        }
                    }} 
                />
            </Paper>
        </Box>

    )

}