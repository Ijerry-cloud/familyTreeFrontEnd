import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { humanize } from '../../utils/libs/utilFunctions';

const textSize = 14;

export default function UTextComponent({ label, value}){

    label = humanize(label);
    
    return (
        <>
            <Box>
                <Typography sx={{ fontSize: textSize }} color="text.secondary" gutterBottom>
                    {label}
                </Typography>
                <Typography variant="h5" component="div">
                    {value ? value : "#"}
                </Typography>
            </Box>
        </>
    )
}