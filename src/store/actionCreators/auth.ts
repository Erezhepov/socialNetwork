import {Dispatch} from "redux";
import {
    FETCH_AUTHED_DELETE,
    FETCH_AUTHED_ERROR,
    FETCH_AUTHED_LOADING,
    FETCH_AUTHED_SUCCESS,
    IIsAuth,
    TActionAuth
} from "../../types/auth";
import {instance} from "../../api/api";
import {IFetch, ResultCodeEnum} from "./user";

interface IPostAuth {
    email: string
    password: string
    rememberMe: boolean
}

interface IFetchAuth extends IFetch {
    data: {
        email: string
        id: number | null
        login: string
    }
}

interface IFetchPostAuth extends IFetch {
    data: {
        userId: number
    }
}

export const fetchAuth = () => {
    return async (dispatch: Dispatch<TActionAuth>) => {
        try {
            dispatch({type: FETCH_AUTHED_LOADING})
            const response = await instance.get('auth/me')
            const data: IFetchAuth = response.data
            if (data.resultCode === ResultCodeEnum.success) {
                dispatch(AFetchAuth({
                    isAuth: !data.resultCode,
                    userId: data.data.id,
                    message: data.messages[0],
                    email: data.data.email,
                    login: data.data.login
                }))
            } else {
                dispatch(AFetchAuth({
                    isAuth: !data.resultCode,
                    userId: null,
                    message: data.messages[0],
                    email: null,
                    login: null
                }))
            }
        } catch (e) {
            dispatch({type: FETCH_AUTHED_ERROR, payload: 'Ошибка при доставании из сервера'})
        }
    }
}

export const fetchPostAuth = ({email, password, rememberMe = false}: IPostAuth) => {
    return async (dispatch: Dispatch<TActionAuth | any>) => {
        try {
            const response = await instance.post<IFetchPostAuth>('auth/login', {
                email: email,
                password: password,
                rememberMe: rememberMe,
            })
            const data = response.data
            if (data.resultCode === ResultCodeEnum.success) dispatch(fetchAuth())
            // if (data.resultCode === ResultCodeEnum.error) dispatch(fetchAuth())
        } catch (e) {
            dispatch({type: FETCH_AUTHED_ERROR, payload: 'Ошибка при доставании из сервера'})
        }
    }
}
export const fetchAuthDelete = () => {
    return async (dispatch: Dispatch<TActionAuth>) => {
        try {
            dispatch({type: FETCH_AUTHED_LOADING})
            const response = await instance.delete('auth/login')
            const data: IFetch = response.data
            if (data.resultCode === ResultCodeEnum.success) dispatch({type: FETCH_AUTHED_DELETE})
        } catch (e) {
            dispatch({type: FETCH_AUTHED_ERROR, payload: 'Ошибка при удалении'})
        }
    }
}

interface IAFetchAuth {
    isAuth: boolean
    userId: number | null
    message: string
    email: string | null
    login: string | null
}

export const AFetchAuth = ({isAuth, userId, message, email, login}: IAFetchAuth): IIsAuth => {
    return {type: FETCH_AUTHED_SUCCESS, payload: {isAuth, userId, message, email, login}}
}