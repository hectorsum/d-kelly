import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Dispatch } from "react";
import { OrderType } from "../action-types/order";
import { Action } from "../actions";
import { Order, OrderAction } from "../actions/order";

interface OrderResponse {
  ok: boolean,
  data: Array<Order> | Order,
}

const config: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
}
export const getOrders = () => async(dispatch: Dispatch<OrderAction | Action>) => {
  dispatch({
    type: OrderType.CLEAR_ORDERS,
  })
  try {
    const {data:{data: orderResponse}} = await axios.get("/api/order", config);
    dispatch({
      type: OrderType.RETRIEVE_ALL,
      payload: orderResponse
    })
  } catch (err) {
    let error = err as AxiosError;
    if(error.response) {
      dispatch({
        type: OrderType.ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}

export const getSingleOrder = (id: string) => async (dispatch: Dispatch<OrderAction | Action>) => {
  try {
    const {data:{data: orderResponse}} = await axios.get(`/api/order/${id}`, config);
    dispatch({
      type: OrderType.RETRIEVE_SINGLE_ORDER,
      payload: orderResponse
    })
  } catch (err) {
    let error = err as AxiosError;
    if (error.response) {
      dispatch({
        type: OrderType.ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}

export const addOrder = (formData: Order) => async(dispatch: Dispatch<OrderAction | Action>) => {
  try {
    const {data:{data: orderResponse}} = await axios.post('/api/order',formData ,config);
    dispatch({
      type: OrderType.ADD,
      payload: orderResponse
    })
  } catch (err) {
    let error = err as AxiosError;
    if(error.response) {
      dispatch({
        type: OrderType.ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}

export const updateOrder = (id: string, formData: Order) => async(dispatch: Dispatch<OrderAction | Action>) => {
  try {
    let {data:{data: orderResponse}} = await axios.put(`http://localhost:8000/api/order/${id}`,formData ,config);
    dispatch({
      type: OrderType.EDIT,
      payload: orderResponse,
    })
  } catch (err) {
    let error = err as AxiosError;
    if (error.response){
      dispatch({
        type: OrderType.ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}

export const deleteOrder = (id: string) => async(dispatch: Dispatch<OrderAction | Action>) => {
  try {
    await axios.delete(`/api/order/${id}`,config);
    dispatch({
      type:OrderType.DELETE,
      payload: id
    });
  } catch (err) {
    let error = err as AxiosError;
    if(error.response) {
      dispatch({
        type: OrderType.ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}