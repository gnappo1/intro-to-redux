import {ADD_TODO, REMOVE_TODO, MARK_COMPLETE} from "../actions/actionTypes"

const defaultState = [
    {title: "Clean Dishes", body: "Finish cleaning dishes by 7pm ET", id: 1, completed: false, completionTime: null},
    {title: "Clean Floors", body: "Finish cleaning floors by 7pm ET", id: 2, completed: false, completionTime: null},
    {title: "Clean Curtains", body: "Finish cleaning curtains by 7pm ET", id: 3, completed: false, completionTime: null}
]

const arrayEquals = (a, b) => {
  return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => b.includes(val));
}

const checkTodoFormat = (payload) => {
    const isObject = Object.prototype.toString.call(payload) === '[object Object]'
    const areKeysRight = arrayEquals(Object.keys(payload), ["title", "body", "completed", "id", "completionTime"])
    return isObject && areKeysRight
}

export const todosReducer = (state = defaultState, action) => {
    switch(action.type){
        case ADD_TODO:
            return checkTodoFormat(action.payload) ? [...state, action.payload] : state
        case REMOVE_TODO:
            // const todoIndex = state.findIndex(todo => String(todo.id) === String(action.payload))
            // return !!todoIndex || todoIndex === 0 ? [...state.slice(0, todoIndex), ...state.slice(todoIndex + 1)] : state
            return state.filter(todo => todo.id !== action.payload)
        case MARK_COMPLETE:
            const index = state.findIndex(todo => String(todo.id) === String(action.payload.todoId))
            return !!index || index === 0 ? [...state.slice(0, index), {...state[index], completed: true, completionTime: action.payload.completionTime}, ...state.slice(index + 1)] : state
        default:
            return state
    }
}