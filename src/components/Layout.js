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
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import Icon from '@mui/material/Icon';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import EventIcon from '@mui/icons-material/Event';
import HomeIcon from '@mui/icons-material/Home';
import { APP_EVENTS_PAGE,
         APP_FAMILY_TREE_PAGE,
         APP_GALLERY_PAGE,
         APP_GALLERY_CREATE_PAGE,
         APP_HOME_PAGE,
         APP_EVENTS_SEARCH_PAGE,
         APP_EVENTS_CREATE_PAGE,
         APP_EVENTS_DETAIL_PAGE,
         APP_LOGIN_PAGE,
         APP_CHANGE_PASSWORD_PAGE,
         APP_GET_PROFILE,
         APP_EDIT_PROFILE,
         APP_FAMILY_TREE_BIO_PAGE,
         APP_FAMILY_SEARCH_PAGE,
         APP_LETTERS_PAGE,
         APP_PROJECT_PAGE
        } from "../utils/app_routes";
import EventsPage from "../pages/eventPages/EventsPage";
import EventsSearchPage from "../pages/eventPages/EventsSearchPage";
import RestaurantLandingPage from "demos/RestaurantLandingPage";
import EventsCreatePage from "../pages/eventPages/EventsCreatePage";
import EventDetailPage from "../pages/eventPages/EventDetailPage";
import GalleryPage from "../pages/galleryPages/GalleryPage";
import LetterList from "../pages/letterPages/LetterList";
import CreateGalleryPage from "../pages/galleryPages/CreateGalleryPage";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import useToken from '../utils/useToken';
import ChangePasswordPage from "../pages/settingsPages/ChangePasswordPage";
import GetProfilePage from "../pages/settingsPages/GetProfilePage";
import EditProfilePage from "../pages/settingsPages/EditProfilePage";
import TreeBioComponent from "./TreeComponents/TreeBioComponent";
import UBalkanTree from "./TreeComponents/UBalkanTree";
import SearchComponent from "./TreeComponents/SearchComponent";
import BlogIndex from "../pages/BlogIndex";
import { red } from '@mui/material/colors';


const drawerWidth = 200;



const useStyles = makeStyles({
    active: {
        background : "#000000"
    }
})

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(0),
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
      backgroundColor: "#f9f9f9",
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




function Layout({children, window}){

    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const {token, setToken} = useToken(); 

    const theme = useTheme();

    const [open, setOpen] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const openMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
    const closeMenu = () => {
        setAnchorEl(null);
      };

    const menuItems = [
        {
            text: "Home",
            icon: <HomeIcon color="primary" />,
            path: APP_HOME_PAGE
        },
        {
            text: "Events",
            icon: <EventIcon color="error" />,
            path: APP_EVENTS_PAGE
        },
        {
            text: "Family Tree",
            icon: <NaturePeopleIcon color='warning' />,
            path: APP_FAMILY_TREE_PAGE
        },
        {
            text: "Gallery",
            icon: <ImageIcon color="success" />,
            path: APP_GALLERY_PAGE
        },
        {
            text: "Search Tree",
            icon: <PersonSearchIcon color="info" />,
            path: APP_FAMILY_SEARCH_PAGE
        },
        {
            text: "The Igbo Family",
            icon: <FamilyRestroomIcon color="secondary" />,
            path: APP_GALLERY_PAGE
        },
        {
            text: "Amumara(History)",
            icon: <HolidayVillageIcon color="info" />,
            path: APP_GALLERY_PAGE
        },
        {
            text: "Projects",
            icon: <Icon color="success">tips_and_updates</Icon>,
            path: APP_PROJECT_PAGE
        },
        {
            text: "'Letters",
            icon: <BorderColorIcon color="warning" />,
            path: APP_LETTERS_PAGE
        }
    ];

    /**
     * logout function
     * 
     */
     function logOutFunction() {
        
        // clear my token in local storage
        localStorage.clear();

        // navigate to the home page
        history.push(APP_LOGIN_PAGE);
    }

    /**
     * navigate to change password
     * 
     */
     function navigateChangePassword() {
         
        // navigate to the change password
        history.push(APP_CHANGE_PASSWORD_PAGE);
     }

     /**
     * navigate to get profile
     * 
     */
      function navigateGetProfile() {
         
        // navigate to get profile
        history.push(APP_GET_PROFILE);
     }

     /**
     * navigate to edit profile
     * 
     */
      function navigateEditProfile() {
         
        // navigate to edit profile
        history.push(APP_EDIT_PROFILE);
     }
  
    const drawer = (
      <div>
        <List>
            {menuItems.map((item)=>{
                return (<ListItem key={item?.text} 
                            button onClick={()=>{history.push(item?.path)}}
                            sx={location.pathname === item.path ? {backgroundColor: "#f4f4f4"}: null}
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
        <Box sx={{display: 'flex', maxWidth: "100vw", backgroundColor: "#f9f9f9"}}>
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
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    Ihediwa Family
                </Typography>
                <Typography>Hi, {token?.first_name ? token?.first_name : "#"}</Typography>
                <div>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={openMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={closeMenu}
                    >
                        <MenuItem onClick={navigateGetProfile}>View Profile</MenuItem>
                        <MenuItem onClick={navigateEditProfile}>Edit Profile</MenuItem>
                        <MenuItem onClick={navigateChangePassword}>
                            Change Password
                        </MenuItem>
                        <MenuItem onClick={logOutFunction}>Logout</MenuItem>
                    </Menu>
                    </div>
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
            <Main open={open}>
                <DrawerHeader />
                <Switch>
                    <Route path={APP_EVENTS_SEARCH_PAGE}>
                        <EventsSearchPage />
                    </Route>
                    <Route path={APP_EVENTS_CREATE_PAGE}>
                        <EventsCreatePage />
                    </Route>
                    <Route path={APP_EVENTS_DETAIL_PAGE}>
                        <EventDetailPage />
                    </Route>
                    <Route path={APP_EVENTS_PAGE}>
                        <EventsPage />
                    </Route> 
                    <Route path={APP_GALLERY_CREATE_PAGE}>
                        <CreateGalleryPage />
                    </Route>    
                    <Route path={APP_GALLERY_PAGE}>
                        <GalleryPage />
                    </Route>                                        
                    <Route path={APP_CHANGE_PASSWORD_PAGE}>
                        <ChangePasswordPage />
                    </Route>              
                    <Route path={APP_EDIT_PROFILE}>
                        <EditProfilePage />    
                    </Route>              
                    <Route path={APP_GET_PROFILE}>
                        <GetProfilePage />    
                    </Route>                         
                    <Route path={APP_FAMILY_TREE_BIO_PAGE}>
                        <TreeBioComponent />
                    </Route>     
                    <Route path={APP_FAMILY_TREE_PAGE}>
                        {/* <TreeComponent /> */}
                        <UBalkanTree />
                    </Route> 
                    <Route path={APP_FAMILY_SEARCH_PAGE}>
                        {/*     search_component */}
                        <SearchComponent />
                    </Route>  
                    <Route path={APP_LETTERS_PAGE}>
                        {/*     letters_component */}
                        <LetterList />
                    </Route>  
                    <Route path={APP_PROJECT_PAGE}>
                        {/*     projects_component */}
                        <BlogIndex />
                    </Route> 
                    <Route path={APP_HOME_PAGE}>
                        <RestaurantLandingPage />
                    </Route>

                </Switch>
            </Main>

            {/** Footer Component */}
            <Footer />
        </Box>
    )
}


export default withRouter(Layout);