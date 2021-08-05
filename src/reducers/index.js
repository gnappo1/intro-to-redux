import {combineReducers} from "redux"
import {todosReducer} from "./todos"
import authReducer from "./auth"

export const rootReducer = combineReducers({
    todos: todosReducer,
    auth: authReducer
})