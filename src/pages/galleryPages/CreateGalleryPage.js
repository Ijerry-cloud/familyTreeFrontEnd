import React from 'react';
import Container from '@mui/material/Container';
import { Divider,
         Typography
        } from '@mui/material';
import GalleryCreateForm from '../../components/GalleryComponents/GalleryCreateForm';

export default function CreateGalleryPage(){

    return (
        <Container sx={{marginBottom: "10%", backgroundColor: "#fff", paddingBottom: "10%", paddingTop: "2%", borderRadius: "1%"}}>
            <Divider><Typography variant="h4">Add An Item To Gallery</Typography></Divider>
            <GalleryCreateForm />
        </Container>
    )
}