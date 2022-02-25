import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Dispatch } from "react";
import { CustomerType } from "../action-types/customer";
import { Action } from "../actions";
import { Customer, CustomerAction } from "../actions/customer";

interface CustomerResponse {
  ok: boolean,
  data: Array<Customer> | Customer,
}

const config: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
}
export const getCustomers = () => async(dispatch: Dispatch<CustomerAction | Action>) => {
  dispatch({
    type: CustomerType.CLEAR_CUSTOMERS,
  })
  try {
    const res = await axios.get("/api/customer", config);
    dispatch({
      type: CustomerType.RETRIEVE_ALL,
      payload: res.data.customers
    })
  } catch (err) {
    let error = err as AxiosError;
    if(error.response) {
      dispatch({
        type: CustomerType.ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}

export const getSingleCustomer = (id: string) => async (dispatch: Dispatch<CustomerAction | Action>) => {
  try {
    const response = await axios.get<Customer>(`/api/customer/${id}`, config);
    dispatch({
      type: CustomerType.RETRIEVE_SINGLE_CUSTOMER,
      payload: response.data
    })
  } catch (err) {
    let error = err as AxiosError;
    if (error.response) {
      dispatch({
        type: CustomerType.ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}

export const addCustomer = (formData: Customer) => async(dispatch: Dispatch<CustomerAction | Action>) => {
  try {
    console.log("formData: ",formData);
    const res = await axios.post('/api/customer',formData ,config);
    console.log("res: ",res);
    dispatch({
      type: CustomerType.ADD,
      payload: res.data.customer
    })

  } catch (err) {
    let error = err as AxiosError;
    if(error.response) {
      dispatch({
        type: CustomerType.ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}

export const updateCustomer = (id: string, formData: Customer) => async(dispatch: Dispatch<CustomerAction | Action>) => {
  try {
    let response = await axios.put(`http://localhost:8000/api/customer/${id}`,formData ,config);
    dispatch({
      type: CustomerType.EDIT,
      payload: response.data.customer,
    })
    console.log(response.data)
  } catch (err) {
    let error = err as AxiosError;
    if (error.response){
      dispatch({
        type: CustomerType.ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}

export const deleteCustomer = (id: string) => async(dispatch: Dispatch<CustomerAction | Action>) => {
  try {
    await axios.delete(`/api/customer/${id}`,config);
    dispatch({
      type:CustomerType.DELETE,
      payload: id
    });
  } catch (err) {
    let error = err as AxiosError;
    if(error.response) {
      dispatch({
        type: CustomerType.ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}