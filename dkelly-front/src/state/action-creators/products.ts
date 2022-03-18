import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Dispatch } from "react";
import { ProductType } from "../action-types/products";
import { Action } from "../actions";
import { Product, ProductAction } from "../actions/product";

interface ProductResponse {
  ok: boolean,
  data: Array<Product> | Product,
}

const config: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
}
export const getProducts = () => async(dispatch: Dispatch<ProductAction | Action>) => {
  dispatch({
    type: ProductType.CLEAR_PRODUCTS,
  })
  try {
    const {data: {data: productResponse}} = await axios.get("http://localhost:8000/api/product", config);
    dispatch({
      type: ProductType.RETRIEVE_ALL_PRODUCTS,
      payload: productResponse
    })
  } catch (err) {
    let error = err as AxiosError;
    if(error.response) {
      dispatch({
        type: ProductType.ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}

export const getSingleProduct = (id: string) => async (dispatch: Dispatch<ProductAction | Action>) => {
  try {
    const {data: {data: productResponse}} = await axios.get(`http://localhost:8000/api/product/${id}`, config);
    dispatch({
      type: ProductType.RETRIEVE_SINGLE_PRODUCT,
      payload: productResponse
    })
  } catch (err) {
    let error = err as AxiosError;
    if (error.response) {
      dispatch({
        type: ProductType.ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}

export const addProduct = (formData: Product) => async(dispatch: Dispatch<ProductAction | Action>) => {
  try {
    const {data:{data: productResponse}} = await axios.post('http://localhost:8000/api/product',formData ,config);
    console.log("res: ",productResponse);
    dispatch({
      type: ProductType.ADD,
      payload: productResponse
    })

  } catch (err) {
    let error = err as AxiosError;
    if(error.response) {
      dispatch({
        type: ProductType.ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}

export const updateProduct = (id: string, formData: Product) => async(dispatch: Dispatch<ProductAction | Action>) => {
  try {
    let {data:{data: productResponse}} = await axios.put(`http://localhost:8000/api/product/${id}`,formData ,config);
    dispatch({
      type: ProductType.EDIT,
      payload: productResponse,
    })
    console.log(productResponse)
  } catch (err) {
    let error = err as AxiosError;
    if (error.response){
      dispatch({
        type: ProductType.ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}

export const deleteProduct = (id: string) => async(dispatch: Dispatch<ProductAction | Action>) => {
  try {
    await axios.delete(`http://localhost:8000/api/product/${id}`,config);
    dispatch({
      type:ProductType.DELETE,
      payload: id
    });
  } catch (err) {
    let error = err as AxiosError;
    if(error.response) {
      dispatch({
        type: ProductType.ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}