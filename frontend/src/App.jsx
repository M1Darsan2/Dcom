import React from 'react'
import { useLocation } from 'react-router-dom';
import MainRoutes from './Routes/MainRoutes';
import Navbar from './components/Navbar';

const App = () => {
   const location = useLocation()

  const hiddenRoutes  =['/register','/login', '/dashboard']

    const shouldHideNavbar = hiddenRoutes.some((route) =>
    location.pathname.startsWith(route)
  );
  return (
    <div>
       {!shouldHideNavbar && <Navbar />}
     <MainRoutes/>
    </div>
  )
}

export default App