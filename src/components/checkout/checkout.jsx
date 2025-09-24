import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Button,
  Divider,
  TextField,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';
import edit from '../../assets/edit.svg';
import deleteIcon from '../../assets/deleteIcon.svg';
import discountIcon from '../../assets/discount.svg';
import cubeIcon from '../../assets/cube.svg';
import star from '../../assets/star.svg';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCompletePayment } from '../../store/cart/cartaction';
const CheckOut = () => {
  const navigate = useNavigate();
  const { items: products } = useSelector((state) => state.cart);

  const serviceTotal = 1800;
  const productTotal = products.reduce(
    (sum, p) => sum + p.quantity * p.price,
    0
  );
  const discount = 0;
  const tax = (serviceTotal + productTotal - discount) * 0.18;
  const finalTotal = serviceTotal + productTotal - discount + tax;

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: '#f4f7fc',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      {/* Header */}
      <Typography variant="h6" fontWeight="bold" color="primary">
        Order Completion
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Booking Summary - APT-001
      </Typography>

      <Grid container spacing={1}>
        {/* Left Side - Products Used */}
        <Grid item xs={12} md={8}>
          {' '}
          {/* Take 8/12 on medium+ screens */}
          <Card sx={{ p: 2, width: '100%', boxSizing: 'border-box' }}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              gutterBottom
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <img src={cubeIcon} alt="menu" width={24} height={24} />
              Products Used
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {products.map((p) => (
              <Card
                key={p.id}
                variant="outlined"
                sx={{ mb: 2, p: 2, borderRadius: 2, width: '850px' }}
              >
                <Grid
                  container
                  alignItems="center"
                  spacing={2}
                  justifyContent={'space-between'}
                >
                  <Grid container alignItems="center" spacing={2}>
                    {/* Product Name */}
                    <Grid item xs={2} sm={2}>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        sx={{ mb: 1 }}
                      >
                        {p.name}
                      </Typography>
                      <Typography variant="body2" color="#64748B">
                        Quantity
                      </Typography>
                      <Typography variant="body2" color="#14161A">
                        {p.qty}
                      </Typography>
                    </Grid>

                    {/* Unit Price */}
                    <Grid item xs={2} sm={2}>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        sx={{ mb: 3 }}
                      ></Typography>
                      <Typography variant="body2" color="#64748B">
                        Unit Price:
                      </Typography>
                      <Typography variant="body2" color="#14161A">
                        ₹{p.price}
                      </Typography>
                    </Grid>

                    {/* Total */}
                    <Grid item xs={2} sm={2}>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        sx={{ mb: 3 }}
                      ></Typography>
                      <Typography variant="body2" color="#64748B">
                        Total:
                      </Typography>
                      <Typography variant="body2" color="#14161A">
                        ₹{p.price * p.quantity}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid>
                    <Grid
                      item
                      xs={2}
                      sm={2}
                      display={'flex'}
                      justifyContent={'end'}
                    >
                      <IconButton size="small">
                        <img src={edit} alt="menu" width={16} height={16} />
                      </IconButton>
                      <IconButton size="small">
                        <img
                          src={deleteIcon}
                          alt="menu"
                          width={16}
                          height={16}
                        />
                      </IconButton>
                    </Grid>
                    <Grid>
                      <IconButton size="small">
                        <Box display="flex" alignItems="center" gap={1}>
                          <img
                            src={discountIcon}
                            alt="menu"
                            width={16}
                            height={16}
                          />
                          <Typography variant="caption">
                            Special Discount
                          </Typography>
                        </Box>
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            ))}

            <Button
              variant="outlined"
              fullWidth
              sx={{
                borderColor: '#DDDFE4', // sets the border color
                color: 'inherit', // optional: keeps text color default
                '&:hover': {
                  borderColor: '#DDDFE4', // keeps same color on hover
                },
              }}
              onClick={() => navigate('/')}
            >
              + Add Extra Products
            </Button>
          </Card>
        </Grid>

        {/* Right Side - Billing Summary */}
        <Grid item xs={12} md={4}>
          {' '}
          {/* Take 4/12 on medium+ screens */}
          <Card sx={{ p: 2, width: '100%' }}>
            <List dense>
              <ListItem>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Billing Summary
                </Typography>
              </ListItem>
              <Divider sx={{ mb: 2 }} />
              <ListItem>
                <ListItemText primary="Service Total" />
                <Typography>₹{serviceTotal}</Typography>
              </ListItem>
              <ListItem>
                <ListItemText primary="Product Total" />
                <Typography>₹{productTotal}</Typography>
              </ListItem>
              <ListItem>
                <ListItemText primary="Order Discount (%)" />
                <TextField
                  size="small"
                  type="number"
                  value={discount}
                  sx={{ width: '80px' }}
                  disabled={true}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="Tax (18%)" />
                <Typography>₹{tax.toFixed(2)}</Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Final Total"
                  primaryTypographyProps={{ fontWeight: 'bold' }}
                />
                <Typography fontWeight="bold">
                  ₹{finalTotal.toFixed(2)}
                </Typography>
              </ListItem>
            </List>

            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                borderRadius: '20px',
                background: 'linear-gradient(90deg, #A18AFF 0%, #7960F1 100%)', // gradient
                color: 'white',
                textTransform: 'none', // keeps text normal
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1, // spacing between icon and text
                '&:hover': {
                  background:
                    'linear-gradient(90deg, #A18AFF 0%, #7960F1 100%)', // keep gradient on hover
                },
              }}
            >
              <img src={star} alt="menu" width={16} height={16} />
              Complete Payment
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckOut;
