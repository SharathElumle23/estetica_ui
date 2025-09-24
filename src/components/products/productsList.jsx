import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Chip,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../store/products/productSlice';
import Cart from '../cart/cart';
import { useNavigate } from 'react-router-dom';
import {
  addToCart,
  updateQuantity,
  removeItem,
  clearCart,
} from '../../store/cart/cartSlice';
import { sendCartItems } from '../../store/cart/cartaction';
const categories = [
  'Massage Therapy',
  'Hair Cut, Wash and Style',
  'Nail Bar',
  'Manicure and Pedicure',
];

const ProductPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);
  const { items: cartItems } = useSelector((state) => state.cart);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Massage Therapy');
  const [showCart, setShowCart] = useState(false);
  const handleAddToCart = async (product) => {
    console.log(39, product);
    setShowCart(true);

    const previousCart = [...cartItems];
    dispatch(addToCart(product));

    try {
      // Transform cart for backend: only send _id and qty
      const updatedCart = [...cartItems, product].map((item) => ({
        _id: item.id || item._id, // handle both id and _id cases
        qty: item.quantity || 1,
      }));

      await sendCartItems(updatedCart);
      console.log('Cart synced successfully');
    } catch (err) {
      console.error('Failed to send cart:', err);

      // rollback UI state
      dispatch(clearCart());
      previousCart.forEach((item) => dispatch(addToCart(item)));
    }
  };

  useEffect(() => {
    dispatch(fetchProducts(selectedCategory));
  }, [dispatch]);
  console.log(66, items);
  return (
    <Box sx={{ p: 3 }}>
      {/* Page title */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Products
      </Typography>

      {/* Search bar */}
      <TextField
        placeholder="Search for Product !"
        variant="outlined"
        size="small"
        sx={{ width: '360px', mb: 2 }}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setSelectedCategory('');
          dispatch(fetchProducts(e.target.value));
        }}
      />
      {/* Category filters */}
      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <Chip
              key={cat}
              label={cat}
              variant={isSelected ? 'filled' : 'outlined'}
              onClick={() => {
                setSelectedCategory(cat);
                dispatch(fetchProducts(cat));
              }}
              sx={{
                backgroundColor: isSelected ? '#000' : '#fff',
                color: isSelected ? '#fff' : '#000',
                border: isSelected ? 'none' : '1px solid #ccc',
              }}
            />
          );
        })}
      </Box>

      {/* Product Grid */}
      <Grid container spacing={2}>
        {status === 'loading' ? (
          <Typography>Loading products...</Typography>
        ) : items?.length === 0 ? (
          <Typography>No products found</Typography>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            {/* Left: Product Grid */}
            <Grid container spacing={2} flex={3}>
              {items?.map((product) => (
                <Grid item xs={6} sm={4} md={2} key={product._id}>
                  <Card
                    sx={{
                      borderRadius: 2,
                      p: 1,
                      position: 'relative',
                      transition: 'background-color 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.05)',
                      },
                      '&:hover .add-icon': {
                        display: 'flex',
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="120"
                      image={product.image}
                      alt={product.name}
                      sx={{ objectFit: 'contain' }}
                    />
                    <CardContent sx={{ p: 1 }}>
                      <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                        {product.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ₹{product.price}
                      </Typography>
                    </CardContent>

                    {/* + Icon on Hover */}
                    <Box
                      className="add-icon"
                      sx={{
                        display: 'none',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: '#ffffffff',
                        color: '#0011faff',
                        borderRadius: '50%',
                        width: 24,
                        height: 24,
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        zIndex: 1,
                      }}
                      onClick={() => handleAddToCart(product)}
                    >
                      +
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Right: Cart */}
            {showCart && cartItems.length > 0 && (
              <Box flex={1}>
                <Cart
                  cartItems={cartItems}
                  updateQuantity={(id, qty) =>
                    dispatch(updateQuantity({ id, qty }))
                  }
                  removeItem={(id) => dispatch(removeItem(id))}
                  onCheckout={() => {
                    setShowCart(false);
                    navigate('/checkout');
                  }}
                />
              </Box>
            )}
          </Box>
        )}
      </Grid>
    </Box>
  );
};

export default ProductPage;
