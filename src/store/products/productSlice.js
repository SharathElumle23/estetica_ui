import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async (payload) => {
    try {
      console.log('payload', payload);
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await axios.get(
        `${API_BASE}/api/products/?filterby=${encodeURIComponent(payload)}`
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: { items: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload?.data;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default productSlice.reducer;
