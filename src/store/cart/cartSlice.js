import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product._id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          id: product._id,
          name: product.name,
          price: product.price,
          quantity: 1,
        });
      }
    },
    updateQuantity: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = qty;
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  removeItem,
  updateQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
