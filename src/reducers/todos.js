import {FETCH_TODOS, ADD_TODO, REMOVE_TODO, MARK_COMPLETE, DATABASE_SAVING, DATABASE_INSPECTING, ERROR} from "../actions/actionTypes"

const arrayEquals = (a, b) => {
  return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => b.includes(val));
}

const pick = (...selectedArgs) => obj =>  selectedArgs.reduce((acc, attr) => ({...acc, [attr]: obj[attr]}), {})

const reformatCompletionTime = (todo) => {
    const newAction = pick("title", "body", "completed", "id")(todo)
    return {...newAction, completionTime: todo.completion_time}
}

const checkTodoFormat = (payload) => {
    const isObject = Object.prototype.toString.call(payload) === '[object Object]'
    const areKeysRight = arrayEquals(Object.keys(payload), ["title", "body", "completed", "id", "completionTime"])
    return isObject && areKeysRight
}

export const todosReducer = (state = {todos: [], loading: false, error: ""}, action) => {
    switch(action.type){
        case DATABASE_INSPECTING:
            return {...state, loading: action.payload}
        case DATABASE_SAVING:
            return {...state, loading: action.payload}
        case FETCH_TODOS:
            return {todos: action.payload, loading: false, error: ""}
        case ERROR:
            return {...state, error: action.payload}
        case ADD_TODO:
            const formattedTodo = reformatCompletionTime(action.payload)
            return checkTodoFormat(formattedTodo) ? {...state, todos: [...state.todos, formattedTodo], loading: false, error: ""} : state
        case REMOVE_TODO:
            const newTodos = state.todos.filter(todo => todo.id !== action.payload)
            return {todos: newTodos, loading: false, error: ""}
        case MARK_COMPLETE:
            const index = state.todos.findIndex(todo => String(todo.id) === String(action.payload.id))
            return !!index || index === 0 ? (
                {...state, todos: [
                    ...state.todos.slice(0, index), 
                    action.payload,
                    ...state.todos.slice(index + 1)
                ], error: "", loading: false} 
            ): state
        default:
            return state
    }
}