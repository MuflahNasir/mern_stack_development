import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR
} from "../utils/types"
import axios from "axios"
import { returnErrors } from "./errorActions"

export const setUserLoading = () => {
    return{
        type: USER_LOADING
    }
}

export const loadUser = () => (dispatch, getState) => {
    //User Loading
    dispatch(setUserLoading())

    //get user

    axios.get("/api/auth/user", configToken(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR
            })
        })
}

export const register = ({ name, email, password }) => dispatch => {
    
    //Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    //Request body

    const body = JSON.stringify({ name, email, password })

    // Make a request

    axios.post("/api/users", body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, "REGISTER_FAIL"))
            dispatch({
                type: REGISTER_FAIL
            })
        })
}

//Login

export const login = ({email, password}) => dispatch => {
    
    // headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    //Create Body
    const body = JSON.stringify({email, password})

    //login request
    axios.post("/api/auth", body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, "LOGIN_FAIL"))
            dispatch({
                type: LOGIN_FAIL
            })
        })
}

// Logout

export const logout = () => {
    return{
        type: LOGOUT_SUCCESS
    }
}

//helper function to get token
export const configToken = getState => {
    //get token
    const token = getState().auth.token;
    //Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    // Check token, add to header
    if (token) {
        config.headers["x-auth-token"] = token
    }
    return config
}