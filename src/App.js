import React from 'react';
import { BrowserRouter as Rou, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import NavFooter from './Pages/NavFooter';

function App() {
  return (
    <div className="App">
      <Rou>
       
        <Routes>
          <Route element={<NavFooter />} >
<Route path='/' element={<Home />} />
          </Route>
         
        </Routes>
      </Rou>
    </div>
  );
}

export default App;

