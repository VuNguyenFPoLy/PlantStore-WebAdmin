import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import Login from './screens/Login';
import Home from './screens/Home';
import Products from './screens/Products';
import PageNotFound from './screens/PageNotFound'
import Users from './screens/Users';


import {
  BrowserRouter as Router, Routes, Route,
  Navigate, Outlet
} from 'react-router-dom';


function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path='/users' element={<Users />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
