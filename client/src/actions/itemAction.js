import { GET_ITEMS, DELETE_ITEM, ADD_ITEM } from "../utils/types"

export const getItem = () => {
    return{
        type: GET_ITEMS
    }
}

export const deleteItem = (id) => {
    return{
        type: DELETE_ITEM,
        id
    }
}

export const addItem = (data) => {
    return{
        type: ADD_ITEM,
        data
    }
}