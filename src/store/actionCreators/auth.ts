import {Dispatch} from "redux";
import axios from "axios";
import {
    FETCH_AUTHED_DELETE,
    FETCH_AUTHED_ERROR,
    FETCH_AUTHED_LOADING,
    FETCH_AUTHED_SUCCESS,
    IIsAuth,
    TActionAuth
} from "../../types/auth";
interface IPostAuth {
    email: string
    password: string
    rememberMe?: boolean
}

export const fetchAuth = () => {
    return async (dispatch: Dispatch<TActionAuth>) => {
        try {
            dispatch({type: FETCH_AUTHED_LOADING})
            const response = await axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', {
                withCredentials: true,
                headers: {'API-KEY': 'e6a8a7ef-5858-4ade-a6e6-925e2ca655c7'}
            })
            if (!response.data.resultCode){
                const data = response.data
                dispatch(AFetchAuth(!data.resultCode, data.data.id, data.messages[0], data.data.email, data.data.login))
            }else{
                dispatch(AFetchAuth(!response.data.resultCode, null, response.data.messages[0], null, null))
            }
        }catch (e){
            dispatch({type: FETCH_AUTHED_ERROR, payload: 'Ошибка при доставании из сервера'})
        }
    }
}
export const fetchPostAuth = ({email, password, rememberMe = false}: IPostAuth) => {
    debugger
    return async (dispatch: Dispatch<TActionAuth>) => {
        try{
            const response = await axios.post('https://social-network.samuraijs.com/api/1.0/auth/login', {
                email: email,
                password: password,
                rememberMe: rememberMe,
            }, {
                withCredentials: true,
                headers: {'API-KEY': 'e6a8a7ef-5858-4ade-a6e6-925e2ca655c7'}
            })
            if (!response.data.resultCode){
                const data = response.data
                dispatch(AFetchAuth(!data.resultCode, data.data.id, data.messages[0], data.data.email, data.data.login))
            }else{
                dispatch(AFetchAuth(!response.data.resultCode, null,response.data.messages[0], null, null))
            }
        }catch (e){
            dispatch({type: FETCH_AUTHED_ERROR, payload: 'Ошибка при доставании из сервера'})
        }
    }
}
export const fetchAuthDelete = () => {
    return async (dispatch: Dispatch<TActionAuth>) => {
        try{
            dispatch({type: FETCH_AUTHED_LOADING})
            const response = await axios.delete('https://social-network.samuraijs.com/api/1.0/auth/login',  {
                withCredentials: true,
                headers: {'API-KEY': 'e6a8a7ef-5858-4ade-a6e6-925e2ca655c7'}
            })
            if (!response.data.resultCode){
                dispatch({type: FETCH_AUTHED_DELETE})
            }
        }catch (e){
            dispatch({type: FETCH_AUTHED_ERROR, payload: 'Ошибка при удалении'})
        }
    }
}

export const AFetchAuth = (isAuth: boolean, userId=null, message: string, email: null | string, login: null | string): IIsAuth => {
    return {type: FETCH_AUTHED_SUCCESS, payload: {isAuth, userId, message, email, login}}
}