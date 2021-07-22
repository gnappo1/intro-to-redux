import {ADD_TODO, REMOVE_TODO} from "../actions/actionTypes"

const defaultState = [
    {title: "Clean Dishes", body: "Finish cleaning dishes by 7pm ET", id: 1, completed: false},
    {title: "Clean Floors", body: "Finish cleaning floors by 7pm ET", id: 2, completed: false},
    {title: "Clean Curtains", body: "Finish cleaning curtains by 7pm ET", id: 3, completed: false}
]

const arrayEquals = (a, b) => {
  return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => b.includes(val));
}

const checkTodoFormat = (payload) => {
    const isObject = Object.prototype.toString.call(payload) === '[object Object]'
    const areKeysRight = arrayEquals(Object.keys(payload), [ 'title', 'body', 'completed', 'id' ])
    return isObject && areKeysRight
}

export const todosReducer = (state = defaultState, action) => {
    switch(action.type){
        case ADD_TODO:
            return checkTodoFormat(action.payload) ? [...state, action.payload] : state
        case REMOVE_TODO:
            const todoIndex = state.findIndex(todo => String(todo.id) === String(action.payload))
            return !!todoIndex || todoIndex === 0 ? [...state.slice(0, todoIndex), ...state.slice(todoIndex + 1)] : state
        default:
            return state
    }
}