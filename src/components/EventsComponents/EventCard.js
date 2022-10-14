import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import {Link} from "react-router-dom";
import { APP_EVENTS_DETAIL_PAGE } from '../../utils/app_routes';


export default function EventCard(){

    return (
        <Card sx={{ maxWidth: 500 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="150"
              image="https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
              alt="people"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                An Event
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Link to={APP_EVENTS_DETAIL_PAGE} style={{textDecoration: "none"}}>
              <Button size="small" color="primary">
                  View Details
              </Button>
            </Link>
          </CardActions>
        </Card>
      );
}