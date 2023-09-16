import {
    FETCH_AUTHED_DELETE,
    FETCH_AUTHED_ERROR,
    FETCH_AUTHED_LOADING,
    FETCH_AUTHED_SUCCESS,
    IAuthState,
    TActionAuth
} from "../../types/auth";

const initialState: IAuthState = {
    email: null,
    login: null,
    isAuth: false,
    userId: null,
    message: '',
    loading: false,
    error: null,
}

export const AuthReducer = (state = initialState, action: TActionAuth): IAuthState => {
    switch (action.type) {
        case FETCH_AUTHED_SUCCESS:
            return {
                ...state, loading: false, error: null,
                isAuth: action.payload.isAuth,
                userId: action.payload.userId,
                message: action.payload.message,
                email: action.payload.email,
                login: action.payload.login,
            }
        case FETCH_AUTHED_LOADING:
            return {...state, loading: true}
        case FETCH_AUTHED_ERROR:
            return {...state, loading: false, error: action.payload}
        case FETCH_AUTHED_DELETE:
            return {...state, isAuth: false, error: null, loading: false, userId: null, message: ''}
        // case FETCH_AUTHED_MESSAGE:
        //     return {...state, isAuth: false, loading: false, error: null, message: action.payload}
        default:
            return state
    }
}