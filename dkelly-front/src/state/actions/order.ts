import { OrderType } from "../action-types/order";
import {Error} from './index'

export interface Order {
  _id?: string,
  customer: string,
  products: Array<{_id: string, name: string, qty: string}>,
  notes: string,
  total?: number,
  date?: Date
}

export interface OrderState {
  orders: Array<Order>,
  order: Order | null,
  loading: Boolean,
  error: Error | null,
}

interface CreateAction {
  type: OrderType.ADD,
  payload: Order
}

interface RetrieveAction {
  type: OrderType.RETRIEVE_ALL_ORDERS,
  payload: Order[]
}

interface ClearOrders {
  type: OrderType.CLEAR_ORDERS,
}

interface EditOrder {
  type: OrderType.EDIT,
  payload: Order
}
interface DeleteOrder {
  type: OrderType.DELETE,
  payload: string
}
interface RetrieveSingleOrder {
  type: OrderType.RETRIEVE_SINGLE_ORDER,
  payload: Order
}

interface ErrorAction {
  type: OrderType.ERROR,
  payload: Error
}
export type OrderAction = RetrieveAction | ClearOrders |
                             CreateAction | 
                             DeleteOrder |
                             EditOrder |
                             RetrieveSingleOrder | ErrorAction;