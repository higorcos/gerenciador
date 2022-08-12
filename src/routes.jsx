import React from 'react';
import {  BrowserRouter, Route, Routes} from 'react-router-dom';

import Home from "./pages/public/home";
import NewButton from './pages/admin/buttons/new';
import ListButton from './pages/admin/buttons/list';





export default function RoutesF(){

  
  
    return(
      <BrowserRouter>
    
        <Routes>
         <Route exact path="/" element={<Home/>} />
         <Route path="/botoes/criar" element={<NewButton/>}/>
         <Route path="/botoes/mostrar" element={<ListButton/>}/>
         
         </Routes>
  
      </BrowserRouter>
    )
}
