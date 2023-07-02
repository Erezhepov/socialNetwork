import {
    FETCH_TODOS,
    FETCH_TODOS_ERROR,
    FETCH_TODOS_PAGE,
    FETCH_TODOS_SUCCESS,
    IFetchTodosPageAction,
    TTodosAction
} from "../../types/todos";
import {Dispatch} from "redux";
import axios from "axios";


export const fetchTodos = (page: number=1, limit: number=5) => {
    return async (dispatch: Dispatch<TTodosAction>) => {
        try {
            dispatch({type: FETCH_TODOS})
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos', {
                params: { _page: page, _limit: limit }
            })
            dispatch({type: FETCH_TODOS_SUCCESS, payload: response.data})
        }catch{
            dispatch({type: FETCH_TODOS_ERROR, payload: 'Ошибка при доставании тудулистов'})
        }
    }
}

export const setTodoPage = (page: number): IFetchTodosPageAction => {
    debugger
    return {type: FETCH_TODOS_PAGE, payload: page}
}