import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Button 
} from '@mui/material';

export default function OpholdDetail() {
  const { id } = useParams();
  const [stay, setStay] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStay = async () => {
      try {
        const response = await fetch(`http://localhost:3042/stay/${id}`);
        const data = await response.json();
        console.log('Stay Detail Response:', data);
        // Handle if data is nested
        if (data.data) {
          setStay(data.data);
        } else {
          setStay(data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stay:', error);
        setLoading(false);
      }
    };

    fetchStay();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (!stay) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography>Stay not found</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Hero Section with Image */}
      <Box
        sx={{
          position: 'relative',
          height: '60vh',
          backgroundImage: stay.image ? `url(${stay.image})` : 'none',
          backgroundColor: stay.image ? 'transparent' : '#2a4f57',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          }
        }}
      >
        <Typography 
          variant="h1" 
          sx={{ 
            position: 'relative', 
            zIndex: 1,
            fontSize: { xs: '3rem', md: '5rem' },
            fontFamily: '"Zen Loop", cursive',
            textAlign: 'center',
            px: 2,
            textTransform: 'lowercase'
          }}
        >
          {stay.title}
        </Typography>
      </Box>

      {/* Content Section */}
      <Box
        sx={{
          backgroundColor: '#2a4f57',
          color: 'white',
          py: { xs: 6, md: 8 },
          px: { xs: 3, md: 6 }
        }}
      >
        <Container maxWidth="md">
          {/* Main Title */}
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontFamily: '"Zen Loop", cursive',
              textAlign: 'center',
              mb: 4,
              lineHeight: 1.3
            }}
          >
            Tag væk en weekend, med én du holder af
          </Typography>

          {/* Description */}
          <Typography
            sx={{
              textAlign: 'center',
              fontSize: { xs: '0.95rem', md: '1rem' },
              lineHeight: 1.8,
              mb: 5,
              opacity: 0.95
            }}
          >
            {stay.description || 'Trænger du og én du holder af til en velfortjent pause fra hverdagens travlhed? Vores weekendglampingophold er den perfekte måde at komme væg og sinde på, mens i nyder det bedste fra naturen og luksuriøs indkvartering. Vi tilbyder den perfekte kombination af udendørs eventyr og bekvemmeligheder. Du vil bo i rummelige og smukt indrettede telte, udstyret med komfortable senge og alle nødvendige faciliteter. Omgivet af den storslåede natur vil du føle dig i ét med omgivelserne, samtidig med at du nyder komforten ved hjemmet.'}
          </Typography>

          {/* Features List */}
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography sx={{ mb: 1 }}>Morgenmad</Typography>
            <Typography sx={{ mb: 1 }}>Frokost</Typography>
            <Typography sx={{ mb: 1 }}>Aftensmad</Typography>
            <Typography sx={{ mb: 1 }}>Adgang til cykler</Typography>
            <Typography sx={{ mb: 1 }}>1 kanobrillet</Typography>
            <Typography sx={{ mb: 1 }}>Optændingsbrikkei til bål</Typography>
            <Typography sx={{ mb: 1 }}>Snobrødsdej</Typography>
          </Box>

          {/* Price */}
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontFamily: '"Zen Loop", cursive',
              textAlign: 'center',
              mb: 4
            }}
          >
            Pris {stay.price},-
          </Typography>

          {/* Book Button */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#829B97',
                color: 'white',
                borderRadius: 10,
                px: 8,
                py: 2,
                fontSize: { xs: '1.2rem', md: '1.5rem' },
                fontFamily: '"Zen Loop", cursive',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#6d8680',
                }
              }}
            >
              Book nu
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
