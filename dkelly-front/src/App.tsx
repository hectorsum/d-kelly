import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import {BrowserRouter as Router, Routes, Route, Navigate, Outlet} from 'react-router-dom'
import LoginScreen from './components/Login/LoginScreen';
import { Provider } from 'react-redux';
import {store} from './state/store';
import { SidebarScreen } from './components/Sidebar/SidebarSreen';
import { CustomerScreen } from './components/Customer/CustomerScreen';
import { OrderScreen } from './components/Orders/OrderScreen';
function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Router>
          <Routes>
            <Route element={<SidebarLayout/>}>
              <Route path='/clientes' element={<CustomerScreen/>}/>
              <Route path='/pedidos' element={<OrderScreen/>}/>
            </Route>
            <Route path='/' element={<LoginScreen/>}/>
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
