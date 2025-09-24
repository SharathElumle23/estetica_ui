import ProductList from './components/products/productsList';
import Navbar from './navbar/navbar';
import CheckOut from './components/checkout/checkout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/userpage/login';
import Signup from './components/userpage/signup';
import PrivateRoute from './components/userpage/privateRoute';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <ProductList />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <CheckOut />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
