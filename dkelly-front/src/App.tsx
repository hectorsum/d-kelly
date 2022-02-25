import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
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
            <Route path='/' element={<LoginScreen/>}/>
          </Routes>
          <SidebarScreen>
            <Routes>
              <Route path='/clientes' element={<CustomerScreen/>}/>
              <Route path='/pedidos' element={<OrderScreen/>}/>
            </Routes>
          </SidebarScreen>
        </Router>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
