import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  Tabs,
  Tab,
  IconButton,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { Delete, Logout } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getFavorites, removeFromFavorites } from '../../utils/favorites';

export default function MinListe() {
  const [tabValue, setTabValue] = useState(0);
  const [favorites, setFavorites] = useState({ ophold: [], aktiviteter: [] });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    // Load favorites
    loadFavorites();
  }, [navigate]);

  const loadFavorites = () => {
    const favs = getFavorites();
    setFavorites(favs);
  };

  const handleRemove = (type, id) => {
    removeFromFavorites(type, id);
    loadFavorites();
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };

  const currentFavorites = tabValue === 0 ? favorites.ophold : favorites.aktiviteter;
  const currentType = tabValue === 0 ? 'ophold' : 'aktiviteter';

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', pb: 8 }}>
      <Container sx={{ py: 6 }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2rem', md: '3rem' },
            fontFamily: '"Zen Loop", cursive',
            textAlign: 'center',
            color: '#2a4f57',
            mb: 4
          }}
        >
          Min Liste
        </Typography>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            centered
            sx={{
              '& .MuiTab-root': {
                fontSize: '1.1rem',
                fontWeight: 500,
                textTransform: 'none'
              }
            }}
          >
            <Tab label={`Ophold (${favorites.ophold.length})`} />
            <Tab label={`Aktiviteter (${favorites.aktiviteter.length})`} />
          </Tabs>
        </Box>

        {/* Favorites Grid */}
        {currentFavorites.length === 0 ? (
          <Alert severity="info" sx={{ maxWidth: 600, mx: 'auto' }}>
            Du har ingen favoritter i denne kategori endnu.
          </Alert>
        ) : tabValue === 0 ? (
          // Ophold Grid - One centered card per row
          <Box
            sx={{
              width: "100%",
              maxWidth: "600px",
              mx: 'auto',
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {currentFavorites.map((item) => (
              <Card
                key={item._id}
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  position: 'relative',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  }
                }}
              >
                {/* Remove Button */}
                <IconButton
                  onClick={() => handleRemove(currentType, item._id)}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    zIndex: 1,
                    '&:hover': {
                      backgroundColor: '#ff5252',
                      color: 'white'
                    }
                  }}
                >
                  <Delete />
                </IconButton>

                <CardMedia
                  component="img"
                  height="200"
                  image={item.image || '/placeholder.jpg'}
                  alt={item.title || item.name}
                  sx={{ objectFit: 'cover' }}
                />

                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    p: 3,
                    textAlign: 'center'
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: '"Zen Loop", cursive',
                      color: '#2a4f57',
                      mb: 2
                    }}
                  >
                    {item.title || item.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {item.shortdescription || item.description?.substring(0, 100) + '...'}
                  </Typography>

                  {item.price && (
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 'bold',
                        color: '#2a4f57',
                        mb: 2
                      }}
                    >
                      {item.price},-
                    </Typography>
                  )}

                  <Button
                    variant="contained"
                    onClick={() => navigate(`/${currentType}/${item._id}`)}
                    sx={{
                      backgroundColor: '#829B97',
                      color: 'white',
                      alignSelf: 'center',
                      px: 4,
                      '&:hover': {
                        backgroundColor: '#6d8680',
                      }
                    }}
                  >
                    Se detaljer
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
          // Aktiviteter Accordions
          <Box
            sx={{
              width: "100%",
              maxWidth: "600px",
              mx: 'auto',
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {currentFavorites.map((activity) => (
              <Box key={activity._id}>
                {/* Activity Image */}
                <Box
                  sx={{
                    width: "100%",
                    height: "200px",
                    backgroundImage: `url(${activity.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "20px 20px 0 0",
                  }}
                />

                {/* Activity Card */}
                <Box
                  sx={{
                    backgroundColor: "#33626C",
                    padding: "2rem",
                    borderRadius: "0 0 20px 20px",
                    position: "relative"
                  }}
                >
                  {/* Remove Button */}
                  <IconButton
                    onClick={() => handleRemove(currentType, activity._id)}
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      zIndex: 1,
                      '&:hover': {
                        backgroundColor: '#ff5252',
                        color: 'white'
                      }
                    }}
                  >
                    <Delete />
                  </IconButton>

                  {/* Activity Title */}
                  <Typography
                    sx={{
                      color: "#c9b591",
                      fontFamily: '"Zen Loop", cursive',
                      fontSize: "2.5rem",
                      fontWeight: 300,
                      marginBottom: "1rem",
                      textAlign: "center",
                    }}
                  >
                    {activity.title}
                  </Typography>

                  {/* Days and Time Info */}
                  <Box sx={{ marginBottom: "1.5rem" }}>
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: "1rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {activity.date}
                    </Typography>
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: "1rem",
                      }}
                    >
                      Kl. {activity.time}
                    </Typography>
                  </Box>

                  {/* Læs mere Accordion */}
                  <Accordion
                    sx={{
                      backgroundColor: "transparent",
                      boxShadow: "none",
                      border: "2px solid white",
                      borderRadius: "25px",
                      "&:before": {
                        display: "none",
                      },
                      "& .MuiAccordionSummary-root": {
                        minHeight: "60px",
                        borderRadius: "25px",
                      },
                      "& .MuiAccordionDetails-root": {
                        paddingTop: 0,
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon
                          sx={{ color: "white", fontSize: "2rem" }}
                        />
                      }
                      sx={{
                        color: "white",
                        "& .MuiAccordionSummary-content": {
                          justifyContent: "center",
                        },
                      }}
                    >
                      <Typography sx={{ fontSize: "1.2rem", fontWeight: 300 }}>
                        Læs mere
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: "0.95rem",
                          lineHeight: 1.6,
                        }}
                      >
                        {activity.description}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {/* Logout Button at Bottom */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <Button
            variant="outlined"
            startIcon={<Logout />}
            onClick={handleLogout}
            sx={{
              borderColor: '#2a4f57',
              color: '#2a4f57',
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              borderWidth: 2,
              '&:hover': {
                borderColor: '#2a4f57',
                backgroundColor: '#2a4f57',
                color: 'white',
                borderWidth: 2
              }
            }}
          >
            Log ud
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
