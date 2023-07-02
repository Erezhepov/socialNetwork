import {applyMiddleware, combineReducers, createStore} from "redux";
import {UserReducer} from "./reducers/userReducer";
import thunk from "redux-thunk";
import {todosReducer} from "./reducers/todosReducer";
import {ProfileReducer} from "./reducers/profileReducer";
import {AuthReducer} from "./reducers/authReducer";


const rootReducers = combineReducers({
    users: UserReducer,
    todos: todosReducer,
    profile: ProfileReducer,
    auth: AuthReducer,
})

export const store = createStore(rootReducers, applyMiddleware(thunk))

export type TRootState = ReturnType<typeof rootReducers>