import { GET_ITEMS, DELETE_ITEM, ADD_ITEM, ITEM_LOADING, UPDATE_ITEM } from "../utils/types"

const initialState = {
    items: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            }
        case DELETE_ITEM:
            const itemId = action.id
            if(itemId){
                let newState = state.items.filter(item => item._id !== itemId)
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
            let newState = state.items.concat(action.payload)
            return{
                ...state,
                items: newState
            }
        case UPDATE_ITEM:
            let newStateItem =  state.items.map(
                (item) => item._id ===  action.payload.id ? {...item, name: action.payload.name}
                                        : item
            )
            debugger
            return{
                ...state,
                items: newStateItem
            }
        case ITEM_LOADING: 
            return{
                ...state,
                loading: true
            }
        default:
            return state
    }
}