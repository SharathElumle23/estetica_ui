import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  Grid,
} from '@mui/material';
import DeleteIconRed from '../../assets/deleteIconRed.svg';
import { clearCart } from '../../store/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCartITems } from '../../store/cart/cartaction';

const Cart = ({ cartItems, updateQuantity, removeItem, onCheckout }) => {
  const dispatch = useDispatch();
  const getTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  //
  return (
    <Box sx={{ width: 350, p: 2, bgcolor: '#f9f9f9', borderRadius: 2 }}>
      <Grid display="flex" justifyContent="space-between">
        <Typography variant="h6" sx={{ mb: 2 }}>
          Product Cart
        </Typography>
        <IconButton onClick={() => dispatch(clearCart())} color="error">
          <img
            src={DeleteIconRed}
            alt="menu"
            width={24}
            height={24}
            bgcolor={'red'}
          />{' '}
        </IconButton>
      </Grid>
      {cartItems.map((item) => (
        <Box key={item.id} sx={{ mb: 2 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography variant="subtitle1">{item.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                ₹{item.price} × {item.quantity}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                onClick={() => {
                  item.quantity <= 1
                    ? removeItem(item.id)
                    : updateQuantity(item.id, item.quantity - 1);
                }}
              >
                –
              </IconButton>
              <Typography>{item.quantity}</Typography>
              <IconButton
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </IconButton>
            </Box>
          </Box>
          <Divider sx={{ mt: 1 }} />
        </Box>
      ))}

      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Total: ₹{getTotal()}
      </Typography>

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2, bgcolor: '#6a1b9a' }}
        onClick={onCheckout}
      >
        Checkout
      </Button>
    </Box>
  );
};

export default Cart;
