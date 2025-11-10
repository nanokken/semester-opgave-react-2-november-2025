import * as React from 'react';
import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Navn er påkrævet';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email er påkrævet';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Indtast en gyldig email';
    }
    
    if (!formData.subject) {
      newErrors.subject = 'Vælg venligst et emne';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Besked er påkrævet';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Form is valid, submit the data
    console.log('Form submitted:', formData);
    
    // Save to localStorage
    const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    existingMessages.push({
      ...formData,
      timestamp: new Date().toISOString(),
      id: Date.now()
    });
    localStorage.setItem('contactMessages', JSON.stringify(existingMessages));
    
    // Show success toast
    toast.success('Din besked er blevet sendt successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <FormControl fullWidth sx={{ mb: 2.5 }} error={!!errors.name}>
        <OutlinedInput
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Navn"
          sx={{
            backgroundColor: 'transparent',
            color: 'white',
            borderRadius: '25px',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
              borderWidth: '2px',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '& input': {
              color: 'white',
              '&::placeholder': {
                color: 'rgba(255, 255, 255, 0.7)',
                opacity: 1,
              },
            },
          }}
        />
        {errors.name && <FormHelperText sx={{ color: '#ffcccc' }}>{errors.name}</FormHelperText>}
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2.5 }} error={!!errors.email}>
        <OutlinedInput
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          sx={{
            backgroundColor: 'transparent',
            color: 'white',
            borderRadius: '25px',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
              borderWidth: '2px',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '& input': {
              color: 'white',
              '&::placeholder': {
                color: 'rgba(255, 255, 255, 0.7)',
                opacity: 1,
              },
            },
          }}
        />
        {errors.email && <FormHelperText sx={{ color: '#ffcccc' }}>{errors.email}</FormHelperText>}
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2.5 }} error={!!errors.subject}>
        <Select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          displayEmpty
          sx={{
            backgroundColor: 'transparent',
            color: 'white',
            borderRadius: '25px',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
              borderWidth: '2px',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '& .MuiSelect-icon': {
              color: 'white',
            },
          }}
        >
          <MenuItem value="" disabled>
            Hvad drejer henvendelsen sig om?
          </MenuItem>
          <MenuItem value="booking">Booking</MenuItem>
          <MenuItem value="spørgsmål">Spørgsmål</MenuItem>
          <MenuItem value="feedback">Feedback</MenuItem>
          <MenuItem value="andet">Andet</MenuItem>
        </Select>
        {errors.subject && <FormHelperText sx={{ color: '#ffcccc' }}>{errors.subject}</FormHelperText>}
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2.5 }} error={!!errors.message}>
        <OutlinedInput
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Besked (Skriv dato'er, hvis det drejer sig om booking)"
          multiline
          rows={6}
          sx={{
            backgroundColor: 'transparent',
            color: 'white',
            borderRadius: '25px',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
              borderWidth: '2px',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '& textarea': {
              color: 'white',
              '&::placeholder': {
                color: 'rgba(255, 255, 255, 0.7)',
                opacity: 1,
              },
            },
          }}
        />
        {errors.message && <FormHelperText sx={{ color: '#ffcccc' }}>{errors.message}</FormHelperText>}
      </FormControl>

      <Button 
        type="submit" 
        variant="contained" 
        size="large"
        fullWidth
        sx={{ 
          mt: 2,
          py: 2,
          backgroundColor: '#829B97',
          color: 'white',
          fontSize: '1.2rem',
          fontWeight: 300,
          borderRadius: '25px',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#6d8379',
          }
        }}
      >
        Indsend
      </Button>
    </form>
  );
}
