import {Dispatch} from "redux";
import {instance} from "../../api/api";
import {IFetchUsers} from "./user";
import {FETCH_FRIENDS_ERROR, FETCH_FRIENDS_LOADING, FETCH_FRIENDS_SUCCESS, TAFriends} from "../reducers/friendsReducer";


export const FriendsAC = (isFollowed=false) => {
    return async (dispatch: Dispatch<TAFriends>) => {
        try {
            dispatch({type: FETCH_FRIENDS_LOADING})
            const response = await instance.get('users', {params: {friend: isFollowed}})
            const data: IFetchUsers = response.data
            dispatch({type: FETCH_FRIENDS_SUCCESS, payload: data.items})
        }catch (e){
            dispatch({type: FETCH_FRIENDS_ERROR, payload: 'Ошибка при доставании друзей'})
        }
    }
}