import React from 'react';
import {Routes, Route} from 'react-router-dom'
import HomePage from "./pages/HomePage/HomePage";
import ProductPage from "./pages/ProductPage/ProductPage";

function App() {
  return (
    <div className='App container'>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/:id' element={<ProductPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
