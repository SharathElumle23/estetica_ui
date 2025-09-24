import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
  Typography,
  FormControl,
  TextField,
  Link,
  Snackbar,
  Alert,
} from '@mui/material';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { signupUser } from '../../store/auth/authSlice';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
}));

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState(false);

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleData = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const handleSignup = () => {
    if (!data.name || !data.email || !data.password) {
      return;
    }

    dispatch(signupUser(data))
      .unwrap()
      .then((user) => {
        navigate('/');
        setOpen(true);
      })
      .catch((error) => {
        setErr(true);
      });
  };

  return (
    <Grid sx={{ fontFamily: 'sans-serif' }}>
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{
            width: '100%',
            fontSize: 'clamp(2rem, 10vw, 2.15rem)',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          Sign Up
        </Typography>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            label="User Name"
            variant="standard"
            value={data.name}
            onChange={(e) => handleData('name', e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            label="Email"
            variant="standard"
            value={data.email}
            onChange={(e) => handleData('email', e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            label="Password"
            type="password"
            variant="standard"
            value={data.password}
            onChange={(e) => handleData('password', e.target.value)}
          />
        </FormControl>

        <Button
          type="button"
          fullWidth
          variant="contained"
          onClick={handleSignup}
        >
          Sign Up
        </Button>

        <Typography sx={{ textAlign: 'center', margin: '32px 0px' }}>
          Already have an account?{' '}
          <Link
            component={RouterLink}
            to="/login"
            variant="body2"
            sx={{ alignSelf: 'center' }}
          >
            Sign in
          </Link>
        </Typography>
      </Card>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => {
          setOpen(false);
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => {}} severity="success" sx={{ width: '100%' }}>
          Logged Successfully... Redirecting to {'Home'} Page
        </Alert>
      </Snackbar>
      <Snackbar
        open={err}
        autoHideDuration={3000}
        onClose={() => {
          setErr(false);
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => {}} severity="error" sx={{ width: '100%' }}>
          Error in login
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Signup;
