import {ADD_TODO, REMOVE_TODO, MARK_COMPLETE} from "./actionTypes"

export function addTodo(todo){
    return {
        type: ADD_TODO,
        payload: todo
    }
}

export function removeTodo(todoId){
    return{
        type: REMOVE_TODO,
        payload: todoId
    }
}

export function markComplete(todoId, completionTime){
    return{
        type: MARK_COMPLETE,
        payload: {todoId, completionTime}
    }
}