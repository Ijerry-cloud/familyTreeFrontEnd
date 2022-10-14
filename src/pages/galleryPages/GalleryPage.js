import React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import GalleryList from '../../components/GalleryComponents/GalleryList';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
import { APP_GALLERY_CREATE_PAGE } from '../../utils/app_routes';
import { Link } from 'react-router-dom';

export default function GalleryPage(){

    return (
        <Container sx={{marginBottom: "10%", backgroundColor: "#fff", paddingBottom: "10%", paddingTop: "2%", borderRadius: "1%"}}>
            <Divider><Typography variant="h4">Our Gallery</Typography></Divider>
            <Grid container justifyContent="flex-end" m={1}>
                <Stack spacing={2} direction="row">
                <TextField
                    placeholder="Search Gallery"
                    id="searchFilter"
                    sx={{ width: '25ch', padding: "0%" }}
                    variant="standard"
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                    }}
                />
                    <Button variant="outlined">
                        See Videos
                    </Button>   
                    <Link to={APP_GALLERY_CREATE_PAGE} style={{textDecoration: "none"}}>
                        <Button variant="outlined">
                            Add Item to Gallery
                        </Button>
                    </Link> 
                </Stack>
            </Grid>
            {/** Gallery Components */}
            <Grid container spacing={2}>
                <GalleryList />
            </Grid>

            <Grid>
                <Stack spacing={2} >
                    <Pagination sx={{margin: "auto"}} count={10} color="primary" />
                </Stack>
            </Grid>
        </Container>
    )
}
