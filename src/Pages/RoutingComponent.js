// import React from 'react'
// import { Route, Routes, useLocation } from 'react-router-dom';
// import ErrorBoundary from './ErrorBoundary';
// import Welcome from './Welcome';
// import CustomerPage from './MarketingModule/Master/Customer/CustomerPage';
// import CustomerDT from './MarketingModule/Master/Customer/CustomerDT';
// import SignIn from './Signin';
// import Customer from './MarketingModule/Master/Customer/Customer';
// import RealationShipPage from './MarketingModule/Master/RealationShip/RealationShipPage';
// import RealationShipDT from './MarketingModule/Master/RealationShip/RealationShipDT';
// import PaymodePage from './MarketingModule/Master/PayMode/PaymodePage';
// import PayModeDT from './MarketingModule/Master/PayMode/PayModeDT';
// import StatusPage from './MarketingModule/Master/Status/StatusPage';
// import StatusDT from './MarketingModule/Master/Status/StatusDT';
// import OfficerPage from './MarketingModule/Master/Officer/OfficerPage';
// import OfficerDT from './MarketingModule/Master/Officer/OfficerDT';
// import BillCategoryPage from './MarketingModule/Master/BillCategory/BillCategoryPage';
// import BillCategoryDT from './MarketingModule/Master/BillCategory/BillCategoryDT';
// import RateCategoryPage from './MarketingModule/Master/RateCategory/RateCategoryPage';
// import RateCategoryDT from './MarketingModule/Master/RateCategory/RateCategoryDT';

// export default function RoutingComponent() {
//   const location = useLocation()
//   return (
//     <>
//       <Routes>
//         <Route path='/responsiveDrawer/default' element={<>hi</>}/>
//         <Route path='/customer' element={<ErrorBoundary key={location.pathname} componentName="customer"><CustomerPage /></ErrorBoundary>} >
//           <Route index element={<CustomerDT />} />
//           <Route path='/customer/CreateCustomer' element={<ErrorBoundary key={location.pathname} componentName="CustomerCreate"><Customer /></ErrorBoundary>} />
//         </Route>

//         <Route path='/realation' element={<ErrorBoundary key={location.pathname} componentName="Realation"><RealationShipPage /></ErrorBoundary>}>
//           <Route index element={<RealationShipDT />} />
//         </Route>

//         <Route path='/Paymode' element={<ErrorBoundary key={location.pathname} componentName="Paymode"><PaymodePage /></ErrorBoundary>}>
//           <Route index element={<PayModeDT />} />
//         </Route>

//         <Route path='/Status' element={<ErrorBoundary key={location.pathname} componentName="Status"><StatusPage /></ErrorBoundary>}>
//           <Route index element={<StatusDT />} />
//         </Route>

//         <Route path='/Officer' element={<ErrorBoundary key={location.pathname} componentName="Officer"><OfficerPage /></ErrorBoundary>}>
//           <Route index element={<OfficerDT />} />
//         </Route>
//         <Route path='/BillCategory' element={<ErrorBoundary key={location.pathname} componentName="BillCategory"><BillCategoryPage /></ErrorBoundary>}>
//           <Route index element={<BillCategoryDT />} />
//         </Route>
//         <Route path='/RateCategory' element={<ErrorBoundary key={location.pathname} componentName="BillCategory"><RateCategoryPage/></ErrorBoundary>}>
//           <Route index element={<RateCategoryDT/>} />
//         </Route>
//       </Routes>
//     </>
//   )
// }
import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';
import SignIn from './Signin';
import ResponsiveDrawer from './ResponsiveDrawer';
import RealationShipPage from './MarketingModule/Master/RealationShip/RealationShipPage';
import RealationShipDT from './MarketingModule/Master/RealationShip/RealationShipDT';
import PaymodePage from './MarketingModule/Master/PayMode/PaymodePage';
import PayModeDT from './MarketingModule/Master/PayMode/PayModeDT';
import StatusPage from './MarketingModule/Master/Status/StatusPage';
import StatusDT from './MarketingModule/Master/Status/StatusDT';
import OfficerPage from './MarketingModule/Master/Officer/OfficerPage';
import OfficerDT from './MarketingModule/Master/Officer/OfficerDT';
import BillCategoryPage from './MarketingModule/Master/BillCategory/BillCategoryPage';
import BillCategoryDT from './MarketingModule/Master/BillCategory/BillCategoryDT';
import RateCategoryPage from './MarketingModule/Master/RateCategory/RateCategoryPage';
import RateCategoryDT from './MarketingModule/Master/RateCategory/RateCategoryDT';
import CustomerPage from './MarketingModule/Master/Customer/CustomerPage';
import CustomerDT from './MarketingModule/Master/Customer/CustomerDT';
import Customer from './MarketingModule/Master/Customer/Customer';
import Welcome from './Welcome';
import ForgotPassword from './ForgotPassword';
import SignUp from './SignUp';
import ErrorBoundary from './ErrorBoundary';

export default function RoutingComponent() {
    const location = useLocation()
    return (
        <>
            <Routes>
                <Route path='/' element={<ErrorBoundary key={location.pathname} componentName="signin" ><SignIn /></ErrorBoundary>} />

                <Route path='/marketing-module/:dynamic/*' element={<ErrorBoundary componentName="ResponsiveDrawer" ><ResponsiveDrawer /></ErrorBoundary>} >

                    <Route index element={<Welcome />} />
                    <Route path='customer' element={<ErrorBoundary key={location.pathname} componentName="signin" ><CustomerPage /></ErrorBoundary>}>
                        <Route index element={<CustomerDT />} />
                        <Route path='CreateCustomer' element={<ErrorBoundary key={location.pathname} componentName="Customer" ><Customer /></ErrorBoundary>} />
                    </Route>
                    <Route path='realation' element={<ErrorBoundary key={location.pathname} componentName="RealationShipPage" ><RealationShipPage /></ErrorBoundary>}>
                        <Route index element={<RealationShipDT />} />
                    </Route>
                    <Route path='Paymode' element={<ErrorBoundary key={location.pathname} componentName="signin" ><PaymodePage /></ErrorBoundary>}>
                        <Route index element={<PayModeDT />} />
                    </Route>
                    <Route path='Status' element={<StatusPage />}>
                        <Route index element={<StatusDT />} />
                    </Route>
                    <Route path='Officer' element={<OfficerPage />}>
                        <Route index element={<OfficerDT />} />
                    </Route>
                    <Route path='BillCategory' element={<BillCategoryPage />}>
                        <Route index element={<BillCategoryDT />} />
                    </Route>
                    <Route path='RateCategory' element={<RateCategoryPage />}>
                        <Route index element={<RateCategoryDT />} />
                    </Route>
                </Route>

                <Route path='/ForgotPassword' element={<ForgotPassword />} />
                <Route path='/SignUp' element={<SignUp />} />


            </Routes>
        </>
    )
}
