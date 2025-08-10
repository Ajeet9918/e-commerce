import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from '../routes/Home';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ManageAccount from '../components/Account/ManageAccount/ManageAccount';
import MyAccount from '../components/Account/MyAccount/MyAccount';
import Shop from '../components/Shop/Shop';
import ItemView from '../routes/ItemView';
import CategoryView from '../routes/CategoryView';
import SearchView from '../routes/Search';
import CartItemsProvider from '../Context/CartItemsProvider';
import Login from '../components/Authentication/Login/Login';
import Register from '../components/Authentication/Register/Register';
import ProtectedRoute from '../components/Authentication/ProtectedRoute';
import Wishlist from '../components/Wishlist';
import WishItemsProvider from '../Context/WishItemsProvider';
import { AuthProvider } from '../Context/AuthContext';
import SearchProvider from '../Context/SearchProvider';

function App() {
  return (
    <AuthProvider>
      <CartItemsProvider>
        <WishItemsProvider>
          <SearchProvider>
            <Router>
              <Header />
              <Routes>
                {/* Home */}
                <Route path="/" element={<Home />} />

                {/* Account */}
                <Route path="/account/me" element={
                  <ProtectedRoute>
                    <MyAccount />
                  </ProtectedRoute>
                } />
                <Route path="/account/manage" element={
                  <ProtectedRoute>
                    <ManageAccount />
                  </ProtectedRoute>
                } />
                <Route path="/account/login" element={<Login />} />
                <Route path="/account/register" element={<Register />} />

                {/* Shop + Category */}
                <Route path="/shop" element={<Shop />} />
                <Route path="/category/:id" element={<CategoryView key={window.location.pathname} />} />

                {/* Item Views by Category */}
                <Route path="/item/:category/:id" element={<ItemView />} />

                {/* Wishlist + Search */}
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/search/*" element={<SearchView />} />

                {/* Admin (Optional fallback route) */}
                <Route path="/admin" element={<Wishlist />} />

                {/* Catch-all: Redirect unknown routes to login */}
                <Route path="*" element={<Login />} />
              </Routes>
              <Footer />
            </Router>
          </SearchProvider>
        </WishItemsProvider>
      </CartItemsProvider>
    </AuthProvider>
  );
}

export default App;
