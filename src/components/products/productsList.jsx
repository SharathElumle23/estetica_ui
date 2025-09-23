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

const categories = [
  'Massage Therapy',
  'Hair Cut, Wash and Style',
  'Nail Bar',
  'Manicure and Pedicure',
];

const ProductPage = () => {
  // Sample cart items
  const cartItemsData = [
    {
      id: 1,
      name: 'TRITR Mask Fit Red Cushion',
      price: 2000,
      quantity: 2,
    },
    {
      id: 2,
      name: 'Kay Beauty Hydrating Foundation',
      price: 799,
      quantity: 1,
    },
  ];

  // Quantity update handler
  const updateQuantity = (id, newQty) => {
    console.log(`Update item ${id} to quantity ${newQty}`);
    // You can dispatch Redux action here
  };

  // Remove item handler
  const removeItem = (id) => {
    console.log(`Remove item with id ${id}`);
    // You can dispatch Redux action here
  };

  // Checkout handler
  const onCheckout = () => {
    console.log('Proceeding to checkout with items:', cartItems);
    // Trigger checkout logic here
  };

  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Massage Therapy');
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  console.log(64, items);
  const addToCart = (product) => {
    setShowCart(true);
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product._id);
      if (existing) {
        return prev.map((item) =>
          item.id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product._id,
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      ];
    });
  };
  useEffect(() => {
    dispatch(fetchProducts(selectedCategory));
  }, [dispatch]);

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
        onChange={(e) => setSearch(e.target.value)}
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
          <Grid container spacing={2}>
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
                    onClick={() => addToCart(product)}
                  >
                    +
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        {showCart && (
          <Cart
            cartItems={cartItems}
            updateQuantity={(id, qty) =>
              setCartItems((prev) =>
                prev.map((item) =>
                  item.id === id ? { ...item, quantity: qty } : item
                )
              )
            }
            removeItem={(id) =>
              setCartItems((prev) => prev.filter((item) => item.id !== id))
            }
            onCheckout={() => {
              console.log('Checkout with:', cartItems);
              setCartItems([]);
              setShowCart(false);
            }}
          />
        )}
      </Grid>
    </Box>
  );
};

export default ProductPage;
