import React, { Dispatch, useEffect } from 'react';
import { ChakraProvider, Container } from '@chakra-ui/react';
import {BrowserRouter as Router, Routes, Route, Navigate, Outlet} from 'react-router-dom'
import LoginScreen from './components/Login/LoginScreen';
import { Provider } from 'react-redux';
import {store} from './state/store';
import { SidebarScreen } from './components/Sidebar/SidebarSreen';
import { CustomerScreen } from './components/Customer/CustomerScreen';
import { OrderScreen } from './components/Orders/OrderScreen';
import { ProductScreen } from './components/Products/ProductScreen';
import { DashboardScreen } from './components/Dashboard/DashboardScreen';
import { EmployeeScreen } from './components/Employees/EmployeeScreen';
import { loadUser } from './state/action-creators/auth';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './routing/PrivateRoute';
import Alert from './utils/Alert';
import { OrderByCustomerScreen } from './components/Orders/OrderByCustomer/OrderByCustomerScreen';
if(localStorage.token){
  setAuthToken(localStorage.token);
}

function App() {
  const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>
  useEffect(()=>{
    dispatchStore(loadUser())
  },[]);
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Router>
          <Alert />
          <Routes>
            <Route path='/' element={<LoginScreen/>}/>
            <Route element={<SidebarLayout/>}>
              <Route path='/dashboard' element={<PrivateRoute/>}>
                <Route path='/dashboard' element={<DashboardScreen/>}/>
              </Route>
              <Route path='/clientes' element={<PrivateRoute/>}>
                <Route path='/clientes' element={<CustomerScreen/>}/>
              </Route>
              <Route path='/productos' element={<PrivateRoute/>}>
                <Route path='/productos' element={<ProductScreen/>}/>
              </Route>
              <Route path='/pedidos' element={<PrivateRoute/>}>
                <Route path='/pedidos' element={<OrderScreen/>}/>
              </Route>
              <Route path='/pedidos/cliente/:id' element={<PrivateRoute/>}>
                <Route path='/pedidos/cliente/:id' element={<OrderByCustomerScreen/>}/>
              </Route>
              <Route path='/empleados' element={<PrivateRoute/>}>
                <Route path='/empleados' element={<EmployeeScreen/>}/>
              </Route>
            </Route>
          </Routes>
        </Router>
      </ChakraProvider>
    </Provider>
  );
}

const SidebarLayout = () => (
  <>
    <SidebarScreen>
      <Outlet />
    </SidebarScreen>
  </>
);

export default App;
