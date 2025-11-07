import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Box, Button, Snackbar, Alert } from "@mui/material";
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { addToFavorites, removeFromFavorites, isFavorite } from '../../utils/favorites';

export default function OpholdDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [stay, setStay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const isLoggedIn = Boolean(localStorage.getItem('authToken'));

  useEffect(() => {
    const fetchStay = async () => {
      try {
        // Try different endpoint patterns
        let response = await fetch(`http://localhost:3042/stay/${id}`);
        if (!response.ok) {
          console.log("First endpoint failed, trying alternative...");
          response = await fetch(`http://localhost:3042/stays/${id}`);
        }
        const data = await response.json();
        console.log("Stay Detail Response:", data);

        // Handle the API response structure - data is an array with one item
        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
          console.log("Setting stay from data.data[0]:", data.data[0]);
          setStay(data.data[0]);
        } else if (data.data) {
          setStay(data.data);
        } else {
          setStay(data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stay:", error);
        setLoading(false);
      }
    };

    fetchStay();
  }, [id]);

  useEffect(() => {
    if (stay) {
      setIsFavorited(isFavorite('ophold', stay._id));
    }
  }, [stay]);

  const handleFavoriteToggle = () => {
    if (!isLoggedIn) {
      setSnackbar({ open: true, message: 'Du skal være logget ind for at tilføje favoritter', severity: 'warning' });
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    if (!stay) return;

    const isCurrentlyFavorite = isFavorite('ophold', stay._id);
    
    if (isCurrentlyFavorite) {
      removeFromFavorites('ophold', stay._id);
      setSnackbar({ open: true, message: 'Fjernet fra Min Liste', severity: 'info' });
      setIsFavorited(false);
    } else {
      addToFavorites('ophold', stay);
      setSnackbar({ open: true, message: 'Tilføjet til Min Liste', severity: 'success' });
      setIsFavorited(true);
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (!stay) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Typography>Stay not found</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* Hero Section with Image */}
      <Box
        sx={{
          position: "relative",
          height: "60vh",
          backgroundImage: stay.image ? `url(${stay.image})` : "none",
          backgroundColor: stay.image ? "transparent" : "#2a4f57",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            position: "relative",
            zIndex: 1,
            fontSize: { xs: "3rem", md: "5rem" },
            fontFamily: "Zen Loop, cursive",
            textAlign: "center",
            px: 2,
            textTransform: "capitalize",
          }}
        >
          {stay.title}
        </Typography>
      </Box>

      {/* Content Section */}
      <Box
        sx={{
          backgroundColor: "#33626C",
          color: "white",
          py: { xs: 6, md: 8 },
          px: { xs: 3, md: 6 },
          maxWidth: { xs: '100%', md: '800px' },
          margin: '0 auto',
        }}
      >
        <Container maxWidth="md">
          {/* Main Title */}
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontFamily: '"Zen Loop", cursive',
              textAlign: "center",
              mb: 4,
              lineHeight: 1.3,
            }}
          >
            Tag væk en weekend, med én du holder af
          </Typography>

          {/* Description */}
          <Typography
            sx={{
              textAlign: "center",
              fontSize: { xs: "0.95rem", md: "1rem" },
              lineHeight: 1.8,
              mb: 5,
              opacity: 0.95,
            }}
          >
            {stay.description}
          </Typography>
          <Typography variant="h2" sx={{ mb: 2, textAlign: "center" }}>
            Inkludere
          </Typography>
          {/* Features List */}
          <Box sx={{ mb: 4, textAlign: "center" }}>
            {stay.includes &&
            Array.isArray(stay.includes) &&
            stay.includes.length > 0 ? (
              stay.includes.map((item, index) => (
                <Typography key={index} sx={{ mb: 1 }}>
                  {item}
                </Typography>
              ))
            ) : (
              // Fallback content if includes is not available
              <>
                <Typography sx={{ mb: 1 }}>
                  Kunne ikke finde inkluderede faciliteter
                </Typography>
              </>
            )}
          </Box>

          {/* Price */}
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontFamily: '"Zen Loop", cursive',
              textAlign: "center",
              mb: 4,
            }}
          >
            Pris {stay.price},-
          </Typography>

          {/* Book Button */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#829B97",
                color: "white",
                borderRadius: 10,
                px: 8,
                py: 2,
                fontSize: { xs: "1.2rem", md: "1.5rem" },
                fontFamily: '"Zen Loop", cursive',
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#6d8680",
                },
              }}
            >
              Book nu
            </Button>

            <Button
              variant="contained"
              onClick={handleFavoriteToggle}
              startIcon={isFavorited ? <Favorite /> : <FavoriteBorder />}
              sx={{
                 backgroundColor: "#829B97",
                color: "white",
                borderRadius: 10,
                px: 8,
                py: 2,
                fontSize: { xs: "1.2rem", md: "1.5rem" },
                fontFamily: '"Zen Loop", cursive',
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#6d8680",
                },
              }}
            >
              {isFavorited ? 'Fjern fra Min Liste' : 'Tilføj til Min Liste'}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
