import React from "react";
import Navbar from "../components/Navbar";
import "../scss/style.scss";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Hidden from '@mui/material/Hidden';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function BasicGrid() {
    return (
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={6}>
                <Hidden mdDown>
                    <Grid item xs={3}>
                        <Item>navigation</Item>
                    </Grid>
                </Hidden>
                <Grid item xs={12} sm={8} md={6}>
                    <Item>content</Item>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <Item>right side content</Item>
                </Grid>
            </Grid>
        </Box>
    );
}


