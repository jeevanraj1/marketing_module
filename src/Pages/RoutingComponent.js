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
import CustomerTypePage from './MarketingModule/Master/CustomerType/CustomerTypePage';
import CustomerTypeDT from './MarketingModule/Master/CustomerType/CustomerTypeDT';
import BankMasterDT from './MarketingModule/Master/BankMaster/BankMasterDT';
import BranchMasterDT from './MarketingModule/Master/BranchMaster/BranchMasterDT';
import DistrictDT from './MarketingModule/Master/District/DistrictDT';
import TalukaDT from './MarketingModule/Master/Taluka/TalukaDT';
import CityDT from './MarketingModule/Master/City/CityDT';
import DistributionRoutePage from './MarketingModule/Master/DistributionRoute/DistributionRoutePage';
import DistributionRouteDT from './MarketingModule/Master/DistributionRoute/DistributionRouteDT';
import DistrubutionBatch from './MarketingModule/Master/Distribution/DistrubutionBatch';
import ContractorPage from './MarketingModule/Master/Contractor/ContractorPage';
import ContractorDT from './MarketingModule/Master/Contractor/ContractorDT';
import ContractorType from './MarketingModule/Master/ContractorType/ContractorType';
import ProductsDt from './MarketingModule/Master/Products/ProductsDt';
import PacketUnitsDT from './MarketingModule/Master/PacketUnits/PacketUnitsDT';
import PacketsPage from './MarketingModule/Master/Packets/PacketsPage';
import PacketsDT from './MarketingModule/Master/Packets/PacketsDT';
import Packets from './MarketingModule/Master/Packets/Packets';
import CustomerRouteDT from './MarketingModule/Master/CustomerRoute/CustomerRouteDT';
import DocumentMaster from './MarketingModule/Master/DocumentMaster/DocumentMaster';
import DocumentsMasterLink from './MarketingModule/Master/DocumentsMasterLink/DocumentsMasterLink';
import IndentEntry from './MarketingModule/Master/IndentEntry/IndentEntry';
import FileTypes from './MarketingModule/Master/FileTypes/FileTypes';
import FileTypesAllowed from './MarketingModule/Master/FileTypesAllowed/FileTypesAllowed';


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

                    <Route path='CustomerRoute' element={<ErrorBoundary key={location.pathname} componentName="CustomerRoute" ><CustomerRouteDT /></ErrorBoundary>} />

                    <Route path='relation' element={<ErrorBoundary key={location.pathname} componentName="RealationShipPage" ><RealationShipPage /></ErrorBoundary>}>
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

                    <Route path='CustomerType' element={<CustomerTypePage />}>
                        <Route index element={<CustomerTypeDT />} />
                    </Route>

                    <Route path='BankMaster' element={<BankMasterDT />} />

                    <Route path='BranchMaster' element={<BranchMasterDT />} />

                    <Route path='District' element={<ErrorBoundary key={location.pathname} componentName="District" ><DistrictDT /></ErrorBoundary>} />

                    <Route path='Taluka' element={<ErrorBoundary key={location.pathname} componentName="Taluka" ><TalukaDT /></ErrorBoundary>} />

                    <Route path='City' element={<ErrorBoundary key={location.pathname} componentName="City" ><CityDT /></ErrorBoundary>} />

                    <Route path='DistributionRoute' element={<ErrorBoundary key={location.pathname} componentName="DistributionRoute" ><DistributionRoutePage /></ErrorBoundary>}>
                        <Route index element={<DistributionRouteDT />} />
                    </Route>

                    <Route path='DistrubutionBatch' element={<ErrorBoundary key={location.pathname} componentName="DistrubutionBatch" ><DistrubutionBatch /></ErrorBoundary>} />

                    <Route path='Contractor' element={<ErrorBoundary key={location.pathname} componentName="Contractor" ><ContractorPage /></ErrorBoundary>}>
                        <Route index element={<ContractorDT />} />
                    </Route>

                    <Route path='ContractorType' element={<ErrorBoundary key={location.pathname} componentName="ContractorType" ><ContractorType /></ErrorBoundary>} />

                    <Route path='Products' element={<ErrorBoundary key={location.pathname} componentName="ProductsDt" ><ProductsDt /></ErrorBoundary>} />

                    <Route path='PackUnits' element={<ErrorBoundary key={location.pathname} componentName="PackUnits" ><PacketUnitsDT /></ErrorBoundary>} />

                    <Route path='Packets' element={<ErrorBoundary key={location.pathname} componentName="Packets" ><PacketsPage /></ErrorBoundary>}>
                        <Route index element={<PacketsDT />} />
                        <Route path='CreatePackets' element={<ErrorBoundary key={location.pathname} componentName="CreatePackets" ><Packets /></ErrorBoundary>} />
                    </Route>

                    <Route path='DocumentsMaster' element={<ErrorBoundary key={location.pathname} componentName="DocumentsMaster" ><DocumentMaster /></ErrorBoundary>} />

                    <Route path='DocumentsMasterLink' element={<ErrorBoundary key={location.pathname} componentName="DocumentsMasterLink" ><DocumentsMasterLink /></ErrorBoundary>} />

                    <Route path='IndentEntry' element={<ErrorBoundary key={location.pathname} componentName="IndentEntry" ><IndentEntry /></ErrorBoundary>} />

                    <Route path='FileTypes' element={<ErrorBoundary key={location.pathname} componentName="FileTypes" ><FileTypes /></ErrorBoundary>} />

                    <Route path='FileTypesAllowed' element={<ErrorBoundary key={location.pathname} componentName="FileTypesAllowed" ><FileTypesAllowed /></ErrorBoundary>} />

                </Route>

                <Route path='/ForgotPassword' element={<ForgotPassword />} />
                <Route path='/SignUp' element={<SignUp />} />

                <Route path='*' element={<>{"page not found"}</>} />

            </Routes>
        </>
    )
}
