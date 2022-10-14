import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import  TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import Divider from '@mui/material/Divider';

export default function EventsCreatePage(){

    const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const EditorComponent = () => (<Editor
                                        placeholder="write something here"
                                        wrapperClassName="demo-wrapper"
                                        editorClassName="demo-editor"
                                        toolbarClassName="toolbar-class"
                                        
                                    />
                                    )

    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <Container sx={{marginBottom: "10%", backgroundColor: "#fff", paddingBottom: "5%", paddingTop: "2%", borderRadius: "1%"}}>
                <Grid container justifyContent="center">
                    <Typography variant="h4" m={1}>Create your event</Typography>
                </Grid>

                <Divider />

                <Box
                    component="form"
                    sx={{
                    '& .MuiTextField-root': { m: 1, width: '40ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Grid container>
                        <Grid item>
                            <TextField
                                required
                                id="Event_Title"
                                label="Event Title"
                                defaultValue=""
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="Event_Description"
                                label="Event Short Description"
                                defaultValue=""
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item>                           
                                <MobileDatePicker
                                    label="Event Start Date"
                                    inputFormat="MM/dd/yyyy"
                                    value={value}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Grid>
                        <Grid item>
                            <MobileDatePicker
                                    label="Event End Date"
                                    inputFormat="MM/dd/yyyy"
                                    value={value}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item>
                            <TextField
                                id="Tags"
                                label="Tags"
                                defaultValue=""
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                component="label"
                                sx={{marginY: "5%"}}
                                >
                                Upload Image
                                <input
                                    type="file"
                                    hidden
                                />
                                {/* <Input accept="image/*" id="contained-button-file" multiple type="file" hidden={true} /> */}
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid sx={{border: "1px solid black", minHeight: "30vh"}}>
                        <EditorComponent />
                    </Grid>

                    <Grid container justifyContent="center" m={1}>
                        <Button variant="contained">
                            submit
                        </Button>
                    </Grid>
                    
                </Box>
            </Container>
       </LocalizationProvider>
    );
}

