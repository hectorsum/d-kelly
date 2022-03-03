import { ProductType } from '../action-types/products';
import {Error} from './index'

export interface Product {
  _id: string,
  name: string,
  qty: Number,
  price: string,
}

export interface ProductState {
  products: Array<Product>,
  product: Product | null,
  loading: Boolean,
  error: Error | null,
}

interface CreateAction {
  type: ProductType.ADD,
  payload: Product
}

interface RetrieveAction {
  type: ProductType.RETRIEVE_ALL,
  payload:Product[]
}

interface ClearProducts {
  type: ProductType.CLEAR_PRODUCTS,
}

interface EditProduct {
  type: ProductType.EDIT,
  payload: Product
}
interface DeleteProduct {
  type: ProductType.DELETE,
  payload: string
}
interface RetrieveSingleProduct {
  type: ProductType.RETRIEVE_SINGLE_PRODUCT,
  payload: Product
}

interface ErrorAction {
  type: ProductType.ERROR,
  payload: Error
}
export type ProductAction = RetrieveAction | ClearProducts |
                             CreateAction | 
                             DeleteProduct |
                             EditProduct |
                             RetrieveSingleProduct | ErrorAction;