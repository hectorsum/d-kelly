import {combineReducers} from 'redux';
import customerReducer from './customer';
const reducers = combineReducers({
  customers: customerReducer  
})

export default reducers;
export type State = ReturnType<typeof reducers>