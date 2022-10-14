import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { TextField,
         Button
        } from '@mui/material';
import { MenuItem } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';


const GALLERY_TYPE = "gallery";
const VIDEO_TYPE = "video";

const Input = styled('input')({
    display: 'none',
  });

const VideoForm = () => {
    return (
        <>
            <Grid container>
                <TextField
                    id="title"
                    label="Title"
                    placeholder="Placeholder"
                />
                <TextField
                    id="description"
                    label="Description"
                    placeholder="Description"
                />
                <TextField
                    id="tags"
                    label="Tags"
                    placeholder="Tags"
                />
                <TextField
                    id="video_url"
                    label="Video URL"
                    placeholder="Video URL"
                />
             </Grid>
        </>
    )
}

const ImageForm  = () => {
   return ( 
        <>
            <Grid container>
                <TextField
                    id="title"
                    label="Title"
                    placeholder="Placeholder"
                />
                <TextField
                    id="description"
                    label="Description"
                    placeholder="Description"
                />
                <TextField
                    id="tags"
                    label="Tags"
                    placeholder="Tags"
                />
                
                    <label htmlFor="input-file" style={{margin: 7}}>
                        <Input accept="image/*" id="input-file" multiple type="file" onChange={(e)=>{console.log(e)}}/>
                        <Button variant="contained" component="span" size="large">
                            Upload File
                        </Button>
                    </label>
                
            </Grid>
        </>
   ) 
}

export default function GalleryCreateForm(){

    const [type, setType] = useState(GALLERY_TYPE); 

    const handleChange = (event) => {
        setType(event.target.value);
      };

    return (
        <Grid container>
            <Box
            novalidate
            component="form"
            autoComplete="off"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '50ch' }
            }}
            >
                    <TextField
                        id="galleryType"
                        select
                        label="Select"
                        value={type}
                        fullWidth
                        onChange={handleChange}
                        helperText="Please select a gallery type"
                        >
                        {[GALLERY_TYPE, VIDEO_TYPE].map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>

                {type === GALLERY_TYPE && (
                    <ImageForm />
                )}

                {type === VIDEO_TYPE && (
                    <VideoForm />
                )}

                
                {/** submit button */}
                <Grid item m={1}>
                    <Button variant="contained">Submit</Button>
                </Grid>
            </Box>
        </Grid>
    )
}