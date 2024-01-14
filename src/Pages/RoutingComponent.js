import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import Welcome from './Welcome';
import CustomerPage from './MarketingModule/Master/Customer/CustomerPage';
import CustomerDT from './MarketingModule/Master/Customer/CustomerDT';
import SignIn from './Signin';
import Customer from './MarketingModule/Master/Customer/Customer';

export default function RoutingComponent() {
  const location = useLocation()
  return (
    <>
      <Routes>
        <Route path="/signin" element={<ErrorBoundary key={location.pathname} componentName="signin"><SignIn /></ErrorBoundary>} />
        <Route path='/welcomepage' element={<ErrorBoundary key={location.pathname} componentName="WelcomePage"><Welcome /></ErrorBoundary>} />

        <Route path='/customer' element={<ErrorBoundary key={location.pathname} componentName="customer"><CustomerPage /></ErrorBoundary>} >
          <Route index element={<CustomerDT />} />
          <Route path='/customer/CustomerCreate'  element={<ErrorBoundary key={location.pathname} componentName="CustomerCreate"><Customer/></ErrorBoundary>} />
        </Route>
      </Routes>
    </>
  )
}
