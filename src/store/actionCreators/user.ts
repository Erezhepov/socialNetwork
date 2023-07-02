import {
    FETCH_USER,
    FETCH_USER_ERROR, FETCH_USER_PAGE,
    FETCH_USER_SUCCESS,
    FETCH_USER_TOTAL_COUNT, FOLLOW_USER,
    IFetchUserPageAction,
    TUserAction, UNFOLLOW_USER
} from "../../types/user";
import axios from "axios";
import {Dispatch} from "redux";

export const fetchUsers = (page: number=1, count: number=20) => {
    return async (dispatch: Dispatch<TUserAction>) => {
        try {
            dispatch({type: FETCH_USER})
            const response = await axios.get('https://social-network.samuraijs.com/api/1.0/users', {
                params: {
                    page: page,
                    count: count
                },
                withCredentials: true,
                headers: {'API-KEY': 'e6a8a7ef-5858-4ade-a6e6-925e2ca655c7'}

            })
            if (!response.data.resultCode){
                dispatch({type: FETCH_USER_SUCCESS, payload: response.data.items})
                dispatch({type: FETCH_USER_TOTAL_COUNT, payload: response.data.totalCount})
            }
        } catch (e){
            dispatch({type: FETCH_USER_ERROR, payload: 'Ошибка при доставании юзеров'})
        }
    }
}

export const fetchFollow = (userId: number) => {
    return async (dispatch: Dispatch<TUserAction>) => {
        try {
            dispatch({type: FETCH_USER})
            const response = await axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`, {}, {
                withCredentials: true,
                headers: {'API-KEY': 'e6a8a7ef-5858-4ade-a6e6-925e2ca655c7'}
            })
            if (!response.data.resultCode){
                dispatch({type: FOLLOW_USER, payload: userId})
            }
        }catch (e){
            dispatch({type: FETCH_USER_ERROR, payload: 'Ошибка при подписки на пользователя'})
        }
    }
}
export const fetchUnfollow = (userId: number) => {
    return async (dispatch: Dispatch<TUserAction>) => {
        try {
            dispatch({type: FETCH_USER})
            const response = await axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`,{
                withCredentials: true,
                headers: {'API-KEY': 'e6a8a7ef-5858-4ade-a6e6-925e2ca655c7'}
            })
            if (!response.data.resultCode){
                dispatch({type: UNFOLLOW_USER, payload: userId})
            }
        }catch (e){
            dispatch({type: FETCH_USER_ERROR, payload: 'Ошибка при отписки на пользователя'})
        }
    }
}

export const ActionUsersPage = (page: number): IFetchUserPageAction => {
    return {type: FETCH_USER_PAGE, payload: page}
}