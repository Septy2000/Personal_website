import React from 'react';
import { Grid, Typography, Paper } from '@mui/material';
import Link from 'next/link';
import PlainLink from '../links/PlainLink';

export default function ItemPaper({title, description, image, link}) {
    return (
        <PlainLink href={link}>
            <Paper elevation={2} sx={{ marginBottom: '16px', borderRadius:"20px", width: '30vh', height: '30vh', p: '40px'  }} >
                <Typography variant="h4" sx={{ textAlign: 'center' }}>{title}</Typography>
                <Typography variant="h6">{description}</Typography>
            </Paper>
        </PlainLink>
   
   
    );
}