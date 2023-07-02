export const FETCH_TODOS = 'FETCH_TODOS'
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS'
export const FETCH_TODOS_ERROR = 'FETCH_TODOS_ERROR'
export const FETCH_TODOS_PAGE = 'FETCH_TODOS_PAGE'
export const FETCH_TODOS_LIMIT = 'FETCH_TODOS_LIMIT'

export interface ITodosState {
    todos: any[]
    loading: boolean
    error: null | string
    page: number
    limit: number
}
export interface IFetchTodosAction{
    type: typeof FETCH_TODOS
}
export interface IFetchTodosSuccessAction{
    type: typeof FETCH_TODOS_SUCCESS
    payload: any[]
}
export interface IFetchTodosErrorAction{
    type: typeof FETCH_TODOS_ERROR
    payload: string
}
export interface IFetchTodosPageAction{
    type: typeof FETCH_TODOS_PAGE
    payload: number
}
export interface IFetchTodosLimitAction{
    type: typeof FETCH_TODOS_LIMIT
    payload: number
}

export type TTodosAction = IFetchTodosAction | IFetchTodosSuccessAction
    | IFetchTodosErrorAction | IFetchTodosPageAction
    | IFetchTodosLimitAction