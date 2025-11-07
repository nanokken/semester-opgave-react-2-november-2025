import { Container, Box, Typography } from '@mui/material';
import LoginComponent from '../../components/Login/Login';

export default function LoginPage() {
  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        py: 4
      }}
    >
      <Container maxWidth="sm">
        <LoginComponent />
      </Container>
    </Box>
  );
}
