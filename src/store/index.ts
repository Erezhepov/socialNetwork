import {applyMiddleware, combineReducers, createStore} from "redux";
import {UserReducer} from "./reducers/userReducer";
import thunk from "redux-thunk";
import {ProfileReducer} from "./reducers/profileReducer";
import {AuthReducer} from "./reducers/authReducer";
import {FriendsReducer} from "./reducers/friendsReducer";
import {composeWithDevTools} from "@redux-devtools/extension";
import {ChatReducer} from "./reducers/chatReducer";


const rootReducers = combineReducers({
    users: UserReducer,
    profile: ProfileReducer,
    auth: AuthReducer,
    friends: FriendsReducer,
    chat: ChatReducer,
})

export const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)))

export type TRootState = ReturnType<typeof rootReducers>