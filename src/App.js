import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import NavFooter from './Pages/NavFooter';
import ChessGame from './Pages/ChessGame';
import ContactUs from './Pages/ContactUs';
import UserProfile from './Pages/UserProfile';
import { Signin } from './Pages/Signin';
import { AboutUs } from './Pages/AboutUs';
import DragAndDrop from './components/home/DragAndDrop';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>      
      <Routes>
        <Route element={<NavFooter />}>
          <Route path="/" element={<Home />} />
          <Route path="/chess" element={<ChessGame />} />
          <Route path="/chess-game" element={<ChessGame />} />
          {/* <Route path="/chess-analysis" element={<ChessAnalysis />} />  */}
          <Route path='/contact-us' element={<ContactUs/>}/>
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path='/drag&drop' element={<DragAndDrop/>}/>
          <Route path="/signin" element={<Signin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;