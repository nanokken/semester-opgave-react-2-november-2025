import { Link } from "react-router-dom";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  useMediaQuery,
  useTheme,
  Avatar
} from "@mui/material";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/logo.png";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { text: 'Hjem', path: '/' },
    { text: 'Ophold', path: '/ophold' },
    { text: 'Kontakt', path: '/kontakt' },
    { text: 'Aktiviteter', path: '/aktiviteter' }
  ];

  return (
    <>
      <AppBar 
        position="sticky" 
        sx={{ 
          backgroundColor: '#2c3e50',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          display: (isMobile && menuOpen) ? 'none' : 'block'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', padding: '0.5rem 2rem' }}>
          {/* Logo */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          >
            <Avatar
              src={logo}
              alt="Glamping Logo"
              sx={{
                width: 50,
                height: 50,
              }}
            />
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: '2rem' }}>
              {menuItems.map((item) => (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  sx={{
                    color: 'white',
                    fontWeight: 500,
                    fontSize: '1rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#3498db',
                      backgroundColor: 'rgba(52, 152, 219, 0.1)'
                    }
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}

          {/* Mobile Burger Button */}
          {isMobile && (
            <IconButton
              onClick={() => setMenuOpen(true)}
              sx={{
                backgroundColor: '#829B97',
                color: 'white',
                borderRadius: '8px 0 8px 0',
                width: '64px',
                height: '52px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#34495e',
                  transform: 'scale(1.05)'
                }
              }}
            >
              <FaBars size={24} />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer Menu */}
      <Drawer
        anchor="top"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        PaperProps={{
          sx: {
            width: '100vw',
            height: '100vh',
            backgroundColor: '#829b97',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={() => setMenuOpen(false)}
          sx={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            color: 'white',
            backgroundColor: 'transparent',
            width: '64px',
            height: '52px',
            borderRadius: '8px 0 8px 0',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }
          }}
        >
          <FaTimes size={24} />
        </IconButton>

        {/* Menu Items */}
        <List sx={{ width: '100%', textAlign: 'center' }}>
          {menuItems.map((item) => (
            <ListItem key={item.path} sx={{ justifyContent: 'center', padding: 0 }}>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                sx={{
                  justifyContent: 'center',
                  padding: '1rem 2rem',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    transform: 'scale(1.05)'
                  }
                }}
              >
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    sx: {
                      color: 'white',
                      fontSize: { xs: '1.8rem', sm: '2.2rem' },
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: { xs: '1px', sm: '2px' },
                      textAlign: 'center'
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
