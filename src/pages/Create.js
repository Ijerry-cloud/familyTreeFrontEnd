import React from 'react';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import { Container } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';


const style = {
  fontSize: 60,
  backgroundColor: "violet",
  '&:hover': {
    backgroundColor: "red"
  }
}

const fieldStyle = {
  marginTop:1,
  marginBottom: 1,
  display: "block"
}


export default function Create() {

 


  const handleOnClick = () => {
    alert("what are u trying to submit");
  }

  const handleSubmit = (e) => {
    e.preventDefault();



  }

  return (
    <Container>
      <Typography variant="h6" component="h2" color="textSecondary" gutterBottom>
        Create a new note
      </Typography>
      
      {/** icons  */}
      <br />

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField 
          sx={fieldStyle}
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
        />
        <TextField 
          sx={fieldStyle}
          label="Details"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
        />
      
      </form>

      <Button 
        //sx={style}
        type="submit"
        variant="contained"
        startIcon={<SendIcon />}
        onClick={()=>{handleOnClick()}}
      >
          Submit
      </Button>
    </Container>
    
  )
}
