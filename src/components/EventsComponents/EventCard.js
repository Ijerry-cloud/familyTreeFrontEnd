import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import {Link} from "react-router-dom";
import { APP_EVENTS_DETAIL_PAGE } from '../../utils/app_routes';
import { injectArguments } from "../../utils/libs/utilFunctions";
import { useHistory } from "react-router-dom";



export default function EventCard(props){

  const history = useHistory();

  const handleBio = () => {
    // history.push(injectArguments());
    let bioUrl = injectArguments(APP_EVENTS_DETAIL_PAGE, { id: props.node.id });
    console.log("details_url:", bioUrl);
    history.push(bioUrl);
  }

    return (
        <Card sx={{ maxWidth: 500 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="150"
              image={props.node.cover_image}
              alt="people"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {props.node.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {props.node.details}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
          <Button size="small" color="primary" onClick={handleBio}>
                  View Details
              </Button>
          </CardActions>
        </Card>
      );
}