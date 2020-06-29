import { GET_ITEMS, DELETE_ITEM, ADD_ITEM, ITEM_LOADING, UPDATE_ITEM } from "../utils/types"
import axios from "axios"
import { configToken } from "./authActions"
import { returnErrors } from "./errorActions"

export const getItem = () => dispatch => {
    dispatch(setItemsLoading());
    axios
        .get("/api/items")
        .then(res => {
            dispatch({
                type: GET_ITEMS,
                payload: res.data
            })
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const deleteItem = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/items/${id}`, configToken(getState))
        .then(res => dispatch({
            type: DELETE_ITEM,
            id
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const addItem = (name) => (dispatch, getState) => {
    axios
        .post("/api/items", name, configToken(getState))
        .then(res => dispatch({
            type: ADD_ITEM,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const updateItem = (id, name) => (dispatch, getState) => {
    axios
        .put(`api/items/${id}`, {name}, configToken(getState))
        .then(res => dispatch({
            type: UPDATE_ITEM,
            payload: {id, name}
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const setItemsLoading = () => {
    return{
        type: ITEM_LOADING
    }
}