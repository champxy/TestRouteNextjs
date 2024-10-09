'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

interface Attraction {
  id: number;
  name: string;
  detail: string;
  coverimage: string;
  latitude: number;
  longitude: number;
}

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'black',
  boxShadow: theme.shadows[4],
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  overflow: 'hidden',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  textTransform: 'none',
  color: 'white', // Set text color to white
  backgroundColor: theme.palette.primary.main, // Set background color
  borderColor: 'transparent', // Ensure border color is transparent
  '&:hover': {
    backgroundColor: theme.palette.primary.dark, // Darker background on hover
    borderColor: 'transparent', // Ensure border color remains transparent
    color: 'white', // Ensure text color remains white on hover
  },
}));



const TitleContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
}));

export default function Page() {
  const [data, setData] = React.useState<Attraction[]>([]);

  React.useEffect(() => {
    document.title = "Travel of The World";
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch('/api/attraction'); // Corrected API route path
    const data = await response.json();
    setData(data);
  }

  return (
    <div>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <StyledAppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="travel-api"
              sx={{ mr: 2 }}
            >
              <TravelExploreIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Travel-api
            </Typography>
            API by Me Live Code
          </Toolbar>
        </StyledAppBar>
      </Box>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 5 }}>
        <TitleContainer>
          <Typography variant="h2" component="h1">
            Popular Destinations
          </Typography>
        </TitleContainer>
        <Grid container spacing={3}>
          {data.map((item) => (
            <Grid item xs={12} lg={4} key={item.id}>
              <StyledCard>
                <CardMedia
                  sx={{ height: 200 }}
                  image={item.coverimage}
                  title={item.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{
                      color: 'white', // Text color
                      backgroundColor: theme => theme.palette.background.default, // Background color
                      borderColor: 'transparent', // Border color
                      '&:hover': {
                        backgroundColor: theme => theme.palette.primary.dark, // Hover background color
                        borderColor: 'transparent', // Hover border color
                        color: 'white', // Hover text color
                      },
                    }}
                  >
                    <Link href={`/attraction/${item.id}`} passHref>
                      Read More!
                    </Link>
                  </Button>

                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
