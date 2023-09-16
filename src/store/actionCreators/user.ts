import {
	FETCH_USER,
	FETCH_USER_ERROR,
	FETCH_USER_PAGE,
	FETCH_USER_SUCCESS,
	FETCH_USER_TERM,
	FETCH_USER_TOTAL_COUNT,
	FOLLOW_USER,
	IFetchUserPageAction,
	IFetchUserTermAction,
	IUser,
	TUserAction,
	UNFOLLOW_USER
} from "../../types/user";
import { Dispatch } from "redux";
import { instance } from "../../api/api";
import { FriendsAC } from "./friendsAC";

export interface IFetchUsers {
	error: null | string
	items: IUser[]
	totalCount: number
}

export enum ResultCodeEnum {
	success = 0,
	error = 1
}

export interface IFetch {
	data: Object
	fieldsErrors: string[]
	messages: string[]
	resultCode: ResultCodeEnum
}

export const fetchUsers = (page: number = 1, count: number = 20, term = '') => {
	return async (dispatch: Dispatch<TUserAction>) => {
		try {
			dispatch({ type: FETCH_USER })
			const response = await instance.get('users', {
				params: {
					page: page,
					count: count,
					term: term
				},
			})
			const data: IFetchUsers = response.data
			dispatch({ type: FETCH_USER_SUCCESS, payload: data.items })
			dispatch({ type: FETCH_USER_TOTAL_COUNT, payload: data.totalCount })
		} catch (e) {
			dispatch({ type: FETCH_USER_ERROR, payload: 'Ошибка при доставании юзеров' })
		}
	}
}
// export const fetchFindUsers = (term: string) => {
//     return async (dispatch: Dispatch<TUserAction>) => {
//         try {
//             dispatch({type: FETCH_USER})
//             const response = await instance.get(`users?term=${term}`, {
//                 params: {
//                     term: term
//                 },
//             })
//             const data: IFetchUsers = response.data
//             dispatch({type: FETCH_USER_SUCCESS, payload: data.items})
//             dispatch({type: FETCH_USER_TOTAL_COUNT, payload: data.totalCount})
//             dispatch({type: FILTER_USERS, payload: term})
//         } catch (e) {
//             dispatch({type: FETCH_USER_ERROR, payload: 'Ошибка при доставании юзеров'})
//         }
//     }
// }
export const fetchFollow = (userId: number) => {
	return async (dispatch: Dispatch<TUserAction>) => {
		try {
			dispatch({ type: FETCH_USER })
			const response = await instance.post(`follow/${userId}`)
			const data: IFetch = response.data
			if (data.resultCode === ResultCodeEnum.success) dispatch({ type: FOLLOW_USER, payload: userId })
		} catch (e) {
			dispatch({ type: FETCH_USER_ERROR, payload: 'Ошибка при подписки на пользователя' })
		}
	}
}
export const fetchUnfollow = (userId: number) => {
	return async (dispatch: Dispatch<TUserAction | any>) => {
		try {
			dispatch({ type: FETCH_USER })
			const response = await instance.delete(`follow/${userId}`)
			const data: IFetch = response.data
			if (data.resultCode === ResultCodeEnum.success) {
				dispatch({ type: UNFOLLOW_USER, payload: userId })
				dispatch(FriendsAC(true))
			}
		} catch (e) {
			dispatch({ type: FETCH_USER_ERROR, payload: 'Ошибка при отписки на пользователя' })
		}
	}
}

export const ActionUsersPage = (page: number): IFetchUserPageAction => {
	return { type: FETCH_USER_PAGE, payload: page }
}
export const ActionUsersTerm = (term: string): IFetchUserTermAction => {
	return { type: FETCH_USER_TERM, payload: term }
}