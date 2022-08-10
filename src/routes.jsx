import React from 'react';
import {  BrowserRouter, Route, Routes} from 'react-router-dom';

import Home from "./pages/public/home";
import NewButton from './pages/admin/buttons/new';





export default function RoutesF(){

  
  
    return(
      <BrowserRouter>
    
        <Routes>
         <Route exact path="/" element={<Home/>} />
         <Route path="/botoes/criar" element={<NewButton/>} />
         
         </Routes>
  
      </BrowserRouter>
    )
}
