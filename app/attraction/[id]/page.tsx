'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import CircularProgress from '@mui/material/CircularProgress';

const AttractionDetail = () => {
    const { id } = useParams();
    const [attraction, setAttraction] = useState<any>(null);

    useEffect(() => {

        const fetchAttractionData = async () => {
            if (id) {
                try {
                    const response = await fetch(`/api/attraction/${id}`);
                    console.log('Response status:', response.status); // Log the response status
                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }
                    const data = await response.json();
                    console.log('Fetched data:', data); // Log the fetched data
                    setAttraction(data);
                    console.log('Set attraction:', data); // Log the set attraction
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchAttractionData();

    }, [id]);
    useEffect(() => {
        if (attraction && attraction.attraction.name) {
            document.title = attraction.attraction.name;
        }
    }, [attraction])
    return (
        <>
            <CssBaseline />
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ backgroundColor: 'black' }}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <TravelExploreIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, cursor: 'pointer' }}
                            onClick={() => {
                                window.location.href = '/';
                            }}
                        >
                            Travel-api
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container sx={{ py: 5 }}>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} sm={12} md={12}>
                        {attraction ? (
                            <Card sx={{
                                maxWidth: 1000,
                                margin: 'auto',
                                borderRadius: 5,
                                boxShadow: 3,
                                overflow: 'hidden', // To ensure the borderRadius affects the image
                                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                                '&:hover': {
                                    transform: 'scale(1.02)',
                                    boxShadow: 6,
                                },
                            }}>
                                <CardMedia
                                    component="img"
                                    height="500"
                                    image={attraction.attraction.coverimage}
                                    alt={attraction.attraction.name}
                                    sx={{
                                        objectFit: 'cover',
                                        borderBottom: '1px solid #ddd', // Optional: Adds a thin line below the image
                                    }}
                                />
                                <CardContent>
                                    <Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
                                        {attraction.attraction.name}
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                        {attraction.attraction.detail}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ) : (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                                <CircularProgress />
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default AttractionDetail;
