import {IUser} from "../../types/user";
export const FETCH_FRIENDS_SUCCESS = 'FETCH_FRIENDS_SUCCESS'
export const FETCH_FRIENDS_ERROR = 'FETCH_FRIENDS_ERROR'
export const FETCH_FRIENDS_LOADING = 'FETCH_FRIENDS_LOADING'

interface IFriends {
    loading: boolean
    error: null | string
    friends: IUser[]
}

interface IAFriendsLoading {type: typeof FETCH_FRIENDS_LOADING}
interface IAFriendsError {
    type: typeof FETCH_FRIENDS_ERROR
    payload: string
}
interface IAFriendsSuccess {
    type: typeof FETCH_FRIENDS_SUCCESS
    payload: IUser[]
}

export type TAFriends = IAFriendsLoading | IAFriendsError | IAFriendsSuccess

const initialState: IFriends = {
    loading: false,
    error: '',
    friends: []
}

export const FriendsReducer = (state=initialState, action: TAFriends) => {
    switch (action.type){
        case FETCH_FRIENDS_SUCCESS:
            return {...state, loading: false, error: null, friends: action.payload}
        case FETCH_FRIENDS_ERROR:
            return {...state, loading: false, error: action.payload}
        case FETCH_FRIENDS_LOADING:
            return {...state, loading: true, error: null}
        default: return state
    }
}