import {ADD_TODO, REMOVE_TODO} from "../actions/actionTypes"
const defaultState = [
    {title: "Clean Dishes", body: "Finish cleaning dishes by 7pm ET", id: 1},
    {title: "Clean Floors", body: "Finish cleaning floors by 7pm ET", id: 2},
    {title: "Clean Curtains", body: "Finish cleaning curtains by 7pm ET", id: 3}
]
export const todosReducer = (state = [], action) => {
    switch(action.type){
        case "@@INIT":
            return defaultState
        case ADD_TODO:
            return [] //fix code here
        case REMOVE_TODO:
            return [] //fix code here
        default:
            return state 
    }
}