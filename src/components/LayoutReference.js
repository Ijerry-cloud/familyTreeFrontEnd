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
import { AddCircleOutlined, SubjectOutlined } from "@mui/icons-material";
import { useHistory, useLocation } from "react-router";
import Notes from '../pages/Notes';
import Create from '../pages/Create';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
    return {
        page: {
            backgroundColor : "#f9f9f9",
            width: "100%",
            padding: theme.spacing(3)
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
        },
        title: {
            padding: theme.spacing(2) 
        },
        appbar:{
            width: `calc(100% - ${drawerWidth}px)`
        },
        toolbar: theme.mixins.toolbar
}
})

function Layout({children, window}){

    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const menuItems = [
        {
            text: "My Notes",
            icon: <SubjectOutlined color="secondary" />,
            path: "/app/notes"
        },
        {
            text: "Add Notes",
            icon: <AddCircleOutlined  color="secondary" />,
            path: "/app/create"
        },
        {
            text: "Login",
            icon: <AddCircleOutlined  color="secondary" />,
            path: "/app/login"
        }
    ];

    const [mobileOpen, setMobileOpen] = React.useState(false);
  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
  
    const drawer = (
      <div>
        <Toolbar />
        <Divider />
        <List>
            {menuItems.map((item)=>{
                console.log(location.pathname, item?.path, location.pathname == item.path, classes.active) 
                return (<ListItem key={item?.text} 
                            button onClick={()=>{history.push(item?.path)}}
                            sx={location.pathname==item.path ? {backgroundColor: "#f4f4f4"}: null}
                >
                    <ListItemIcon>{item?.icon}</ListItemIcon>
                    <ListItemText>{item?.text}</ListItemText>
                </ListItem>)
            })
            }
        </List>
      </div>
    );
  
    const container = window !== undefined ? () => window().document.body : undefined;
  

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline />
            {/** app bar */}
            <AppBar
                position="fixed"
                sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    Responsive drawer
                </Typography>
                </Toolbar>
            </AppBar>

            {/** side bar */}
            <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor="left"
                classes={{ paper: classes.drawerPaper }}
            >
                <div>
                    <Typography variant="h5" sx={{m:2}}>
                        Ihediwa Family
                    </Typography>
                </div>

            </Drawer>
            <div className={classes.toolbar}>
                <Switch>
                    <Route path="/app/notes">
                        < Notes />
                    </Route>
                    <Route path="/app/create">
                        < Create />
                    </Route>
                </Switch>
            </div>
        
        </Box>
    )
}


export default withRouter(Layout);