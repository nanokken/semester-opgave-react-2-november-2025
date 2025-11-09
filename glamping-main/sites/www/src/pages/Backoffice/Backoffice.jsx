import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

export default function Backoffice() {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentActivity, setCurrentActivity] = useState({
    _id: '',
    title: '',
    description: '',
    date: '',
    time: '',
    image: ''
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    // Check if user is admin
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }

    const userData = JSON.parse(user);
    if (userData.role !== 'admin') {
      setSnackbar({ open: true, message: 'Adgang nægtet. Kun administratorer har adgang.', severity: 'error' });
      setTimeout(() => navigate('/'), 2000);
      return;
    }

    fetchActivities();
  }, [navigate]);

  const fetchActivities = async () => {
    try {
      const response = await fetch('http://localhost:3042/activities/');
      const result = await response.json();
      
      if (result.status === 'ok') {
        setActivities(result.data);
      }
    } catch (error) {
      console.error('Error fetching activities:', error);
      setSnackbar({ open: true, message: 'Fejl ved hentning af aktiviteter', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (activity = null) => {
    if (activity) {
      setEditMode(true);
      setCurrentActivity(activity);
    } else {
      setEditMode(false);
      setCurrentActivity({
        _id: '',
        title: '',
        description: '',
        date: '',
        time: '',
        image: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentActivity({
      _id: '',
      title: '',
      description: '',
      date: '',
      time: '',
      image: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentActivity(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem('authToken');
    
    try {
      if (editMode) {
        // Update existing activity - PUT endpoint expects 'id' not '_id' in body
        const activityData = {
          ...currentActivity,
          id: currentActivity._id
        };
        
        // Don't include image field if it's empty (to preserve existing image)
        if (!activityData.image || activityData.image.trim() === '') {
          delete activityData.image;
        }
        
        const response = await fetch('http://localhost:3042/activity', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(activityData)
        });

        const result = await response.json();
        
        if (result.status === 'ok') {
          setSnackbar({ open: true, message: 'Aktivitet opdateret', severity: 'success' });
          fetchActivities();
          handleCloseDialog();
        } else {
          setSnackbar({ open: true, message: result.message || 'Fejl ved opdatering', severity: 'error' });
        }
      } else {
        // Create new activity
        const response = await fetch('http://localhost:3042/activity', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(currentActivity)
        });

        const result = await response.json();
        
        if (result.status === 'ok') {
          setSnackbar({ open: true, message: 'Aktivitet oprettet', severity: 'success' });
          fetchActivities();
          handleCloseDialog();
        } else {
          setSnackbar({ open: true, message: result.message || 'Fejl ved oprettelse', severity: 'error' });
        }
      }
    } catch (error) {
      console.error('Error saving activity:', error);
      setSnackbar({ open: true, message: 'Fejl ved gemning', severity: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Er du sikker på, at du vil slette denne aktivitet?')) {
      return;
    }

    const token = localStorage.getItem('authToken');

    try {
      const response = await fetch(`http://localhost:3042/activity/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();
      
      if (result.status === 'ok') {
        setSnackbar({ open: true, message: 'Aktivitet slettet', severity: 'success' });
        fetchActivities();
      } else {
        setSnackbar({ open: true, message: result.message || 'Fejl ved sletning', severity: 'error' });
      }
    } catch (error) {
      console.error('Error deleting activity:', error);
      setSnackbar({ open: true, message: 'Fejl ved sletning', severity: 'error' });
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', py: 6 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Zen Loop", cursive',
              color: '#2a4f57'
            }}
          >
            Backoffice - Aktiviteter
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
            sx={{
              backgroundColor: '#829B97',
              '&:hover': {
                backgroundColor: '#6d8680',
              }
            }}
          >
            Ny Aktivitet
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#2a4f57' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Titel</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Dato</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Tid</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Beskrivelse</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">Handlinger</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activities.map((activity) => (
                <TableRow key={activity._id} hover>
                  <TableCell>{activity.title}</TableCell>
                  <TableCell>{activity.date}</TableCell>
                  <TableCell>{activity.time}</TableCell>
                  <TableCell>
                    {activity.description?.substring(0, 50)}...
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(activity)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(activity._id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Create/Edit Dialog */}
        <Dialog 
          open={openDialog} 
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {editMode ? 'Rediger Aktivitet' : 'Opret Ny Aktivitet'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField
                label="Titel"
                name="title"
                value={currentActivity.title}
                onChange={handleInputChange}
                fullWidth
                required
              />
              <TextField
                label="Beskrivelse"
                name="description"
                value={currentActivity.description}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={4}
                required
              />
              <TextField
                label="Dato"
                name="date"
                value={currentActivity.date}
                onChange={handleInputChange}
                fullWidth
                placeholder="f.eks. Mandag-Fredag"
              />
              <TextField
                label="Tid"
                name="time"
                value={currentActivity.time}
                onChange={handleInputChange}
                fullWidth
                placeholder="f.eks. 10:00-12:00"
              />
              <TextField
                label="Billede URL"
                name="image"
                value={currentActivity.image}
                onChange={handleInputChange}
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Annuller</Button>
            <Button 
              onClick={handleSave} 
              variant="contained"
              sx={{
                backgroundColor: '#829B97',
                '&:hover': {
                  backgroundColor: '#6d8680',
                }
              }}
            >
              {editMode ? 'Gem' : 'Opret'}
            </Button>
          </DialogActions>
        </Dialog>

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
      </Container>
    </Box>
  );
}
