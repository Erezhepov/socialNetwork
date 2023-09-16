export const FETCH_AUTHED_SUCCESS = 'AUTHED'
export const FETCH_AUTHED_LOADING = 'FETCH_AUTHED_LOADING'
export const FETCH_AUTHED_ERROR = 'FETCH_AUTHED_ERROR'
export const FETCH_AUTHED_DELETE = 'FETCH_AUTHED_DELETE'

// export const FETCH_AUTHED_MESSAGE = 'FETCH_AUTHED_MESSAGE'

export interface IAuthState {
    isAuth: boolean
    userId: null | number
    message: string
    loading: boolean
    error: null | string
    email: null | string
    login: null | string
}

export interface IFetchAuthedLoading {
    type: typeof FETCH_AUTHED_LOADING
}

export interface IFetchAuthedDelete {
    type: typeof FETCH_AUTHED_DELETE
}


export interface IFetchAuthedError {
    type: typeof FETCH_AUTHED_ERROR
    payload: string
}

export interface IIsAuth {
    type: typeof FETCH_AUTHED_SUCCESS
    payload: { isAuth: boolean, userId: number | null, message: string, email: null | string, login: null | string }
}

// export interface IFetchAuthedMessage {
//     type: typeof FETCH_AUTHED_MESSAGE
//     payload: string
// }


export type TActionAuth = IFetchAuthedLoading | IFetchAuthedError | IIsAuth | IFetchAuthedDelete