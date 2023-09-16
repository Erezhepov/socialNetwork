import {
    FETCH_USER,
    FETCH_USER_ERROR,
    FETCH_USER_PAGE,
    FETCH_USER_SUCCESS,
    FETCH_USER_TERM,
    FETCH_USER_TOTAL_COUNT,
    FILTER_USERS,
    FOLLOW_USER,
    IUserState,
    TUserAction,
    UNFOLLOW_USER
} from "../../types/user";

let initialState: IUserState = {
    users: [],
    loading: false,
    error: null,
    totalCount: 0,
    page: 1,
    filter: {
        term: ''
    }
}


export const UserReducer = (state = initialState, action: TUserAction): IUserState => {
    switch (action.type) {
        case FETCH_USER:
            return {...state, loading: true, error: null}
        case FETCH_USER_SUCCESS:
            return {...state, users: action.payload, loading: false, error: null}
        case FETCH_USER_ERROR:
            return {...state, users: [], loading: false, error: action.payload}
        case FETCH_USER_PAGE:
            return {...state, loading: false, error: null, page: action.payload}
        case FETCH_USER_TERM:
            return {...state, loading: false, error: null, filter: {...state.filter, term: action.payload}}
        case FETCH_USER_TOTAL_COUNT:
            return {...state, totalCount: action.payload}
        case FOLLOW_USER:
            const updatedUsers: any = state.users.map(user => {
                if (user.id === action.payload) return {...user, followed: true}
                return user
            })
            return {...state, loading: false, error: null, users: updatedUsers}
        case UNFOLLOW_USER:
            const newUsers: any = state.users.map(user => {
                if (user.id === action.payload) return {...user, followed: false}
                return user
            })
            return {...state, loading: false, error: null, users: newUsers}
        case FILTER_USERS:
            return {...state, filter: {...state.filter, term: action.payload}}
        default:
            return state
    }
}