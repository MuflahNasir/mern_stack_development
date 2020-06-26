import * as uuid from "uuid"
import { GET_ITEMS, DELETE_ITEM, ADD_ITEM } from "../utils/types"

const initialState = {
    items: [
        { id: uuid.v4(), name: "Milk" },
        { id: uuid.v4(), name: "Eggs" },
        { id: uuid.v4(), name: "Rice" },
        { id: uuid.v4(), name: "Meat" },
    ]
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_ITEMS:
            return {
                ...state
            }
        case DELETE_ITEM:
            const itemId = action.id
            if(itemId){
                let newState = state.items.filter(item => item.id !== itemId)
                return{
                    ...state,
                    items: newState
                }
            }
            else{
                alert("Item not Found")
            }
            break;
        case ADD_ITEM:
            let newState = state.items.concat(action.data)
            return{
                ...state,
                items: newState
            }
        default:
            return state
    }
}