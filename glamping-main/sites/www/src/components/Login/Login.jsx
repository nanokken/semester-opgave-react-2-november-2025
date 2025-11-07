import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Login({ onClose, isDropdown = false }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3042/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      console.log('Login response:', result);

      if (result.status === 'ok' && result.data?.token) {
        // Store token in localStorage
        localStorage.setItem('authToken', result.data.token);
        
        // Decode token to get user info (simple parsing, not secure verification)
        const tokenParts = result.data.token.split('.');
        if (tokenParts.length === 3) {
          const payload = JSON.parse(atob(tokenParts[1]));
          localStorage.setItem('user', JSON.stringify({
            email: payload.email,
            name: payload.name,
            role: payload.role
          }));
        }
        
        // Close dropdown if applicable
        if (onClose) onClose();
        
        // Redirect or refresh
        navigate('/');
        window.location.reload(); // Refresh to update nav state
      } else {
        setError(result.message || 'Login fejlede. Tjek dine oplysninger.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Der opstod en fejl. Prøv igen senere.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{
        width: isDropdown ? '300px' : '100%',
        maxWidth: isDropdown ? '300px' : '400px',
        mx: isDropdown ? 0 : 'auto',
        p: isDropdown ? 2 : 4,
        backgroundColor: 'white',
        borderRadius: isDropdown ? 1 : 2,
        boxShadow: isDropdown ? 'none' : '0 4px 12px rgba(0,0,0,0.1)'
      }}
    >
      {!isDropdown && (
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            textAlign: 'center',
            fontFamily: '"Zen Loop", cursive',
            color: '#2a4f57'
          }}
        >
          Log ind
        </Typography>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        sx={{ mb: 2 }}
        size={isDropdown ? 'small' : 'medium'}
      />

      <TextField
        fullWidth
        label="Adgangskode"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        sx={{ mb: 2 }}
        size={isDropdown ? 'small' : 'medium'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        fullWidth
        type="submit"
        variant="contained"
        disabled={loading}
        sx={{
          backgroundColor: '#829B97',
          color: 'white',
          py: isDropdown ? 1 : 1.5,
          fontSize: isDropdown ? '0.9rem' : '1rem',
          '&:hover': {
            backgroundColor: '#6d8680',
          },
        }}
      >
        {loading ? 'Logger ind...' : 'Log ind'}
      </Button>
    </Box>
  );
}