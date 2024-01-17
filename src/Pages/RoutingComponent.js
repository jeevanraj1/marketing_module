import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import Welcome from './Welcome';
import CustomerPage from './MarketingModule/Master/Customer/CustomerPage';
import CustomerDT from './MarketingModule/Master/Customer/CustomerDT';
import SignIn from './Signin';
import Customer from './MarketingModule/Master/Customer/Customer';
import RealationShipPage from './MarketingModule/Master/RealationShip/RealationShipPage';
import RealationShipDT from './MarketingModule/Master/RealationShip/RealationShipDT';
import PaymodePage from './MarketingModule/Master/PayMode/PaymodePage';
import PayModeDT from './MarketingModule/Master/PayMode/PayModeDT';
import StatusPage from './MarketingModule/Master/Status/StatusPage';
import StatusDT from './MarketingModule/Master/Status/StatusDT';
import OfficerPage from './MarketingModule/Master/Officer/OfficerPage';
import OfficerDT from './MarketingModule/Master/Officer/OfficerDT';

export default function RoutingComponent() {
  const location = useLocation()
  return (
    <>
      <Routes>
        <Route path="/signin" element={<ErrorBoundary key={location.pathname} componentName="signin"><SignIn /></ErrorBoundary>} />
        <Route path='/welcomepage' element={<ErrorBoundary key={location.pathname} componentName="WelcomePage"><Welcome /></ErrorBoundary>} />

        <Route path='/customer' element={<ErrorBoundary key={location.pathname} componentName="customer"><CustomerPage /></ErrorBoundary>} >
          <Route index element={<CustomerDT />} />
          <Route path='/customer/CreateCustomer' element={<ErrorBoundary key={location.pathname} componentName="CustomerCreate"><Customer /></ErrorBoundary>} />
        </Route>

        <Route path='/realation' element={<ErrorBoundary key={location.pathname} componentName="Realation"><RealationShipPage /></ErrorBoundary>}>
          <Route index element={<RealationShipDT />} />
        </Route>

        <Route path='/Paymode' element={<ErrorBoundary key={location.pathname} componentName="Paymode"><PaymodePage /></ErrorBoundary>}>
          <Route index element={<PayModeDT />} />
        </Route>

        <Route path='/Status' element={<ErrorBoundary key={location.pathname} componentName="Status"><StatusPage /></ErrorBoundary>}>
          <Route index element={<StatusDT />} />
        </Route>

        <Route path='/Officer' element={<ErrorBoundary key={location.pathname} componentName="Officer"><OfficerPage/></ErrorBoundary>}>
          <Route index element={<OfficerDT/>} />
        </Route>
      </Routes>
    </>
  )
}
