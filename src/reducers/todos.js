import {ADD_TODO, REMOVE_TODO, MARK_COMPLETE, FETCH_TODOS, LOADING_DATA, ERROR} from "../actions/actionTypes"

const arrayEquals = (a, b) => {
  return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => b.includes(val));
}

const pick = (...selectedArgs) => obj =>  selectedArgs.reduce((acc, attr) => ({...acc, [attr]: obj[attr]}), {})


const checkSubmissionFormat = (todo) => {
    const newTodo = pick("title", "body", "completed", "id")(todo)
    return {...newTodo, completionTime: todo.completion_time}
}

const checkTodoFormat = (payload) => {
    const isObject = Object.prototype.toString.call(payload) === '[object Object]'
    const areKeysRight = arrayEquals(Object.keys(payload), ["title", "body", "completed", "id", "completionTime"])
    return isObject && areKeysRight
}

export const todosReducer = (state = {todos: [], loading: false, error: ""}, action) => {
    switch(action.type){
        case LOADING_DATA:
            return {...state, loading: true}
        case ERROR:
            return {...state, error: action.payload, loading: false}
        case FETCH_TODOS:
            return {...state, todos: action.payload}
        case ADD_TODO:
            const todo = checkSubmissionFormat(action.payload)
            return checkTodoFormat(todo) ? {...state, todos: [...state.todos, todo]} : state
        case REMOVE_TODO:
            const newTodosArray =  state.filter(todo => todo.id !== action.payload)
            return {...state, todos: newTodosArray}
        case MARK_COMPLETE:
            const index = state.todos.findIndex(todo => String(todo.id) === String(action.payload.todoId))
            return !!index || index === 0 ? {...state, todos: [
                ...state.todos.slice(0, index), 
                {...state.todos[index], completed: true, completionTime: action.payload.completionTime}, 
                ...state.todos.slice(index + 1)
                ]} : state
        default:
            return state
    }
}