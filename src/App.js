import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ResponsiveDrawer from './Pages/ResponsiveDrawer';
import SignIn from './Pages/Signin';
import Responsive from './Pages/Responsive';
import RoutingComponent from './Pages/RoutingComponent';


function App() {
 
  return (
    <>
      {/* <Responsive/> */}
      <RoutingComponent/>
    </>
  );
}

export default App;
