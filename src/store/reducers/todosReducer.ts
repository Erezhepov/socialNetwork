import {
    FETCH_TODOS,
    FETCH_TODOS_ERROR,
    FETCH_TODOS_LIMIT,
    FETCH_TODOS_PAGE,
    FETCH_TODOS_SUCCESS,
    ITodosState, TTodosAction
} from "../../types/todos";

const initialState: ITodosState = {
    todos: [],
    loading: false,
    error: null,
    page: 1,
    limit: 5
}

export const todosReducer = (state = initialState, action: TTodosAction) => {
    switch (action.type){
        case FETCH_TODOS:
            return {...state, loading: true}
        case FETCH_TODOS_ERROR:
            return {...state, loading: false, error: action.payload}
        case FETCH_TODOS_SUCCESS:
            return {...state, loading: false, error: null, todos: action.payload}
        case FETCH_TODOS_PAGE:
            return {...state, loading: false, error: null, page: action.payload}
        case FETCH_TODOS_LIMIT:
            return {...state, loading: false, error: null, limit: action.payload}
        default: return state
    }
}