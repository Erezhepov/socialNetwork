export const FETCH_USER = 'FETCH_USER'
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR'
export const FETCH_USER_PAGE = 'FETCH_USER_PAGE'
export const FETCH_USER_TOTAL_COUNT = 'FETCH_USER_TOTAL_COUNT'
export const FOLLOW_USER = 'FOLLOW_USER'
export const UNFOLLOW_USER = 'UNFOLLOW_USER'

export interface IUserState {
    users: IUser[]
    loading: boolean
    error: null | string
    page: number
    totalCount: number
}
export interface IUser {
    id: number
    name: string
    followed: boolean
    photos: {
        small: string | null
        large: string | null
    }
    status: string | null
}
interface IFetchUserAction {
    type: typeof FETCH_USER
}
interface IFetchUserSuccessAction {
    type: typeof FETCH_USER_SUCCESS
    payload: IUser[]
}
interface IFetchUserErrorAction {
    type: typeof FETCH_USER_ERROR
    payload: string
}
export interface IFetchUserPageAction {
    type: typeof FETCH_USER_PAGE
    payload: number
}
export interface IFollow {
    type: typeof FOLLOW_USER
    payload: number
}
export interface IUnfollow {
    type: typeof UNFOLLOW_USER
    payload: number
}
interface IUserTotalCountAction {
    type: typeof FETCH_USER_TOTAL_COUNT
    payload: number
}

export type TUserAction = IFetchUserAction
    | IFetchUserSuccessAction
    | IFetchUserErrorAction
    | IFetchUserPageAction
    | IUserTotalCountAction
    | IFollow
    | IUnfollow