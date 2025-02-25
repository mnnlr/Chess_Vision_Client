import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import NavFooter from "./Pages/NavFooter";
import ChessGame from "./Pages/ChessGame";
import ContactUs from "./Pages/ContactUs";
import UserProfile from "./Pages/UserProfile";
import { Signin } from "./Pages/Signin";
import { AboutUs } from "./Pages/AboutUs";
import Chessq from "./Pages/Chessq";
import ChessAnalysis from "./Pages/ChesssAnalysis";
import DragAndDrop from "./components/home/DragAndDrop";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<NavFooter />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/chess" element={<ChessGame />} /> */}
          <Route path="/chess-game" element={<Chessq />} />
          <Route path="/chess-analysis" element={<ChessAnalysis />} />
          <Route path="/contact-us" element={<ContactUs />} />
          {/* <Route path="/profile" element={<UserProfile />} /> */}
          <Route path="/drag&drop" element={<DragAndDrop />} />
          <Route path="/about-us" element={<AboutUs />} />
          {/* <Route path="/signin" element={<Signin />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
