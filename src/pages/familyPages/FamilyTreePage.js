import React from 'react';
import { Container, Divider, Typography } from '@mui/material';
import TreeComponent from '../../components/TreeComponents/TreeComponent';


export default function FamilyTreePage(){
    
    return (
         <Container sx={{backgroundColor: "#fff", width: "100%", borderRadius: "1%"}}>
            <Divider><Typography variant="h4">Family Tree</Typography></Divider>
            <TreeComponent />
        </Container>
    )
}