import { AxiosRequestConfig } from "axios";
import { Dispatch } from "react";
import { AlertType } from "../action-types/alert";
import { CartType } from "../action-types/cart";
import { Action } from "../actions";
import { CartAction } from "../actions/cart";
import { Product } from "../actions/product";
import { setAlert } from "./alert";
// import { setAlert } from "./alert";

const config: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
}

//* Add Product
export const addProductCart = (product: Product) => (dispatch: Dispatch<CartAction | Action | any>) => {
  console.log("Agregando al carrito", product);
  dispatch({
    type: CartType.ADD_PRODUCT_CART,
    payload: product,
  });
  dispatch(setAlert("Producto agregado", "success"));
};

//* Get cart
// export const getCart = () => async (dispatch) => {
//   // dispatch({ type: CLEAR_CART });
//   // try {
//   // const res = await axios.get("/api/product");
//   // const cart = JSON.parse(localStorage.getItem("cart")) || [];
//   // console.log("CartListAction:", cart);
//   // dispatch({
//   //   type: GET_CART,
//   //   payload: cart,
//   // });
//   // } catch (err) {
//   // dispatch({
//   //   type: CART_ERROR,
//   //   payload: { msg: err.response.statusText, status: err.response.status }
//   // })
//   // }
// };

export const removeAllProducts = () => (dispatch: Dispatch<CartAction | Action | any>) => {
  dispatch({
    type: CartType.REMOVE_ALL_PRODUCTS,
  });
};

//* Delete product
export const deleteProductCart = (id: string) => (dispatch: Dispatch<CartAction | Action | any>) => {
  dispatch({
    type: CartType.REMOVE_PRODUCT_CART,
    payload: id,
  });
  dispatch(setAlert("Producto eliminado", "error"));
};

//* Update product
export const updateProductCart = (id: string, qty: number) => (dispatch: Dispatch<CartAction | Action | any>) => {
  dispatch({
    type: CartType.UPDATE_PRODUCT_CART,
    payload: { id, qty },
  });
  dispatch(setAlert("Producto actualizado del carrito", "success"));
};

//* Add qty product
export const addQtyProductCart = (id: string) => (dispatch: Dispatch<CartAction | Action>) => {
  dispatch({
    type: CartType.ADD_QTY_PRODUCT_CART,
    payload: id,
  });
};

//* Remove qty product
export const removeQtyProductCart = (id: string) => (dispatch: Dispatch<CartAction | Action>) => {
  dispatch({
    type: CartType.REMOVE_QTY_PRODUCT_CART,
    payload: id,
  });
};

//* Get cart
export const clearCart = () => (dispatch: Dispatch<CartAction | Action>) => {
  dispatch({ type: CartType.CLEAR_CART });
};