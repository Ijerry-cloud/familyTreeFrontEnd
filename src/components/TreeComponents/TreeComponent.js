import React, { useEffect, useState } from 'react';
import "./style.css";
import Tooltip from '@mui/material/Tooltip';
import { useMediaQuery } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useQuery } from 'react-query';
import { GET_FAMILY_TREE } from '../../utils/server_auth_routes';
import { fetchData } from '../../utils/util_query';
import useToken from '../../utils/useToken';
import ULoadingComponent from '../UComponents/ULoadingComponent';
import { Link } from 'react-router-dom';
import { injectArguments } from '../../utils/libs/utilFunctions';
import { APP_FAMILY_TREE_BIO_PAGE } from '../../utils/app_routes';


// const genealogy = {
//     root: {
//         id: "1",
//         name: "user A",
//         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//         spouse: null,
//         children: [
//             {
//                 id: "2",
//                 name: "user b",
//                 image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                 spouse: null,
//                 children: [
//                     {
//                         id: "3",
//                         name: "user e",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user f",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user f",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: [
//                             {
//                                 id: "3",
//                                 name: "user e",
//                                 image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                                 spouse: null,
//                                 children: []
//                             },
//                             {
//                                 id: "3",
//                                 name: "user f",
//                                 image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                                 spouse: null,
//                                 children: []
//                             },
//                         ]
//                     },
//                     {
//                         id: "3",
//                         name: "user f",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user e",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user f",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user f",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user f",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user e",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user f",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user f",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user f",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user e",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user f",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user f",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user f",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user e",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user f",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user f",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user f",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user e",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user f",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user f",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user f",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     }
//                 ]
//             },
//             {
//                 id: "3",
//                 name: "user c",
//                 image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                 spouse: null,
//                 children: []
//             },
//             {
//                 id: "4",
//                 name: "user d",
//                 image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                 spouse: null,
//                 children: [
//                     {
//                         id: "3",
//                         name: "user e",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user f",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user f",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: [
//                             {
//                                 id: "3",
//                                 name: "user e",
//                                 image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                                 spouse: null,
//                                 children: []
//                             },
//                             {
//                                 id: "3",
//                                 name: "user f",
//                                 image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                                 spouse: null,
//                                 children: []
//                             },
//                         ]
//                     },
//                     {
//                         id: "3",
//                         name: "user f",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user e",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user f",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user f",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user f",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user e",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user f",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user f",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user f",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user e",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user f",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user f",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user f",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user e",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user f",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user f",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user f",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user e",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user f",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user f",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     },
//                     {
//                         id: "3",
//                         name: "user f",
//                         image: "https://visualpharm.com/assets/534/Customer-595b40b75ba036ed117d7e2d.svg",
//                         spouse: null,
//                         children: []
//                     }
//                 ]
//             }
//         ]
//     }
// }




const TreeRoot = ({ genealogy }) => {

    const root = genealogy?.root;

    let data = [root?.first_name, root?.last_name, root?.gender];
    data = data.join("\n");

    return (
        <>
            <ul>
                <li key="0">
                    <Tooltip
                        title={
                            <div style={{ whiteSpace: 'pre-line' }}>{data}</div>
                            }
                        >
                        <Link to={injectArguments(APP_FAMILY_TREE_BIO_PAGE, {id: root?.id})}>
                            <img src={root?.image} alt="" /><span>{root?.first_name + " " + root?.last_name ?? ""}</span>
                        </Link>
                        {/* <a href="#"><img src={root?.image} alt="" /><span>{root?.first_name + " " + root?.last_name ?? ""}</span></a> */}
                    </Tooltip>
                    <TreeChildren treeChildren={root?.children} />
                </li>
            </ul>
        </>
    )
}


const TreeChildren = ({ treeChildren }) => {

    return (
        <>
            <ul key={treeChildren?.id}>
                {treeChildren.map((child) => {
                    let data = [child?.first_name, child?.last_name, child?.gender]
                    data = data.join("\n");
                 

                    return (
                        <>
                            <li key={child?.id}>
                                <Tooltip
                                    title={
                                        <div style={{ whiteSpace: 'pre-line' }}><Typography fontSize={30}>{data}</Typography></div>
                                    }
                                >
                                    {/* <a href="#"><img src={child?.image} alt="" /><span>{child?.first_name + " " + child?.last_name ?? ""}</span></a> */}
                                    <Link to={injectArguments(APP_FAMILY_TREE_BIO_PAGE, {id: child?.id})}>
                                        <img src={child?.image} alt="" /><span>{child?.first_name + " " + child?.last_name ?? ""}</span>
                                    </Link>
                                </Tooltip>
                                {(child?.children.length > 0) && <TreeChildren treeChildren={child?.children} />}
                            </li>
                        </>
                    )
                })}
            </ul>
        </>
    )
}

export default function TreeComponent() {

    const [zoom, setZoom] = useState("100%");
    const is_big_screen = useMediaQuery('(max-width:700px)');
    const { token } = useToken();
    let genealogy = {};

    useEffect(() => {

        // Change zoom level on mount
        // document.body.style.zoom = zoom;
        alert("changin width");
        window.innerWidth = 2000;

        return () => {
            // Restore default value
            document.body.style.zoom = "100%";
        };
    }, [zoom]);

    const updatePerCent = (value, type) => {

        console.log("trying to update");
        value = value.slice(0, -1);

        // convert the string to number and add an incerment of 10

        if (type == "add") {
            value = parseInt(value) + 10;
        } else {
            value = parseInt(value) - 10;
        }

        value = value.toString() + "%";
        setZoom(value);

        return null;
    }

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    // make the api call to the family tree
    // call the api that loads this data only once
    let payload_data = {
    };

    const result = useQuery(['family_tree',
        { url: GET_FAMILY_TREE, payload_data, authenticate: true, token }],
        fetchData,
        {
            retry: false,
            onSuccess: (res) => { console.log(res) },
            onError: (error) => { console.log(error) }
        }
    );

    const { isLoading, isError, data, error, isFetching } = result;
    genealogy = result?.data?.data?.data;


    if (isLoading) {
        return (<ULoadingComponent />);
    }

    return (
        <div>
            {/** if not big screen show warning */}
            {is_big_screen &&
                (<Box>
                    <Alert severity="warning">For best experience please use this application on a full screen computer</Alert>
                </Box>)
            }

            <Typography variant="h3" align="center">Family Tree</Typography>

            {/** button to handle the zoom in and out of the component */}
            {!is_big_screen && (
                <>
                    <Button sx={{ m: .2 }} variant="contained" onClick={() => { updatePerCent(zoom, "add") }}>Zoom In +</Button>
                    <Button sx={{ m: .2 }} variant="contained" onClick={() => { updatePerCent(zoom, "remove") }}>Zoom Out -</Button>
                </>
            )
            }
            {/**  */}

            <div className="tree">
                <TreeRoot genealogy={genealogy} />
            </div>
        </div>
    )

}