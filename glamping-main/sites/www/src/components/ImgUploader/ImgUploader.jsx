import { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Avatar,
  IconButton,
  Paper
} from '@mui/material';
import {
  CloudUpload,
  Delete,
  PhotoCamera
} from '@mui/icons-material';

const ImgUploader = ({ label, id, onChange, defaultImage = null }) => {
  const [preview, setPreview] = useState(defaultImage);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onChange(e);
    }
  };

  const handleClear = () => {
    setPreview(null);
    // Create a mock event for clearing
    const mockEvent = {
      target: { files: [] }
    };
    onChange(mockEvent);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {label && (
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {label}
        </Typography>
      )}
      
      <Paper
        elevation={1}
        sx={{
          p: 3,
          border: '2px dashed #d0d7de',
          borderRadius: 2,
          textAlign: 'center',
          backgroundColor: preview ? 'transparent' : '#f8f9fa',
          position: 'relative',
          '&:hover': {
            borderColor: '#829B97',
            backgroundColor: preview ? 'transparent' : '#f0f4f3'
          }
        }}
      >
        {preview ? (
          <Box sx={{ position: 'relative', display: 'inline-block' }}>
            <Avatar
              src={preview}
              sx={{
                width: 150,
                height: 150,
                mx: 'auto',
                mb: 2
              }}
              variant="rounded"
            />
            <IconButton
              onClick={handleClear}
              sx={{
                position: 'absolute',
                top: -8,
                right: -8,
                backgroundColor: 'error.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'error.dark'
                },
                width: 32,
                height: 32
              }}
              size="small"
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        ) : (
          <Box>
            <CloudUpload 
              sx={{ 
                fontSize: 48, 
                color: '#829B97', 
                mb: 2 
              }} 
            />
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ mb: 2 }}
            >
              Træk og slip billede her, eller klik for at vælge
            </Typography>
          </Box>
        )}

        <input
          type="file"
          id={id}
          accept="image/*"
          onChange={handleFileChange}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer'
          }}
        />

        <Button
          variant="contained"
          component="label"
          startIcon={<PhotoCamera />}
          sx={{
            backgroundColor: '#829B97',
            '&:hover': {
              backgroundColor: '#6d8680'
            },
            pointerEvents: 'none' // Let the hidden input handle the click
          }}
        >
          Vælg Billede
        </Button>
      </Paper>
    </Box>
  );
};

export default ImgUploader;