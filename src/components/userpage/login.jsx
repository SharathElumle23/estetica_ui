import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {
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
import { Password } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../store/auth/authSlice';

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
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const handleData = (key, value) => {
    console.log(key, value);
    setData({ ...data, [key]: value });
  };
  const handleLogin = () => {
    console.log(data);
    dispatch(loginUser(data))
      .unwrap() // unwrap returns the actual payload or throws error
      .then((user) => {
        console.log('Logged in user:', user);
        // Navigate after successful login
        navigate('/');
        setOpen(true);
      })
      .catch((error) => {
        console.error('Login failed:', error);
        setErr(true);
        // Optionally show error message
      });
  };
  return (
    <>
      <Grid sx={{ fontFamily: 'sans-serif' }}>
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h5"
            sx={{ marginBottom: 2 }}
          ></Typography>
          <Typography
            component="h1"
            variant="h4"
            sx={{
              width: '100%',
              fontSize: 'clamp(2rem, 10vw, 2.15rem)',
              textAlign: 'center',
              textDecoration: 'bold',
            }}
          >
            Sign in
          </Typography>
          <FormControl>
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              onChange={(e) => handleData('email', e.target.value)}
            />
          </FormControl>
          <FormControl>
            <TextField
              id="standard-basic"
              label="Password"
              variant="standard"
              onChange={(e) => handleData('password', e.target.value)}
            />
          </FormControl>
          <Link
            component="button"
            type="button"
            variant="body2"
            sx={{ alignSelf: 'baseline', margin: '32px 0px' }}
          >
            Forgot your password?
          </Link>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleLogin}
          >
            Sign in
          </Button>
          <Typography sx={{ textAlign: 'center', margin: '32px 0px' }}>
            Don&apos;t have an account?{' '}
            <span>
              <Link
                component={RouterLink}
                to="/signup"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Sign Up
              </Link>
            </span>
          </Typography>
        </Card>
      </Grid>
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
    </>
  );
};

export default LoginPage;
