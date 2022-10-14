import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import EventCard from '../../components/EventsComponents/EventCard';

const events = [1,2,3,4,5];

export default function EventsSearchPage(){
    const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <Container sx={{marginBottom: "10%", paddingTop: "2%", backgroundColor: "#fff", paddingBottom: "10%", borderRadius: "1%"}}>
                <Grid sx={{margin:"1%"}}>
                    <Grid item>
                    {/** search field filters */}
                    <FormControl variant="standard" fullWidth>
                        <InputLabel htmlFor="search-field">
                            Search for an event
                        </InputLabel>
                        <Input
                        id="search-field"
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                        />
                    </FormControl>
                    </Grid>

                     {/** date field filters and apply button filter*/}
                    <Grid container spacing={2} direction="row" sx={{marginY: "1%"}}>
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
                        <Grid item>
                            <Button variant="contained">Apply Filter</Button>  
                        </Grid>
                    </Grid>

                </Grid>
                <Grid container spacing={3} direction="column">
                    {/** divider line */}
                    <Grid item>
                        <Divider><Typography variant="h4">Our Events</Typography></Divider>
                    </Grid>

                    {/** display the actual events card */}
                    <Grid item>
                        <Grid container spacing={1}>
                            {events.map((item, index)=>{
                                return (
                                    <Grid item xs={12} sm={6} md={4} lg={3}>
                                        <EventCard />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Grid>


                    {/** pagination */}
                    <Grid>
                        <Stack spacing={2} >
                            <Pagination sx={{margin: "auto"}} count={10} color="primary" />
                        </Stack>
                    </Grid>

                </Grid>
            </Container>
        </LocalizationProvider>
    ); 
}