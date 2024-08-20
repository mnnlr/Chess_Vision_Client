import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import NavFooter from './Pages/NavFooter';
import ChessGame from './Pages/ChessGame';
import ContactUs from './Pages/ContactUs';
import UserProfile from './Pages/UserProfile';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import { AboutUs } from './Pages/AboutUs';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<NavFooter />}>
          <Route path="/" element={<Home />} />
          <Route path="/chess" element={<ChessGame />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;