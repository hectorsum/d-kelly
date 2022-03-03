import {combineReducers} from 'redux';
import customerReducer from './customer';
import productReducer from './product';
import authReducer from './auth';
import orderReducer from './order';

const reducers = combineReducers({
  customers: customerReducer,
  products: productReducer,
  auth: authReducer,
  orders: orderReducer
})

export default reducers;
export type State = ReturnType<typeof reducers>