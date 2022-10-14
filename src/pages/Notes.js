import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import NoteCard from "../components/NoteCard";
import { Typography } from "@mui/material";


export default function Notes() {


  const [notes, setNotes] = useState([]);
  

  useEffect(()=>{
      axios.get("http://localhost:8000/notes")
        .then((response)=>{
          console.log("response: ", response.data);
          setNotes(response.data);
        })
  }, [])

  return (
    <div>

      <Container>
        <Typography variant="h5">Hello</Typography>
        <Grid container spacing={3}>
          { notes.map((note)=>{
              return (
                <Grid item key={note?.id} xs={12} sm={6} md={4} lg={3}>
                    {/* <Paper>{note?.title}</Paper> */}
                    <NoteCard note={note}/>
                </Grid>
              )
            }) 
          }
        </Grid>
      </Container>
    </div>
  )
}
