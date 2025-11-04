import { Box, Typography, IconButton, Avatar } from '@mui/material';
import logo from '../../assets/logo.png';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#2a4f57',
        width: '100%',
        height: '390px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      {/* Social Media Section */}
      <Box
        sx={{
          width: '219px',
          height: '81px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          marginBottom: '1.5rem',
        }}
      >
        <IconButton
          component="a"
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          sx={{
            color: 'white',
            transition: 'color 0.3s ease',
            '&:hover': {
              color: '#a8dadc',
            },
          }}
        >
          <FaFacebook style={{ width: '82px', height: '82px' }} />
        </IconButton>
        <IconButton
          component="a"
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          sx={{
            color: 'white',
            transition: 'color 0.3s ease',
            '&:hover': {
              color: '#a8dadc',
            },
          }}
        >
          <FaInstagram style={{ width: '82px', height: '82px' }} />
        </IconButton>
      </Box>

      {/* Logo and Text Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <Avatar
          src={logo}
          alt="Gittes Glamping Logo"
          sx={{
            width: 50,
            height: 50,
          }}
        />
        <Typography
          sx={{
            color: 'white',
            margin: 0,
            textAlign: 'center',
            fontSize: '1rem',
          }}
        >
          Gittes Glamping
        </Typography>
      </Box>
    </Box>
  );
}