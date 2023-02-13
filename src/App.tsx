import React from 'react';
import {Routes, Route} from 'react-router-dom'
import HomePage from "./pages/HomePage/HomePage";
import ProductPage from "./pages/ProductPage/ProductPage";
import UserPage from "./pages/UserPage/UserPage";

function App() {
  return (
    <div className='App container'>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/:id' element={<ProductPage/>}/>
        <Route path='/categories' element={<ProductPage/>}/>
        <Route path='/categories/:categoryName' element={<ProductPage/>}/>
        <Route path='/users/:userId' element={<UserPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
