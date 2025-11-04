import { Box, Typography } from '@mui/material';
import Form from "../../components/Form/Form";
import headerBg from '../../assets/image_00.jpg';

export default function Kontakt() {
  return (
    <Box>
      {/* Header Section with Background Image */}
      <Box
        sx={{
          backgroundImage: `url(${headerBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '50vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(71, 71, 71, 0.5)',
            zIndex: 1,
          },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            position: 'relative',
            zIndex: 2,
            color: 'white',
            fontFamily: '"Zen Loop", cursive',
            fontSize: { xs: '3rem', md: '4rem' },
            fontWeight: 300,
            letterSpacing: '2px',
            textAlign: 'center',
            padding: '2rem',
          }}
        >
          Kontakt Gitte
        </Typography>
      </Box>

      {/* Info Section */}
      <Box
        sx={{
          backgroundColor: '#33626C',
          padding: { xs: '3rem 2rem', md: '4rem 3rem' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: { xs: '100%', md: '800px' },
          margin: '0 auto',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: 'white',
            fontFamily: '"Zen Loop", cursive',
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 500,
            marginBottom: '1.5rem',
            lineHeight: 1.4,
          }}
        >
          Vil du booke et ophold?
          <br />
          Eller har du blot et spørgsmål?
        </Typography>
        <Typography
          sx={{
            color: 'white',
            fontSize: { xs: '0.95rem', md: '1rem' },
            fontWeight: 400,
            lineHeight: 1.8,
            maxWidth: '600px',
          }}
        >
          Så tøv ikke med at tage kontakt til os herunder. Vi bestræber os på at svare på henvendelser indenfor 24 timer, men op til ferier kan der være travlt, og svartiden kan derfor være op til 48 timer.
        </Typography>
      </Box>

      {/* Form Section */}
      <Box
        sx={{
          backgroundColor: '#33626C',
          padding: { xs: '2rem 1.5rem 4rem', md: '3rem 2rem 5rem' },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: { xs: '100%', md: '800px' },
          margin: '0 auto',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: '500px' }}>
          <Form />
        </Box>
      </Box>
    </Box>
  );
}
