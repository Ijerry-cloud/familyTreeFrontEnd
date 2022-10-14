import React from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { IconButton, Typography } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { DeleteOutlined } from "@mui/icons-material";


export default function NoteCard({note}) {

    return (
        <Card>
            <CardHeader 
                action={
                    <IconButton>
                        <DeleteOutlined />
                    </IconButton>
                }
                title={note?.title}
                subheader={note?.category}
            />
            <CardContent>
                <Typography variant="body2">
                    {note?.details}
                </Typography>
            </CardContent>
        </Card>
    )
}
