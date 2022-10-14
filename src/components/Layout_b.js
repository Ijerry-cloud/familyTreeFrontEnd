import React from "react";
import { createStyles, makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import { Typography } from "@mui/material";
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import CssBaseline from '@mui/material/CssBaseline';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useHistory, useLocation } from "react-router";
import Notes from '../pages/Notes';
import Create from '../pages/Create';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Footer from './Footer';
import ImageIcon from '@mui/icons-material/Image';
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';
import EventIcon from '@mui/icons-material/Event';
import HomeIcon from '@mui/icons-material/Home';
import { APP_EVENTS_PAGE, APP_FAMILY_TREE_PAGE, APP_GALLERY_PAGE } from "../utils/app_routes";
import EventsPage from "../pages/eventPages/EventsPage";
import PageNotFoundComponent from "./PageNotFoundComponent";



const drawerWidth = 200;



const useStyles = makeStyles({
    page: {
        backgroundColor : "#f9f9f9",
        width: "100%"
    },
    drawer:{
        width: drawerWidth
    },
    drawerPaper:{
        width: drawerWidth
    },
    root: {
        display: "flex"
    },
    active: {
        background : "#000000"
    }
})

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }),
  );

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
        })(({ theme, open }) => ({
            transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
            }),
            ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            }),
  }));
  

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);


function Layout({children, window}){

    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const theme = useTheme();

    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const menuItems = [
        {
            text: "Home",
            icon: <HomeIcon color="primary" />,
            path: "/app/"
        },
        {
            text: "Events",
            icon: <EventIcon color="primary" />,
            path: APP_EVENTS_PAGE
        },
        {
            text: "Family Tree",
            icon: <NaturePeopleIcon color="primary" />,
            path: "/app/family_tree"
        },
        {
            text: "Gallery",
            icon: <ImageIcon color="primary" />,
            path: "/app/gallery"
        }
    ];

  
    const drawer = (
      <div>
        <List>
            {menuItems.map((item)=>{
                console.log(location.pathname, item?.path, location.pathname == item.path, classes.active) 
                return (<ListItem key={item?.text} 
                            button onClick={()=>{history.push(item?.path)}}
                            sx={location.pathname == item.path ? {backgroundColor: "#f4f4f4"}: null}
                >
                    <ListItemIcon>{item?.icon}</ListItemIcon>
                    <ListItemText>{item?.text}</ListItemText>
                </ListItem>)
            })
            }
        </List>
      </div>
    );
  
    return (
        <Box sx={{display: 'flex', maxWidth: "100vw", overflowX: "hidden"}}>
           <CssBaseline />

           {/** app bar */}
            <AppBar position="fixed" open={open}>
                <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    Ihediwa Family
                </Typography>
                </Toolbar>
            </AppBar>
            

            {/** side bar */}
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    </DrawerHeader>
                    <Divider />
                        {drawer}
                </Drawer>
            </Box>

            {/** Main App Router */}

            <Switch>
                <Route path="/app/notes">
                    < Notes />
                </Route>
                <Route path="/app/create">
                    < Create />
                </Route>
                <Route path={APP_EVENTS_PAGE}>
                    <EventsPage />
                </Route>    
                <Route path="/app/gallery">
                    <div>
                        <h1>Hello</h1>
                        <h1>Hello</h1>
                        <h1>Hello</h1>
                        <h1>Hello</h1>
                        <h1>Hello</h1>
                    </div>
                </Route>                                        
            </Switch>


            {/** Footer Component */}
            <Footer />
        </Box>
    )
}


export default withRouter(Layout);