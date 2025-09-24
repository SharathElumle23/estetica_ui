import axios from 'axios';

export const sendCartItems = async (cartItems) => {
  try {
    const token = localStorage.getItem('token');
    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const response = await axios.post(
      `${API_BASE}/api/users/me/cart/item`,
      { items: cartItems }, // 👈 wrap in `items`
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getCartITems = async () => {
  try {
    const token = localStorage.getItem('token');
    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const response = await axios.get(`${API_BASE}/api/users/me/cart`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
export const getCompletePayment = async (data) => {
  try {
    const token = localStorage.getItem('token');
    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const response = await axios.post(
      `${API_BASE}/api/appointments/complete`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
