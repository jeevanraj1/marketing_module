import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ResponsiveDrawer from './Pages/ResponsiveDrawer';
import SignIn from './Pages/Signin';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("Navigation_state", true);
      navigate('/welcomepage');
    }
  }, [isAuthenticated]);
  const handleSignInSuccess = () => {
    setIsAuthenticated(true);
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/signin');
  };
  return (
    <>
      {isAuthenticated ? (
        <ResponsiveDrawer onLogout={handleLogout} />
      ) : (
        <SignIn onSignInSuccess={handleSignInSuccess} />
      )
      }
    </>
  );
}

export default App;
