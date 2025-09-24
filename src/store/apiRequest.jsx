import axios from 'axios';

export const apiRequest = async ({
  url,
  method = 'GET',
  data = null,
  params = null,
}) => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios({
      url,
      method,
      data,
      params,
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || 'Request failed';
    throw message; // rethrow for further handling if needed
  }
};
