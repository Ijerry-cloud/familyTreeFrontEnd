import React from 'react';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';



export default function PageContainer({title, children}){

    return (
        <Container sx={{marginBottom: "10%", backgroundColor: "#fff", paddingBottom: "10%", paddingTop: "2%", borderRadius: "1%"}}>
            <Divider><Typography variant="h4">{title}</Typography></Divider>
            {children}
        </Container>
    )
}