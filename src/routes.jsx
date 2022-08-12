import React from 'react';
import {  BrowserRouter, Route, Routes} from 'react-router-dom';

import Home from "./pages/public/home";
import NewButton from './pages/admin/buttons/new';
import ListButton from './pages/admin/buttons/list';
import NewOffice from './pages/admin/office/new';
import ListOffice from './pages/admin/office/list';




export default function RoutesF(){

  
  
    return(
      <BrowserRouter>
    
        <Routes>
         <Route exact path="/" element={<Home/>} />
         <Route path="/botoes/criar" element={<NewButton/>}/>
         <Route path="/botoes/mostrar" element={<ListButton/>}/>
         <Route path="/competencia/mostrar" element={<ListOffice/>}/>
         <Route path="/competencia/criar" element={<NewOffice/>}/>
         
         </Routes>
  
      </BrowserRouter>
    )
}
