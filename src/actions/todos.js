import {ADD_TODO, REMOVE_TODO, MARK_COMPLETE, FETCH_TODOS, ERROR, LOADING_DATA} from "./actionTypes"

export function addTodo(todo){
    return {
        type: ADD_TODO,
        payload: todo
    }
}

export function fetchTodos(todos){
    return (dispatch, getState) => {
        dispatch({type: LOADING_DATA})
        fetch("http://localhost:3000/todos")
        .then(resp => resp.json())
        .then(json => dispatch({type: FETCH_TODOS, payload: json}))
        .catch(err => dispatch({type: ERROR, payload: err}))
    }
}

export function removeTodo(todoId){
    return {
        type: REMOVE_TODO,
        payload: todoId
    }
}

export function markComplete(todoId, completionTime){
    return {
        type: MARK_COMPLETE,
        payload: {todoId, completionTime}
    }
}