import React, { Component, useEffect, useState } from 'react'

import OrgChart from 'react-balkangraph-orgchart'
import 'react-balkangraph-orgchart/dist/index.css'
import { useQuery } from "react-query";
import { Typography, useMediaQuery } from '@mui/material';
import ULoadingComponent from '../UComponents/ULoadingComponent';
import MuiAlert from '@mui/material/Alert';
import { GET_FAMILY_TREE_V2 } from '../../utils/server_auth_routes';
import useToken from '../../utils/useToken';
import { Box } from '@mui/material';
import { fetchData } from '../../utils/util_query';
import { useHistory } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { injectArguments } from '../../utils/libs/utilFunctions';
import { APP_FAMILY_TREE_BIO_PAGE } from '../../utils/app_routes';
import InfoDialog from './infodialog'
import { set } from 'lodash';

// import avatar from 'src/assets/avatar.svg'

const avatar = "https://cdn4.iconfinder.com/data/icons/online-shopping-line-11/32/Artboard_46-512.png";

let nodes = [
  
];


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
  
export default function UBalkanTree(){


    const [open, setOpen] = React.useState(false);
    const [bio, setBio]  = React.useState({});
    //const [nodes, setNodes] = React.useState([]);
    const {token} = useToken();
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


     // make the api call to the family tree
    // call the api that loads this data only once
    let payload_data = {
    };
    const is_big_screen = useMediaQuery('(max-width:700px)');

    const result = useQuery(['family_tree',
        { url: GET_FAMILY_TREE_V2, payload_data, authenticate: true, token }],
        fetchData,
        {
            retry: false,
            onSuccess: (res) => {
                const data = res?.data?.data;
                //setNodes(data);
                nodes = data;
             },
            onError: (error) => { console.log(error) }
        }
    );

    const { isLoading, isError, data, error, isFetching } = result;


    if (isLoading) {
        return (<ULoadingComponent />);
    }

    return (
            <div style={{width:"100%", height:"600px"}} id="tree">


                {/** if not big screen show warning */}
                {is_big_screen &&
                    (<Box>
                        <Alert severity="warning">For best experience please use this application on a full screen computer</Alert>
                    </Box>)
                }
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
                
            </div>
            
    )
}

