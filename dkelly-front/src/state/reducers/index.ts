import {combineReducers} from 'redux';
import customerReducer from './customer';
import productReducer from './product';
import authReducer from './auth';

const reducers = combineReducers({
  customers: customerReducer,
  products: productReducer,
  auth: authReducer
})

export default reducers;
export type State = ReturnType<typeof reducers>