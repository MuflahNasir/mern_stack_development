import { GET_ITEMS, DELETE_ITEM, ADD_ITEM, ITEM_LOADING, UPDATE_ITEM } from "../utils/types"
import axios from "axios"

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
}

export const deleteItem = (id) => dispatch => {
    axios
        .delete(`/api/items/${id}`)
        .then(res => dispatch({
            type: DELETE_ITEM,
            id
        }))
}

export const addItem = (name) => dispatch => {
    axios
        .post("/api/items", name)
        .then(res => dispatch({
            type: ADD_ITEM,
            payload: res.data
        }))
}

export const updateItem = (id, name) => dispatch => {
    debugger
    axios
        .put(`api/items/${id}`, {name})
        .then(res => dispatch({
            type: UPDATE_ITEM,
            payload: {id, name}
        }))
}

export const setItemsLoading = () => {
    return{
        type: ITEM_LOADING
    }
}